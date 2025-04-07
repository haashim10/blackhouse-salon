export interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    description: string;
    features: string[];
    images: string[];
    stock: number;
    reviews: {
      rating: number;
      count: number;
    };
  }