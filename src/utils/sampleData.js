// Simple in-memory sample data for the app. Used to replace backend API calls
const plants = [
  {
    _id: '1',
    name: 'Money Plant',
    price: 249,
    category: 'Indoor',
    categories: ['Indoor', 'Trailing'],
    stock: 12,
    description: 'A hardy trailing plant that brings good vibes and improves indoor air quality.',
    image: 'https://picsum.photos/seed/moneyplant/600/400',
    light: 'Bright indirect light',
    watering: 'Once a week',
    humidity: 'Medium',
    temperature: '18-24°C',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Snake Plant',
    price: 399,
    category: 'Indoor',
    categories: ['Indoor', 'Air Purifying'],
    stock: 5,
    description: 'Very low maintenance and tolerant to low light. Great for beginners.',
    image: 'https://picsum.photos/seed/snakeplant/600/400',
    light: 'Low to bright indirect light',
    watering: 'Every 2-3 weeks',
    humidity: 'Low to medium',
    temperature: '15-30°C',
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'Aloe Vera',
    price: 299,
    category: 'Succulent',
    categories: ['Succulent', 'Medicinal'],
    stock: 8,
    description: 'Succulent known for its soothing gel and easy care.',
    image: 'https://picsum.photos/seed/aloevera/600/400',
    light: 'Bright direct to indirect light',
    watering: 'Once every 2 weeks',
    humidity: 'Low',
    temperature: '18-27°C',
    createdAt: new Date().toISOString()
  },
  {
    _id: '4',
    name: 'Peace Lily',
    price: 349,
    category: 'Indoor',
    categories: ['Indoor', 'Flowering'],
    stock: 7,
    description: 'Elegant white blooms and easy to care for; tolerates low light.',
    image: 'https://picsum.photos/seed/peacelily/600/400',
    light: 'Low to medium indirect light',
    watering: 'Once a week',
    humidity: 'High',
    temperature: '18-26°C',
    createdAt: new Date().toISOString()
  },
  {
    _id: '5',
    name: 'Rubber Plant',
    price: 549,
    category: 'Indoor',
    categories: ['Indoor', 'Large'],
    stock: 3,
    description: 'Large glossy leaves that make a statement in any room.',
    image: 'https://picsum.photos/seed/rubberplant/600/400',
    light: 'Bright indirect light',
    watering: 'Every 7-10 days',
    humidity: 'Medium',
    temperature: '18-29°C',
    createdAt: new Date().toISOString()
  },
  {
    _id: '6',
    name: 'Pothos',
    price: 199,
    category: 'Indoor',
    categories: ['Indoor', 'Trailing'],
    stock: 20,
    description: 'Fast-growing trailing vine; great for shelves and hanging baskets.',
    image: 'https://picsum.photos/seed/pothos/600/400',
    light: 'Low to bright indirect',
    watering: 'Once a week',
    humidity: 'Medium',
    temperature: '16-30°C',
    createdAt: new Date().toISOString()
  },
  {
    _id: '7',
    name: 'ZZ Plant',
    price: 459,
    category: 'Indoor',
    categories: ['Indoor', 'Low Light'],
    stock: 6,
    description: 'Extremely tolerant and low-maintenance plant.',
    image: 'https://picsum.photos/seed/zzplant/600/400',
    light: 'Low to indirect light',
    watering: 'Every 2-3 weeks',
    humidity: 'Low to medium',
    temperature: '15-28°C',
    createdAt: new Date().toISOString()
  },
  {
    _id: '8',
    name: 'Spider Plant',
    price: 179,
    category: 'Indoor',
    categories: ['Indoor', 'Hanging'],
    stock: 14,
    description: 'Classic, easy-care houseplant that produces baby offsets.',
    image: 'https://picsum.photos/seed/spiderplant/600/400',
    light: 'Bright indirect',
    watering: 'Once a week',
    humidity: 'Medium',
    temperature: '16-25°C',
    createdAt: new Date().toISOString()
  },
  {
    _id: '9',
    name: 'Fiddle Leaf Fig',
    price: 899,
    category: 'Indoor',
    categories: ['Indoor', 'Large'],
    stock: 2,
    description: 'Fashionable large-leaf plant popular in living spaces.',
    image: 'https://picsum.photos/seed/fiddlefig/600/400',
    light: 'Bright indirect light',
    watering: 'Every 7-10 days',
    humidity: 'Medium to high',
    temperature: '18-26°C',
    createdAt: new Date().toISOString()
  },
  {
    _id: '10',
    name: 'Monstera',
    price: 799,
    category: 'Indoor',
    categories: ['Indoor', 'Large'],
    stock: 4,
    description: 'Iconic split-leaf plant that adds tropical style.',
    image: 'https://picsum.photos/seed/monstera/600/400',
    light: 'Bright indirect',
    watering: 'Once a week',
    humidity: 'High',
    temperature: '18-27°C',
    createdAt: new Date().toISOString()
  },
  {
    _id: '11',
    name: 'Jade Plant',
    price: 349,
    category: 'Succulent',
    categories: ['Succulent', 'Small'],
    stock: 9,
    description: 'Thick, glossy leaves and a compact growth habit.',
    image: 'https://picsum.photos/seed/jadeplant/600/400',
    light: 'Bright light',
    watering: 'Every 2 weeks',
    humidity: 'Low',
    temperature: '18-24°C',
    createdAt: new Date().toISOString()
  },
  {
    _id: '12',
    name: 'Lavender',
    price: 299,
    category: 'Outdoor',
    categories: ['Outdoor', 'Flowering', 'Medicinal'],
    stock: 11,
  description: "Fragrant flowering plant that's great for gardens and pots.",
    image: 'https://picsum.photos/seed/lavender/600/400',
    light: 'Full sun',
    watering: 'Once a week',
    humidity: 'Low',
    temperature: '15-25°C',
    createdAt: new Date().toISOString()
  }
];

