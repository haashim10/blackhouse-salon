export interface Stylist {
    id: string;
    name: string;
    title: string;
    bio: string;
    image: string;
    specialties: string[];
    availability: {
      [key: string]: { // date in YYYY-MM-DD format
        slots: {
          start: string; // HH:MM format
          end: string; // HH:MM format
          available: boolean;
        }[];
      };
    };
  }