export interface Booking {
    id: string;
    customerId: string;
    serviceId: string;
    stylistId: string;
    date: string; // YYYY-MM-DD
    startTime: string; // HH:MM
    endTime: string; // HH:MM
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: string;
    updatedAt: string;
  }