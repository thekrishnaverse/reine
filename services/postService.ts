
import { Car, WPPostItem } from '../types';
import { WP_POSTS_API_URL } from '../constants';
import { getCarKeywords } from './utils';

const fetchWPPosts = async (): Promise<WPPostItem[]> => {
  try {
    const response = await fetch(WP_POSTS_API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText} from ${WP_POSTS_API_URL}`);
    }
    const posts: WPPostItem[] = await response.json();
    return posts.filter(post => post.title?.rendered && post.content?.rendered); // Ensure essential fields exist
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return []; // Return empty array on error to prevent app crash
  }
};

export const mapCarsToPosts = (cars: Car[], posts: WPPostItem[]): Car[] => {
  if (!posts || posts.length === 0) {
    console.log("No posts provided or available to map to cars for additional content.");
    return cars;
  }

  return cars.map(car => {
    const carKeywords = getCarKeywords(car.name);
    let foundPost: WPPostItem | null = null;

    // Iterate through posts (already sorted by date desc by API query)
    // Find the first post whose title matches any of the car's keywords
    for (const post of posts) {
      for (const keyword of carKeywords) {
        if (post.title?.rendered?.toLowerCase().includes(keyword)) {
          foundPost = post;
          break; // Found a matching post for this keyword
        }
      }
      if (foundPost) break; // Found a matching post for this car
    }

    if (foundPost) {
      console.log(`Matched car "${car.name}" with post "${foundPost.title.rendered}" for additional content.`);
      return {
        ...car,
        additionalPostContent: {
          title: foundPost.title.rendered,
          content: foundPost.content.rendered,
          sourceUrl: foundPost.link,
        },
      };
    } else {
      console.log(`No matching post found for additional content for car "${car.name}".`);
      return car; // Return original car if no matching post found
    }
  });
};

export const fetchAndMapCarPosts = async (initialCars: Car[]): Promise<Car[]> => {
  const posts = await fetchWPPosts();
  if (posts.length > 0) {
    console.log(`Fetched ${posts.length} posts for potential additional car information.`);
    return mapCarsToPosts(initialCars, posts);
  }
  console.log("No posts fetched, so no additional car information will be mapped.");
  return initialCars;
};
