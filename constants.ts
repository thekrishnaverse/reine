
import { Car } from './types';

export const HONDA_LOGO_URL = 'https://saleshondaku.com/IMG/logobesar.png';

// WordPress Media API URL to fetch images for CARDS from Honda Salemba
export const WP_MEDIA_API_URL_CAR_CARDS: string = 'https://honda-salemba.com/wp-json/wp/v2/media?per_page=100';

// WordPress Media API URL to fetch images from (e.g., for modal gallery, defaults to Fatmawati)
export const WP_MEDIA_API_URL: string = 'https://hondafatmawati.co.id/wp-json/wp/v2/media?per_page=100'; 

// WordPress Posts API URL for additional car information
export const WP_POSTS_API_URL = 'https://hondafatmawati.co.id/wp-json/wp/v2/posts?per_page=50&orderby=date&order=desc&_fields=id,date,slug,link,title,content,excerpt';

// Placeholder images for the Hero Slider.
export const HERO_SLIDER_PLACEHOLDER_IMAGES: string[] = [
  'https://nicemassagejakarta.site/wp-content/uploads/2025/06/city-hatchback-rs.png',
  'https://nicemassagejakarta.site/wp-content/uploads/2025/06/brio-rs.jpg',
  'https://nicemassagejakarta.site/wp-content/uploads/2025/06/crv-hev.jpg',
  'https://nicemassagejakarta.site/wp-content/uploads/2025/06/wrv.jpg',
];

