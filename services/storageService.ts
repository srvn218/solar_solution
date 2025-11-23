import { Product, Project, QuoteSubmission } from '../types';

// Seed Data (Initial Content)
const INITIAL_PRODUCTS: Product[] = [
  // Solar Panels
  {
    id: 'p1',
    name: 'Aswin Pro Mono 550W',
    category: 'Panel',
    price: '₹22,000',
    specs: '550W | 21.8% Efficiency',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    description: 'High-performance monocrystalline PERC module designed for maximum energy yield in low-light conditions.'
  },
  {
    id: 'p2',
    name: 'Aswin Bifacial Elite',
    category: 'Panel',
    price: '₹28,500',
    specs: '600W | Dual-Sided Generation',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&auto=format&fit=crop&q=80',
    description: 'Captures sunlight from both the front and rear sides, increasing energy production by up to 30%.'
  },

  // Batteries
  {
    id: 'b1',
    name: 'Aswin PowerCore 10kWh',
    category: 'Battery',
    price: '₹2,50,000',
    specs: '10kWh | Deep Cycle Gel',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/FU/GP/YS/133436439/utl-ust2036-200ah-solar-battery-1000x1000.jpg', // Block battery style
    description: 'Heavy-duty deep cycle storage system designed for consistent power backup and long life.'
  },
  {
    id: 'b2',
    name: 'EcoVault 5kWh',
    category: 'Battery',
    price: '₹1,35,000',
    specs: '5kWh | Tubular Tech',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/FU/GP/YS/133436439/utl-ust2036-200ah-solar-battery-1000x1000.jpg', // Block battery style
    description: 'Reliable and robust battery solution perfect for residential off-grid and hybrid setups.'
  },

  // Inverters
  {
    id: 'i1',
    name: 'Smart Hybrid Inverter 5kW',
    category: 'Inverter',
    price: '₹85,000',
    specs: '5kW | Grid-Tie + Off-Grid',
    image: 'https://www.upsinverter.com/utl/wp-content/uploads/2024/10/5-25-1-5.jpg', // Solar inverter installation
    description: 'Intelligent power management system that seamlessly switches between solar, battery, and grid power.'
  },
  {
    id: 'i2',
    name: 'Pro String Inverter 10kW',
    category: 'Inverter',
    price: '₹65,000',
    specs: '10kW | 3-Phase',
    image: 'https://www.upsinverter.com/utl/wp-content/uploads/2024/10/5-25-1-5.jpg', // Industrial electrical equipment
    description: 'Robust and reliable inverter optimized for larger residential homes or small commercial setups.'
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Sunnydale Residential Complex',
    location: 'Chennai, TN',
    capacity: '150 kW',
    image: 'https://images.unsplash.com/photo-1565354577827-b088e622b79e?w=800&auto=format&fit=crop&q=60',
    completionDate: 'Jan 2024'
  },
  {
    id: '2',
    title: 'Green Valley Farm',
    location: 'Coimbatore, TN',
    capacity: '50 kW',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=60',
    completionDate: 'Nov 2023'
  },
  {
    id: '3',
    title: 'TechHub Office Park',
    location: 'Bangalore, KA',
    capacity: '300 kW',
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop&q=60',
    completionDate: 'Mar 2024'
  },
  {
    id: '4',
    title: 'Modern Villa Retrofit',
    location: 'Madurai, TN',
    capacity: '12 kW',
    image: 'https://images.unsplash.com/photo-1598475253139-8cc5c3c0c0ac?w=800&auto=format&fit=crop&q=60',
    completionDate: 'Dec 2023'
  },
];

const KEYS = {
  PRODUCTS: 'aswin_products',
  PROJECTS: 'aswin_projects',
  QUOTES: 'aswin_quotes'
};

export const storageService = {
  // Products
  getProducts: (): Product[] => {
    const stored = localStorage.getItem(KEYS.PRODUCTS);
    if (!stored) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(stored);
  },
  saveProduct: (product: Product) => {
    const products = storageService.getProducts();
    const updated = [...products, product];
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(updated));
  },
  deleteProduct: (id: string) => {
    const products = storageService.getProducts();
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(updated));
  },

  // Projects
  getProjects: (): Project[] => {
    const stored = localStorage.getItem(KEYS.PROJECTS);
    if (!stored) {
      localStorage.setItem(KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(stored);
  },
  saveProject: (project: Project) => {
    const projects = storageService.getProjects();
    const updated = [...projects, project];
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(updated));
  },
  deleteProject: (id: string) => {
    const projects = storageService.getProjects();
    const updated = projects.filter(p => p.id !== id);
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(updated));
  },

  // Quotes
  getQuotes: (): QuoteSubmission[] => {
    const stored = localStorage.getItem(KEYS.QUOTES);
    return stored ? JSON.parse(stored) : [];
  },
  saveQuote: (quote: Omit<QuoteSubmission, 'id' | 'date' | 'status'>) => {
    const quotes = storageService.getQuotes();
    const newQuote: QuoteSubmission = {
      ...quote,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'New'
    };
    const updated = [newQuote, ...quotes];
    localStorage.setItem(KEYS.QUOTES, JSON.stringify(updated));
  },
  updateQuoteStatus: (id: string, status: QuoteSubmission['status']) => {
    const quotes = storageService.getQuotes();
    const updated = quotes.map(q => q.id === id ? { ...q, status } : q);
    localStorage.setItem(KEYS.QUOTES, JSON.stringify(updated));
  }
};