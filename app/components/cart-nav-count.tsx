"use client";

import { useCart } from "../context/cart-context";

interface CartNavCountProps {
  textColor?: string;
}

export default function CartNavCount({ textColor }: CartNavCountProps) {
  const { itemCount } = useCart();
  
  if (itemCount === 0) {
    return <span className="ml-1" style={{ color: textColor || 'inherit' }}>(0)</span>;
  }
  
  // Determine appropriate background and text colors based on textColor
  const getBgColor = () => {
    if (textColor === '#ffffff' || textColor === '#fff') {
      return '#ffffff';
    }
    return 'black';
  };
  
  const getTextColor = () => {
    if (textColor === '#ffffff' || textColor === '#fff') {
      return '#000000';
    }
    return 'white';
  };
  
  return (
    <span className="inline-flex items-center ml-1">
      <span 
        className="text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-1"
        style={{ 
          backgroundColor: getBgColor(),
          color: getTextColor()
        }}
      >
        {itemCount > 99 ? '99+' : itemCount}
      </span>
    </span>
  );
}