// Car images will be fetched dynamically. These are initial placeholders.
export const INITIAL_CARS: Car[] = [
  {
    id: 'brio-rs',
    name: 'Honda Brio RS',
    tagline: 'Break Away. Take Control.',
    imageUrl: 'https://nicemassagejakarta.site/wp-content/uploads/2025/06/brio-rs.jpg', 
    priceEstimate: 'Mulai dari Rp 248.2 Jutaan', 
    engineSpecs: '1.2L i-VTEC',
    fuelEconomy: 'Approx. 20 km/L',
    keyFeatures: ['New Sporty Exterior Design', 'New LED Headlights', '7" Touchscreen Audio', 'Smart Entry & Push Start'],
    basePrompt: 'Generate a compelling promotional paragraph for the Honda Brio RS, emphasizing its new sporty design, fuel efficiency, and suitability for city driving and young buyers in Indonesia. Highlight key features like its agile handling, new LED headlights, and modern interior. Keep the tone vibrant and youthful.',
  },
  {
    id: 'hrv',
    name: 'All-New Honda HR-V',
    tagline: 'Be The Exception.',
    imageUrl: 'https://nicemassagejakarta.site/wp-content/uploads/2025/06/3.png',
    priceEstimate: 'Mulai dari Rp 383 Jutaan', 
    engineSpecs: '1.5L i-VTEC / 1.5L VTEC Turbo',
    fuelEconomy: 'Approx. 17 km/L',
    keyFeatures: ['Stylish SUV Design', 'Spacious & Versatile Cabin', 'Honda SENSING™', 'Hands-Free Power Tailgate'],
    basePrompt: 'Create an engaging promotional description for the All-New Honda HR-V for the Indonesian market. Focus on its stylish exterior, spacious and versatile interior, advanced safety features like Honda SENSING™, and smooth driving experience. Target young families and style-conscious individuals.',
  },
  {
    id: 'crv-hybrid',
    name: 'All-New Honda CR-V RS e:HEV',
    tagline: 'Ahead in Perfection.',
    imageUrl: 'https://nicemassagejakarta.site/wp-content/uploads/2025/06/crv-hev.jpg', 
    priceEstimate: 'Rp 825.8 Jutaan', 
    engineSpecs: '2.0L e:HEV Hybrid System',
    fuelEconomy: 'Excellent Hybrid Efficiency',
    keyFeatures: ['Powerful e:HEV Hybrid', 'Premium & Spacious Interior', 'Honda SENSING™', 'Honda Connect'],
    basePrompt: 'Craft a persuasive promotional text for the All-New Honda CR-V RS e:HEV, targeting the Indonesian premium SUV market. Emphasize its combination of sophisticated design, powerful yet efficient e:HEV hybrid technology, luxurious comfort, and cutting-edge features including Honda SENSING™ and Honda Connect. Appeal to environmentally conscious families and tech-savvy professionals seeking a top-tier SUV experience.',
  },
  {
    id: 'civic-type-r',
    name: 'Honda Civic Type R',
    tagline: 'The Ultimate Sport.',
    imageUrl: 'https://www.hondacibubur.com/lib/images/item/red.png', 
    priceEstimate: 'Mulai dari Rp 1.42 Milyar', 
    engineSpecs: '2.0L VTEC Turbo',
    fuelEconomy: 'Performance Focused',
    keyFeatures: ['Aggressive Aerodynamics', '319 PS Turbo Engine', 'LogR Datalogger', 'Alcantara Sport Seats'],
    basePrompt: 'Write an exhilarating promotional description for the Honda Civic Type R, aiming at Indonesian driving enthusiasts. Highlight its track-proven performance, aggressive aerodynamics, driver-focused cockpit with Alcantara sport seats, and the heritage of Honda racing success. Emphasize its raw power and precision handling.',
  },
  {
    id: 'accord-hybrid',
    name: 'All-New Honda Accord RS e:HEV',
    tagline: 'Rewrite The Future.',
    imageUrl: 'https://www.hondacibubur.com/lib/images/item/Ignite-RedMetallic.jpg', 
    priceEstimate: 'Mulai dari Rp 959 Jutaan', 
    engineSpecs: '2.0L e:HEV Hybrid System',
    fuelEconomy: 'Impressive Hybrid Fuel Economy',
    keyFeatures: ['Sleek & Sophisticated Design', 'Luxurious Cabin with Google Built-in', 'Advanced e:HEV Technology', 'Full Suite Honda SENSING™'],
    basePrompt: 'Generate an elegant promotional paragraph for the All-New Honda Accord RS e:HEV for the Indonesian market. Focus on its sophisticated new design, luxurious and tech-forward interior featuring Google Built-in, refined driving dynamics provided by the e:HEV system, and comprehensive Honda SENSING™ safety features. Appeal to discerning professionals and those seeking a premium, modern, and efficient sedan experience.',
  },
  {
    id: 'wrv',
    name: 'Honda WR-V',
    tagline: 'Wins All The Ways.',
    imageUrl: 'https://nicemassagejakarta.site/wp-content/uploads/2025/06/wrv.jpg', 
    priceEstimate: 'Mulai dari Rp 280.7 Jutaan', 
    engineSpecs: '1.5L i-VTEC DOHC',
    fuelEconomy: 'Approx. 18 km/L',
    keyFeatures: ['Sporty Compact SUV Design', 'Honda SENSING™ (RS types)', 'Ground Clearance 220mm', 'Remote Engine Start'],
    basePrompt: 'Generate an exciting promotional description for the Honda WR-V, targeting young professionals and active individuals in Indonesia. Emphasize its sporty and compact SUV styling, class-leading ground clearance, advanced safety features like Honda SENSING™ (for RS variants), and suitability for urban adventures and weekend getaways. Highlight its agile performance and modern features.',
  },
  {
    id: 'brv',
    name: 'All New Honda BR-V',
    tagline: 'Driving Redefined.',
    imageUrl: 'https://www.hondacibubur.com/lib/images/item/BR-V_sandKhakiPearl(N7XEdtion).jpeg', 
    priceEstimate: 'Mulai dari Rp 325.5 Jutaan (N7X Edition)', 
    engineSpecs: '1.5L i-VTEC DOHC',
    fuelEconomy: 'Approx. 16 km/L',
    keyFeatures: ['Tough 7-Seater SUV', 'Honda SENSING™ (Prestige CVT)', 'Spacious Cabin for Family', 'Remote Engine Start'],
    basePrompt: 'Craft a compelling promotional text for the All New Honda BR-V for the Indonesian market. Focus on its capabilities as a tough and stylish 7-seater SUV, its advanced safety features including Honda SENSING™ on higher trims, spacious and comfortable interior for families, and its reliable performance for both city and out-of-town journeys. Target families looking for a versatile and safe vehicle.',
  },
  {
    id: 'civic-rs',
    name: 'All New Honda Civic RS',
    tagline: 'Drive The Unrivaled.',
    imageUrl: 'https://www.hondacibubur.com/lib/images/item/all_new_civic.png', 
    priceEstimate: 'Mulai dari Rp 616 Jutaan', 
    engineSpecs: '1.5L VTEC Turbo',
    fuelEconomy: 'Approx. 15 km/L',
    keyFeatures: ['Sporty Sedan RS Design', 'Honda SENSING™', '10.2" Interactive TFT Meter', 'Wireless Charger'],
    basePrompt: 'Write a dynamic promotional description for the All New Honda Civic RS for the Indonesian market. Highlight its aggressive sporty design, powerful VTEC Turbo engine, cutting-edge technology including Honda SENSING™ and its advanced digital cockpit. Appeal to driving enthusiasts and individuals seeking a sophisticated and thrilling sedan experience.',
  },
  {
    id: 'city-hatchback-rs',
    name: 'Honda City Hatchback RS',
    tagline: 'Elevate Your Move.',
    imageUrl: 'https://nicemassagejakarta.site/wp-content/uploads/2025/06/city-hatchback-rs.png', 
    priceEstimate: 'Rp 384.5 Jutaan', 
    engineSpecs: '1.5L i-VTEC DOHC',
    fuelEconomy: 'Approx. 18 km/L',
    keyFeatures: ['Sporty & Versatile Hatchback', 'Ultra Seat Configurations', 'Honda SENSING™ (CVT)', 'Remote Engine Start'],
    basePrompt: 'Create an engaging promotional paragraph for the Honda City Hatchback RS for the Indonesian market. Emphasize its sporty design, versatile Ultra Seat for maximum utility, fun-to-drive character, and advanced features including Honda SENSING™ for CVT variants. Target young, dynamic individuals and small families who value style, practicality, and safety.',
  },
];
