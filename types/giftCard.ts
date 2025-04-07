export interface GiftCard {
    id: string;
    amount: number;
    recipientName: string;
    recipientEmail: string;
    senderName: string;
    message?: string;
    code: string;
    expiryDate: string; // YYYY-MM-DD
    isRedeemed: boolean;
    redeemedAt?: string;
  }