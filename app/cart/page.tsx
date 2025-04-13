"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Types for cart items
interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: "product" | "service";
  options?: string[];
}

export default function Cart() {
  // State for cart items - would come from localStorage or state management in real app
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  // Load cart items - simulated for now
  useEffect(() => {
    // Simulate loading cart from localStorage or API
    setTimeout(() => {
      setCartItems([
        {
          id: "prod1",
          name: "Kevin Murphy Shampoo",
          price: 32.99,
          quantity: 1,
          image: "/Kevin Murphy.avif",
          type: "product"
        },
        {
          id: "serv1",
          name: "Women's Haircut & Style",
          price: 65.00,
          quantity: 1,
          image: "/hairstyleimage1.jpg",
          type: "service",
          options: ["With Stylist Chelsea", "Thursday, April 17 at 2:00 PM"]
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.07; // 7% tax rate example
  const total = subtotal + tax - discount;

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      )
    );
  };

  // Apply coupon
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "WELCOME20") {
      setDiscount(subtotal * 0.2); // 20% discount
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  };

  return (
    <main className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h1 className="text-4xl uppercase mb-8">
          <div className="inline-block" style={{ width: "210px" }}>
            <span className="typing-animation typing-4">
              Your Cart.
            </span>
          </div>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black dark:border-white"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
            <svg 
              className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            <h2 className="mt-4 text-2xl font-medium text-gray-900 dark:text-gray-100">Your cart is empty</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Looks like you haven't added any items to your cart yet.
            </p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:flex-shrink-0 h-24 w-24 relative rounded-md overflow-hidden mb-4 sm:mb-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="sm:ml-6 flex flex-col flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-medium">{item.name}</h3>
                              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {item.type === "service" && item.options?.map((option, i) => (
                                  <p key={i}>{option}</p>
                                ))}
                              </div>
                            </div>
                            <p className="text-base font-medium">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            {item.type === "product" ? (
                              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                >
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <span className="px-4">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                                >
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Service Appointment
                              </div>
                            )}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Continue Shopping Button */}
              <div className="mt-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <svg className="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-6 uppercase">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount (20%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Code */}
                {!couponApplied && (
                  <div className="mt-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Discount Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-black dark:focus:ring-white dark:bg-gray-800"
                        placeholder="Enter code"
                      />
                      <button
                        onClick={applyCoupon}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Try "WELCOME20" for 20% off your order
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <div className="mt-6">
                  <Link
                    href="/checkout"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}