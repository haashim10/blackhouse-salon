// app/book/details/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Service } from '@/types/service';
import { Stylist } from '@/types/stylist';

const BookingDetailsPage = () => {
  const router = useRouter();
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  
  // Booking information from previous steps
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Validation state
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    // Retrieve booking information from session storage
    const serviceData = sessionStorage.getItem('selectedService');
    const stylistData = sessionStorage.getItem('selectedStylist');
    const date = sessionStorage.getItem('selectedDate');
    const time = sessionStorage.getItem('selectedTime');
    
    // Check if all required information is available
    if (!serviceData || !stylistData || !date || !time) {
      // If any data is missing, redirect to appropriate step
      if (!serviceData) {
        router.push('/book');
      } else if (!stylistData) {
        router.push('/book/stylist');
      } else {
        router.push('/book/datetime');
      }
      return;
    }
    
    // Set booking information state
    setSelectedService(JSON.parse(serviceData));
    setSelectedStylist(JSON.parse(stylistData));
    setSelectedDate(date);
    setSelectedTime(time);
    
    // Check for user information in localStorage (for returning users)
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      const userInfo = JSON.parse(savedUserInfo);
      setFirstName(userInfo.firstName || '');
      setLastName(userInfo.lastName || '');
      setEmail(userInfo.email || '');
      setPhone(userInfo.phone || '');
    }
  }, [router]);
  
  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Strip all non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Format according to pattern: (XXX) XXX-XXXX
    if (numericValue.length <= 3) {
      return numericValue;
    } else if (numericValue.length <= 6) {
      return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3)}`;
    } else {
      return `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
    }
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedNumber);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save user info to localStorage for returning users
      const userInfo = {
        firstName,
        lastName,
        email,
        phone
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      // Create booking data
      const bookingData = {
        service: selectedService,
        stylist: selectedStylist,
        date: selectedDate,
        time: selectedTime,
        customer: {
          firstName,
          lastName,
          email,
          phone,
          notes
        },
        marketingConsent
      };
      
      // Store booking data for confirmation page
      sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
      
      // In a real app, would send this data to the server here
      // and then redirect after successful response
      
      // Redirect to confirmation page
      router.push('/book/confirmation');
    }
  };
  
  // Handle back button
  const handleBack = () => {
    router.push('/book/datetime');
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Details</h1>
        
        {/* Booking Progress */}
        <div className="flex justify-between mb-8 text-sm">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">✓</div>
            <span className="mt-2">Service</span>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 self-center mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">✓</div>
            <span className="mt-2">Stylist</span>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 self-center mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">✓</div>
            <span className="mt-2">Date & Time</span>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 self-center mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">4</div>
            <span className="mt-2">Details</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Booking Summary (Right Column on Desktop) */}
          <div className="md:order-2 md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              
              {selectedService && selectedStylist && selectedDate && selectedTime && (
                <>
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="font-medium mb-1">{selectedService.name}</div>
                    <div className="text-gray-600 text-sm mb-1">{selectedService.duration} mins</div>
                    <div className="text-gray-600 text-sm">${selectedService.price}</div>
                  </div>
                  
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Stylist</div>
                    <div>{selectedStylist.name}</div>
                  </div>
                  
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Date & Time</div>
                    <div>{formatDisplayDate(selectedDate)}</div>
                    <div className="text-gray-800">{selectedTime}</div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${selectedService.price}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Payment will be collected at the salon.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Customer Details Form (Left Column on Desktop) */}
          <div className="md:order-1 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border-gray-300 rounded-md focus:border-black focus:ring-black"
                    required
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border-gray-300 rounded-md focus:border-black focus:ring-black"
                    required
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-gray-300 rounded-md focus:border-black focus:ring-black"
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full border-gray-300 rounded-md focus:border-black focus:ring-black"
                  placeholder="(XXX) XXX-XXXX"
                  required
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full border-gray-300 rounded-md focus:border-black focus:ring-black"
                  placeholder="Any special requests or information the stylist should know..."
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketingConsent"
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="focus:ring-black h-4 w-4 text-black border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="marketingConsent" className="text-sm text-gray-600">
                      I would like to receive promotional emails about special offers, new services, and events.
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button 
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 border border-black rounded text-black hover:bg-gray-100 transition"
                >
                  Back
                </button>
                
                <button 
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  Complete Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;