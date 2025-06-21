export interface Car {
  id: string;
  name: string;
  tagline: string;
  imageUrl: string;
  priceEstimate: string;
  engineSpecs?: string;
  fuelEconomy?: string;
  keyFeatures: string[];
  basePrompt: string;
  aiDescription?: string;
  additionalPostContent?: {
    title: string;
    content: string; // HTML content
    sourceUrl: string; // Link to the original post
  };
}

// WordPress Media API Types
export interface WPMediaItem {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  caption?: { // Added caption
    rendered: string;
  };
  media_details: {
    width?: number;
    height?: number;
    file?: string;
    sizes?: WPImageSizes;
    image_meta?: any;
  };
  source_url: string; // Fallback if sizes are not available as expected
  mime_type: string;
  alt_text?: string;
}

export interface WPImageSizeDetail {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export interface WPImageSizes {
  thumbnail?: WPImageSizeDetail;
  medium?: WPImageSizeDetail;
  medium_large?: WPImageSizeDetail;
  large?: WPImageSizeDetail;
  full?: WPImageSizeDetail;
  [key: string]: WPImageSizeDetail | undefined; // For other custom sizes
}

// WordPress Posts API Types
export interface WPPostItem {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  // We can add _embedded for featured_media if needed later
}