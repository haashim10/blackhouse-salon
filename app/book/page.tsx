// app/book/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Service, ServiceCategory } from '@/types/service';

// Sample service data (will be fetched from API in production)
const serviceData: Service[] = [
  {
    id: 'mens-cut-style',
    name: 'Cut and Style',
    category: 'Mens',
    price: 25,
    duration: 20,
    description: 'Classic men\'s haircut with styling',
  },
  {
    id: 'mens-cut-highlights',
    name: 'Cut and Highlights',
    category: 'Mens',
    price: 25,
    duration: 20,
    description: 'Men\'s haircut with highlighting',
  },
  {
    id: 'mens-colour-cut',
    name: 'Colour and Cut',
    category: 'Mens',
    price: 28,
    duration: 20,
    description: 'Men\'s haircut with full coloring',
  },
  {
    id: 'mens-beard-cut',
    name: 'Beard and Cut',
    category: 'Mens',
    price: 29,
    duration: 20,
    description: 'Men\'s haircut with beard styling',
  },
  {
    id: 'mens-student-cut',
    name: 'Student Cut',
    category: 'Mens',
    price: 25,
    duration: 20,
    description: 'Discounted haircut for students',
  },
  {
    id: 'mens-beard-only',
    name: 'Beard Only',
    category: 'Mens',
    price: 22,
    duration: 20,
    description: 'Beard trim and styling',
  },
  {
    id: 'mens-back-sides',
    name: 'Back & Sides',
    category: 'Mens',
    price: 20,
    duration: 20,
    description: 'Trim back and sides only',
  },
  {
    id: 'womens-wash-cut-finish-short',
    name: 'Wash, Cut and Finish (Short)',
    category: 'Womens',
    price: 34,
    duration: 20,
    description: 'Complete hair service for short hair',
  },
  {
    id: 'womens-wash-cut-finish-medium',
    name: 'Wash, Cut and Finish (Medium)',
    category: 'Womens',
    price: 44,
    duration: 20,
    description: 'Complete hair service for medium length hair',
  },
  {
    id: 'womens-wash-cut-finish-long',
    name: 'Wash, Cut and Finish (Long)',
    category: 'Womens',
    price: 54,
    duration: 20,
    description: 'Complete hair service for long hair',
  },
];

const BookingPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('Mens');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  const categories: ServiceCategory[] = ['Mens', 'Womens'];
  
  const filteredServices = serviceData.filter(
    service => service.category === selectedCategory
  );
  
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    // Store selection in sessionStorage to persist through navigation
    sessionStorage.setItem('selectedService', JSON.stringify(service));
    router.push('/book/stylist');
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>
        
        {/* Booking Progress */}
        <div className="flex justify-between mb-8 text-sm">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">1</div>
            <span className="mt-2">Service</span>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 self-center mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">2</div>
            <span className="mt-2">Stylist</span>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 self-center mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">3</div>
            <span className="mt-2">Date & Time</span>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 self-center mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">4</div>
            <span className="mt-2">Details</span>
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${selectedCategory === category
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceSelect(service)}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium">{service.name}</h3>
                <span className="font-semibold">${service.price}</span>
              </div>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.duration} mins
              </div>
            </div>
          ))}
        </div>
        
        {/* Group Booking Option */}
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-2">Group Booking</h3>
          <p className="text-gray-600 mb-4">Looking to book for multiple people? Our group booking option allows you to schedule appointments for friends or family at the same time.</p>
          <Link 
            href="/book/group" 
            className="block w-full md:w-auto md:inline-block text-center bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Start Group Booking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;