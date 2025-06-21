
// Simplified car name to keyword mapping for matching content (images, posts, etc.)
export const getCarKeywords = (carName: string): string[] => {
    const lowerCarName = carName.toLowerCase();
    // Order from most specific to least specific to improve matching accuracy
    if (lowerCarName.includes('civic type r')) return ['civic type r', 'type r', 'civic sport'];
    if (lowerCarName.includes('civic rs')) return ['civic rs', 'civic sedan rs', 'all new civic rs'];
    if (lowerCarName.includes('city hatchback rs')) return ['city hatchback rs', 'city hb rs', 'honda city hatchback']; // Specific for City Hatchback RS
    if (lowerCarName.includes('accord rs e:hev')) return ['accord rs e:hev', 'accord hybrid', 'all new accord'];
    if (lowerCarName.includes('cr-v rs e:hev')) return ['cr-v rs e:hev', 'crv rs hybrid', 'all new cr-v hybrid'];
    
    if (lowerCarName.includes('brio')) return ['brio', 'brio rs', 'brio satya'];
    if (lowerCarName.includes('hr-v') || lowerCarName.includes('hrv')) return ['hr-v', 'hrv', 'all new hr-v'];
    if (lowerCarName.includes('cr-v') || lowerCarName.includes('crv')) return ['cr-v', 'crv', 'all new cr-v']; // General CR-V if hybrid not matched
    if (lowerCarName.includes('civic')) return ['civic']; // General civic if others don't match
    if (lowerCarName.includes('accord')) return ['accord']; // General Accord
    if (lowerCarName.includes('wr-v') || lowerCarName.includes('wrv')) return ['wr-v', 'wrv', 'honda wr-v'];
    if (lowerCarName.includes('br-v') || lowerCarName.includes('brv')) return ['br-v', 'brv', 'all new br-v'];
    if (lowerCarName.includes('city hatchback')) return ['city hatchback', 'city hb']; // General City Hatchback
    if (lowerCarName.includes('city')) return ['city', 'honda city sedan']; // General city (usually sedan)
    
    // Generic fallback: split name into words, filter common short words
    const nameParts = lowerCarName.split(' ').filter(word => word.length > 2 && !['honda', 'all', 'new'].includes(word));
    if (nameParts.length > 0) return nameParts;
    
    return [lowerCarName]; // Fallback to the full lowercased name if no other keywords found
  };
  