export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    bookings: string[]; // booking IDs
    orders: string[]; // order IDs
    giftCards: string[]; // gift card IDs
    createdAt: string;
  }