"use client";

import { useState } from "react";

interface AddToCartProps {
  id: string;
  name: string;
  price: number;
  image: string;
  type: "product" | "service";
  options?: string[];
}

export default function AddToCart({ id, name, price, image, type, options }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      // In a real implementation, you would:
      // 1. Get existing cart from localStorage or state management
      // 2. Add new item or update quantity if already exists
      // 3. Save updated cart back to storage
      
      const cartItem = {
        id,
        name,
        price,
        quantity,
        image,
        type,
        options
      };
      
      console.log("Adding to cart:", cartItem);
      
      // You would implement something like this:
      // const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      // const existingItemIndex = existingCart.findIndex(item => item.id === id);
      
      // if (existingItemIndex >= 0) {
      //   existingCart[existingItemIndex].quantity += quantity;
      // } else {
      //   existingCart.push(cartItem);
      // }
      
      // localStorage.setItem('cart', JSON.stringify(existingCart));
      
      setIsAdding(false);
      setIsAdded(true);
      
      // Reset added state after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 800);
  };

  return (
    <div className="mt-6">
      {type === "product" && (
        <div className="flex items-center mb-4">
          <span className="mr-3 text-sm text-gray-700 dark:text-gray-300">Quantity:</span>
          <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              aria-label="Decrease quantity"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              aria-label="Increase quantity"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <button
        onClick={handleAddToCart}
        disabled={isAdding || isAdded}
        className={`w-full flex justify-center items-center py-3 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors ${
          isAdded 
            ? "bg-green-600 text-white" 
            : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
        } ${(isAdding || isAdded) ? "cursor-not-allowed" : ""}`}
      >
        {isAdding ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-black" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </>
        ) : isAdded ? (
          <>
            <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Added to Cart
          </>
        ) : (
          `Add to Cart${type === "product" ? ` · $${price.toFixed(2)}` : ""}`
        )}
      </button>
    </div>
  );
}