export const getAll = (params = {}) => {
  // Very small, simple filter/ pagination imitation
  let results = [...plants];

  if (params.search) {
    const q = params.search.toLowerCase();
    results = results.filter(p => p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
  }

  if (params.category) {
    results = results.filter(p => (p.category || '').toLowerCase() === String(params.category).toLowerCase() || (p.categories || []).map(c => c.toLowerCase()).includes(String(params.category).toLowerCase()));
  }

  if (params.availability && params.availability !== 'all') {
    if (params.availability === 'available') results = results.filter(p => (p.stock || p.stock_quantity || 0) > 0);
    if (params.availability === 'unavailable') results = results.filter(p => (p.stock || p.stock_quantity || 0) === 0);
  }

  // Simple sort
  if (params.sortBy) {
    const dir = (params.sortOrder || 'desc') === 'asc' ? 1 : -1;
    results.sort((a, b) => {
      if (a[params.sortBy] < b[params.sortBy]) return -1 * dir;
      if (a[params.sortBy] > b[params.sortBy]) return 1 * dir;
      return 0;
    });
  }

  // Pagination
  const page = parseInt(params.page, 10) || 1;
  const limit = parseInt(params.limit, 10) || results.length;
  const totalItems = results.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const start = (page - 1) * limit;
  const dataPage = results.slice(start, start + limit);

  return {
    data: dataPage,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems
    }
  };
};

export const getById = (id) => {
  return plants.find(p => String(p._id) === String(id)) || null;
};

export const add = (plantData) => {
  const id = String(Date.now());
  const newPlant = {
    _id: id,
    ...plantData,
    createdAt: new Date().toISOString(),
    image: plantData.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(plantData.name || 'Plant')}`
  };
  plants.unshift(newPlant);
  return newPlant;
};

export const getCategories = () => {
  const set = new Set();
  plants.forEach(p => {
    if (p.category) set.add(p.category);
    if (p.categories && Array.isArray(p.categories)) p.categories.forEach(c => set.add(c));
  });
  return Array.from(set);
};

export default plants;
