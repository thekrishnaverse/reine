import { Car, WPMediaItem } from '../types';
import { WP_MEDIA_API_URL, WP_MEDIA_API_URL_CAR_CARDS } from '../constants';
import { getCarKeywords } from './utils';

// Helper to get a specific image size or fallback
export const getImageUrlFromMediaItem = (item: WPMediaItem, size: 'large' | 'medium_large' | 'full' | 'thumbnail' = 'large'): string => {
  if (item.media_details?.sizes?.[size]?.source_url) {
    return item.media_details.sizes[size]!.source_url;
  }
  if (item.media_details?.sizes?.full?.source_url) {
    return item.media_details.sizes.full.source_url;
  }
  return item.source_url; // Original uploaded image as final fallback
};

const fetchWPMediaItems = async (url: string): Promise<WPMediaItem[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch media from ${url}: ${response.statusText}`);
      return [];
    }
    const mediaItems: WPMediaItem[] = await response.json();
    return mediaItems.filter(item => item.mime_type && item.mime_type.startsWith('image/'));
  } catch (error) {
    console.warn(`Error fetching WordPress media items from ${url}:`, error);
    return [];
  }
};

export const fetchAndMapCarImages = async (initialCars: Car[]): Promise<Car[]> => {
  const mediaItems = await fetchWPMediaItems(WP_MEDIA_API_URL_CAR_CARDS);
  if (mediaItems.length === 0) {
    console.warn(`No media items fetched from ${WP_MEDIA_API_URL_CAR_CARDS}. Car card images will use placeholders.`);
    return initialCars; // Return initial cars with placeholders
  }

  console.log(`Fetched ${mediaItems.length} media items from ${WP_MEDIA_API_URL_CAR_CARDS} for car cards.`);

  const updatedCars = initialCars.map(car => {
    const carKeywords = getCarKeywords(car.name);
    let foundMediaItem: WPMediaItem | null = null;

    for (const keyword of carKeywords) {
      foundMediaItem = mediaItems.find(item =>
        item.title?.rendered?.toLowerCase().includes(keyword)
      ) || null;
      if (foundMediaItem) break;
    }

    if (foundMediaItem) {
      const remoteImageUrl = getImageUrlFromMediaItem(foundMediaItem);
      return { ...car, imageUrl: remoteImageUrl };
    }
    // If not found, keep the original placeholder imageUrl
    return car; 
  });

  return updatedCars;
};

export const fetchHeroSliderImages = async (): Promise<WPMediaItem[]> => {
  // This function is for a DYNAMIC hero slider. Currently, HeroSlider.tsx uses static placeholders.
  // If dynamic fetching is reinstated for HeroSlider, this can be used.
  // For now, it's not actively called by the placeholder-based HeroSlider.
  // const url = `${WP_MEDIA_API_URL}&per_page=${HERO_SLIDER_IMAGE_COUNT}&orderby=date&order=desc`;
  // console.log(`Fetching hero slider images from: ${url}`); // Example if it were used
  // const items = await fetchWPMediaItems(url); 
  // return items.slice(0, HERO_SLIDER_IMAGE_COUNT);
  console.warn("fetchHeroSliderImages is not actively used as HeroSlider uses static placeholders.");
  return Promise.resolve([]);
};

export const fetchCarGalleryImages = async (carName: string): Promise<WPMediaItem[]> => {
  // Fetches images for the modal gallery, uses the default WP_MEDIA_API_URL (Fatmawati)
  const allMediaItems = await fetchWPMediaItems(WP_MEDIA_API_URL); 
  if (allMediaItems.length === 0) {
    console.log(`No media items fetched from ${WP_MEDIA_API_URL} for car gallery of ${carName}.`);
    return [];
  }

  const carKeywords = getCarKeywords(carName);
  const galleryImages: WPMediaItem[] = [];

  for (const item of allMediaItems) {
    const titleLower = item.title?.rendered?.toLowerCase();
    if (titleLower) {
      for (const keyword of carKeywords) {
        if (titleLower.includes(keyword)) {
          // Check if not already added to prevent duplicates from multiple keywords
          if (!galleryImages.find(gi => gi.id === item.id)) {
            galleryImages.push(item);
          }
          // No break here, allow multiple images for gallery if keywords match different parts of titles
        }
      }
    }
  }
  
  // Deduplicate based on source_url in case IDs are missing or titles are too similar
  const uniqueGalleryImages = Array.from(new Map(galleryImages.map(item => [getImageUrlFromMediaItem(item, 'full'), item])).values());

  console.log(`Found ${uniqueGalleryImages.length} unique gallery images for ${carName} from ${WP_MEDIA_API_URL}`);
  return uniqueGalleryImages.slice(0, 10); // Limit to a max of 10 gallery images
};