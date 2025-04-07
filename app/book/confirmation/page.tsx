// app/book/confirmation/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Service } from '@/types/service';
import { Stylist } from '@/types/stylist';

interface BookingData {
  service: Service;
  stylist: Stylist;
  date: string;
  time: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes?: string;
  };
  marketingConsent: boolean;
}

const BookingConfirmationPage = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [bookingId, setBookingId] = useState<string>('');
  
  useEffect(() => {
    // Retrieve booking data from session storage
    const bookingDataJson = sessionStorage.getItem('bookingData');
    
    if (!bookingDataJson) {
      // If no booking data, redirect to booking start
      router.push('/book');
      return;
    }
    
    // Parse booking data
    const parsedData = JSON.parse(bookingDataJson);
    setBookingData(parsedData);
    
    // Generate a random booking ID
    // In a real app, this would come from the server
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setBookingId(`BH${randomId}`);
    
    // Clear session storage for booking flow to prevent back navigation refreshing
    // Note: We don't clear localStorage which has user info for returning customers
    sessionStorage.removeItem('selectedService');
    sessionStorage.removeItem('selectedStylist');
    sessionStorage.removeItem('selectedDate');
    sessionStorage.removeItem('selectedTime');
    sessionStorage.removeItem('bookingData');
  }, [router]);
  
  // Format date for display
  const formatDisplayDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // If no booking data is available, show loading state
  if (!bookingData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your booking confirmation...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            We've sent a confirmation email to {bookingData.customer.email}
          </p>
        </div>
        
        {/* Booking Details Card */}
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm mb-8">
          <div className="border-b p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Booking Details</h2>
              <span className="text-sm text-gray-500">Booking ID: {bookingId}</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Details */}
              <div>
                <h3 className="text-sm uppercase text-gray-500 mb-1">Service</h3>
                <p className="font-medium mb-1">{bookingData.service.name}</p>
                <p className="text-gray-600 text-sm">
                  ${bookingData.service.price} • {bookingData.service.duration} mins
                </p>
              </div>
              
              {/* Stylist Details */}
              <div>
                <h3 className="text-sm uppercase text-gray-500 mb-1">Stylist</h3>
                <p>{bookingData.stylist.name}</p>
              </div>
              
              {/* Date and Time */}
              <div>
                <h3 className="text-sm uppercase text-gray-500 mb-1">Date & Time</h3>
                <p className="font-medium">{formatDisplayDate(bookingData.date)}</p>
                <p className="text-gray-600">{bookingData.time}</p>
              </div>
              
              {/* Customer Details */}
              <div>
                <h3 className="text-sm uppercase text-gray-500 mb-1">Customer</h3>
                <p className="font-medium">
                  {bookingData.customer.firstName} {bookingData.customer.lastName}
                </p>
                <p className="text-gray-600 text-sm">{bookingData.customer.phone}</p>
                <p className="text-gray-600 text-sm">{bookingData.customer.email}</p>
              </div>
            </div>
            
            {/* Additional Notes */}
            {bookingData.customer.notes && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm uppercase text-gray-500 mb-1">Additional Notes</h3>
                <p className="text-gray-600">{bookingData.customer.notes}</p>
              </div>
            )}
            
            {/* Cancellation Policy */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm uppercase text-gray-500 mb-1">Cancellation Policy</h3>
              <p className="text-gray-600 text-sm">
                Please give at least 24 hours notice for cancellations or rescheduling to avoid a cancellation fee.
              </p>
            </div>
          </div>
        </div>
        
        {/* What to bring / Preparation */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Preparing for Your Appointment</h2>
          <ul className="space-y-2">
            <li className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Please arrive 10 minutes before your appointment time.</span>
            </li>
            <li className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Bring reference photos if you have a specific style in mind.</span>
            </li>
            <li className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>We accept all major credit cards, cash, and mobile payments.</span>
            </li>
            <li className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Our salon is COVID-safe with enhanced cleaning protocols.</span>
            </li>
          </ul>
        </div>
        
        {/* Location and Contact */}
        <div className="bg-white border rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Salon Location</h2>
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-medium">BlackHouse Salon</p>
                <p className="text-gray-600">123 Style Street</p>
                <p className="text-gray-600">New York, NY 10001</p>
              </div>
            </div>
            <div className="flex items-start mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="text-gray-600">(555) 123-4567</p>
                <p className="text-gray-600">info@blackhousesalon.com</p>
              </div>
            </div>
          </div>
          <div className="h-48 bg-gray-200 relative">
            {/* In a real app, embed a Google Map here */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Map placeholder
            </div>
          </div>
        </div>
        
        {/* Add to Calendar and Continue Shopping Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href="#" 
            className="flex-1 bg-black text-white text-center py-3 rounded hover:bg-gray-800 transition"
          >
            Add to Calendar
          </a>
          <Link 
            href="/shop"
            className="flex-1 border border-gray-300 text-gray-700 text-center py-3 rounded hover:bg-gray-50 transition"
          >
            Browse Hair Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;