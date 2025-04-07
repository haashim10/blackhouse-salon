// app/book/stylist/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Stylist } from '@/types/stylist';
import { Service } from '@/types/service';

// Updated stylist data to match your team
const stylistsData: Stylist[] = [
  {
    id: 'stylist-1',
    name: 'Robbie',
    title: 'Creative Director',
    bio: 'Meet the owner and director of BLACK HOUSE salon. Robbies has a passion for cutting short hair on both men and women. Robbie takes pride in his creative colouring and is the go to guy for vivid colour.',
    image: '/Robbie.jpg',
    specialties: ['Precision Cutting', 'Editorial Styling', 'Hair Transformations'],
    availability: {
      '2024-05-20': {
        slots: [
          { start: '09:00', end: '09:30', available: true },
          { start: '09:30', end: '10:00', available: true },
          { start: '10:00', end: '10:30', available: false },
          // More slots...
        ]
      },
      // More dates...
    }
  },
  {
    id: 'stylist-2',
    name: 'Chelsea',
    title: 'Senior Stylist',
    bio: 'Meet Chelsea, our in house transformation expert. If youre looking for a complete overhaul, whether that be a restyle, colour change or extensions, Chelsea has you covered.',
    image: '/Chelsea.jpg',
    specialties: ['Color Transformations', 'Balayage', 'Men\'s Grooming'],
    availability: {
      '2024-05-20': {
        slots: [
          { start: '09:00', end: '09:30', available: false },
          { start: '09:30', end: '10:00', available: true },
          { start: '10:00', end: '10:30', available: true },
          // More slots...
        ]
      },
      // More dates...
    }
  },
  {
    id: 'stylist-3',
    name: 'Gemma',
    title: 'Color Specialist',
    bio: 'Meet Gemma. Gemma has been with the team for over a year and at just 21 is producing incredible colour work. Gemma loves all things colour and in the time she has been at Black House.',
    image: '/Gemma.jpg',
    specialties: ['Blonding', 'Creative Color', 'Color Correction'],
    availability: {
      '2024-05-20': {
        slots: [
          { start: '09:00', end: '09:30', available: true },
          { start: '09:30', end: '10:00', available: true },
          { start: '10:00', end: '10:30', available: true },
          // More slots...
        ]
      },
      // More dates...
    }
  },
  {
    id: 'stylist-4',
    name: 'Limara Jade',
    title: 'Texture Expert',
    bio: 'Meet Limara Jade, the skin care expert at Black House Salon, whose passion for skincare shines through her holistic approach to beauty and wellness.',
    image: '/LimmaraJade.jpg',
    specialties: ['Curly Hair', 'Natural Texture', 'Extensions'],
    availability: {
      '2024-05-20': {
        slots: [
          { start: '09:00', end: '09:30', available: true },
          { start: '09:30', end: '10:00', available: false },
          { start: '10:00', end: '10:30', available: true },
          // More slots...
        ]
      },
      // More dates...
    }
  },
  {
    id: 'stylist-5',
    name: 'Aisha',
    title: 'Style Innovator',
    bio: 'Meet Aisha. Aisha has 20 years experience in hairdressing having worked in some of the best salons in huddersfield over her career. Her passion for creating beautiful hair is only matched by her vibrant personality.',
    image: '/Aisha.jpg',
    specialties: ['Avant-Garde Styling', 'Precision Bob Cuts', 'Asian Hair Textures'],
    availability: {
      '2024-05-20': {
        slots: [
          { start: '09:00', end: '09:30', available: false },
          { start: '09:30', end: '10:00', available: true },
          { start: '10:00', end: '10:30', available: true },
          // More slots...
        ]
      },
      // More dates...
    }
  }
];

const StylistSelectionPage = () => {
  const router = useRouter();
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    // Retrieve selected service from session storage
    const serviceData = sessionStorage.getItem('selectedService');
    if (serviceData) {
      setSelectedService(JSON.parse(serviceData));
    } else {
      // If no service selected, redirect back to service selection
      router.push('/book');
    }
  }, [router]);
  
  const handleStylistSelect = (stylist: Stylist) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedStylist(stylist);
      setIsTransitioning(false);
      
      // Store selection in sessionStorage
      sessionStorage.setItem('selectedStylist', JSON.stringify(stylist));
      router.push('/book/datetime');
    }, 300);
  };
  
  const handleBack = () => {
    router.push('/book');
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Choose Your Stylist</h1>
        
        {/* Booking Progress */}
        <div className="flex justify-between mb-8 text-sm">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">✓</div>
            <span className="mt-2">Service</span>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 self-center mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">2</div>
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
        
        {/* Selected Service Summary */}
        {selectedService && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-1">Selected Service</h3>
            <div className="flex justify-between">
              <span>{selectedService.name}</span>
              <span>${selectedService.price} • {selectedService.duration} mins</span>
            </div>
          </div>
        )}
        
        {/* Stylist Navigation Pills */}
        <div className="flex flex-wrap justify-center mb-8 gap-3">
          {stylistsData.map((stylist, index) => (
            <button
              key={index}
              onClick={() => handleStylistSelect(stylist)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedStylist?.id === stylist.id 
                  ? "bg-black text-white dark:bg-white dark:text-black scale-105" 
                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {stylist.name}
            </button>
          ))}
        </div>
        
        {/* Stylist Selection Options */}
        <div className={`space-y-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Our Stylists</h2>
            <button 
              className="text-sm text-gray-600 hover:text-black underline"
              onClick={() => handleStylistSelect(stylistsData[Math.floor(Math.random() * stylistsData.length)])}
            >
              Any Available
            </button>
          </div>
          
          {stylistsData.map((stylist) => (
            <div 
              key={stylist.id}
              onClick={() => handleStylistSelect(stylist)}
              className="flex flex-col md:flex-row border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-full md:w-32 h-32 relative rounded-full overflow-hidden mb-4 md:mb-0 mx-auto md:mx-0">
                <Image
                  src={stylist.image}
                  alt={stylist.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="md:ml-6 flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <h3 className="text-lg font-medium">{stylist.name}</h3>
                    <p className="text-gray-600">{stylist.title}</p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <div className="flex text-yellow-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    </div>
                    <span className="ml-1 text-sm text-gray-600">5.0</span>
                  </div>
                </div>
                
                <p className="text-gray-600 my-3">{stylist.bio}</p>
                
                <div className="flex flex-wrap gap-2">
                  {stylist.specialties.map((specialty, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Team Grid - Small Preview */}
        <div className="mt-16 mb-8">
          <h2 className="text-xl font-medium mb-6">Quick Select</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {stylistsData.map((stylist, index) => (
              <div 
                key={index} 
                className="cursor-pointer transition-all duration-300"
                onClick={() => handleStylistSelect(stylist)}
              >
                <div className="aspect-square relative overflow-hidden rounded">
                  <Image
                    src={stylist.image}
                    alt={stylist.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="mt-2 text-center font-medium">{stylist.name}</p>
                <p className="text-xs text-center text-accent">{stylist.title}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button 
            onClick={handleBack}
            className="px-6 py-2 border border-black rounded text-black hover:bg-gray-100 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default StylistSelectionPage;