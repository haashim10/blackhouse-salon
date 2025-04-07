export type ServiceCategory = 'Mens' | 'Womens' | 'Children' | 'Other';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  duration: number; // in minutes
  description: string;
  image?: string;
}