export interface Product {
  id: string;
  name: string;
  category: 'Panel' | 'Inverter' | 'Battery' | 'Accessory';
  price: string;
  specs: string;
  image: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  capacity: string;
  image: string;
  completionDate: string;
}

export interface QuoteSubmission {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  monthlyBill: string;
  roofType: string;
  status: 'New' | 'Contacted' | 'Completed';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export enum SolarType {
  RESIDENTIAL = 'Residential',
  COMMERCIAL = 'Commercial',
  INDUSTRIAL = 'Industrial'
}