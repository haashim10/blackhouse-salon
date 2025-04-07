// app/book/datetime/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Service } from '@/types/service';
import { Stylist } from '@/types/stylist';

// Helper functions for date handling
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getMonthName = (month: number) => {
  return new Date(0, month).toLocaleString('default', { month: 'long' });
};

const getDayName = (year: number, month: number, day: number) => {
  return new Date(year, month, day).toLocaleString('default', { weekday: 'short' });
};

const formatDate = (year: number, month: number, day: number) => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// Generate slots for demo purposes
const generateTimeSlots = () => {
  const slots = [];
  // Start at 9 AM
  let hour = 9;
  let minute = 0;
  
  // Generate slots until 7 PM
  while (hour < 19) {
    // Format the time
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    // Add the slot
    slots.push({
      time: timeString,
      available: Math.random() > 0.3 // Randomly set availability for demo
    });
    
    // Increment by 20 minutes
    minute += 20;
    if (minute >= 60) {
      hour += 1;
      minute = 0;
    }
  }
  
  return slots;
};

const DateTimeSelectionPage = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  
  // Calendar state
  const currentDate = new Date();
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Time slots
  const [timeSlots, setTimeSlots] = useState<{time: string, available: boolean}[]>([]);
  
  useEffect(() => {
    // Retrieve selected service and stylist from session storage
    const serviceData = sessionStorage.getItem('selectedService');
    const stylistData = sessionStorage.getItem('selectedStylist');
    
    if (serviceData) {
      setSelectedService(JSON.parse(serviceData));
    } else {
      // If no service selected, redirect back to service selection
      router.push('/book');
      return;
    }
    
    if (stylistData) {
      setSelectedStylist(JSON.parse(stylistData));
    } else {
      // If no stylist selected, redirect back to stylist selection
      router.push('/book/stylist');
      return;
    }
    
    // For demo, generate time slots
    setTimeSlots(generateTimeSlots());
  }, [router]);
  
  // Generate calendar data
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const monthName = getMonthName(currentMonth);
  
  // Calculate days to show in calendar
  const calendarDays = [];
  // Previous month padding
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  // Handle month navigation
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };
  
  // Handle date selection
  const handleDateSelect = (day: number) => {
    // Format date as YYYY-MM-DD
    const dateString = formatDate(currentYear, currentMonth, day);
    setSelectedDate(dateString);
    setSelectedTime(null);
    
    // In a real app, this would fetch available time slots for this date
    setTimeSlots(generateTimeSlots());
  };
  
  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  // Handle continue to details
  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      // Store selected date and time in session storage
      sessionStorage.setItem('selectedDate', selectedDate);
      sessionStorage.setItem('selectedTime', selectedTime);
      
      // Navigate to details page
      router.push('/book/details');
    }
  };
  
  // Handle back button
  const handleBack = () => {
    router.push('/book/stylist');
  };
  
  // Check if date is in the past
  const isDateInPast = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Choose Date & Time</h1>
        
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
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">3</div>
            <span className="mt-2">Date & Time</span>
          </div>
          <div className="flex-1 border-t-2 border-gray-300 self-center mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">4</div>
            <span className="mt-2">Details</span>
          </div>
        </div>
        
        {/* Selected Service and Stylist Summary */}
        {selectedService && selectedStylist && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-1">Selected Service & Stylist</h3>
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div>
                <span className="text-sm text-gray-600">Service: </span>
                <span>{selectedService.name}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Stylist: </span>
                <span>{selectedStylist.name}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Duration: </span>
                <span>{selectedService.duration} mins</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar */}
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-medium">Select Date</h2>
              <div className="flex items-center">
                <button 
                  onClick={goToPreviousMonth}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="mx-2 font-medium">{monthName} {currentYear}</span>
                <button 
                  onClick={goToNextMonth}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              {/* Day headers */}
              <div className="grid grid-cols-7 bg-gray-50">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="py-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => {
                  // If day is null, it's a padding day
                  if (day === null) {
                    return <div key={`empty-${index}`} className="p-2 border-t border-r"></div>;
                  }
                  
                  const dateString = formatDate(currentYear, currentMonth, day);
                  const isSelected = dateString === selectedDate;
                  const isPast = isDateInPast(currentYear, currentMonth, day);
                  const isToday = 
                    day === currentDate.getDate() && 
                    currentMonth === currentDate.getMonth() && 
                    currentYear === currentDate.getFullYear();
                  
                  return (
                    <div 
                      key={`day-${day}`}
                      className={`p-2 border-t border-r ${
                        isPast ? 'text-gray-300' : 'cursor-pointer hover:bg-gray-50'
                      }`}
                      onClick={() => !isPast && handleDateSelect(day)}
                    >
                      <div className={`
                        flex items-center justify-center w-10 h-10 mx-auto rounded-full
                        ${isSelected ? 'bg-black text-white' : ''}
                        ${isToday && !isSelected ? 'border border-black' : ''}
                      `}>
                        {day}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Time Slots */}
          <div>
            <h2 className="text-xl font-medium mb-4">
              {selectedDate ? 'Select Time' : 'Select a date first'}
            </h2>
            
            {selectedDate ? (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    disabled={!slot.available}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    className={`py-3 border rounded-md text-center
                      ${!slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                        slot.time === selectedTime ? 'bg-black text-white border-black' : 
                        'hover:bg-gray-50 border-gray-300'}
                    `}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 border rounded-lg p-8 text-center">
                Please select a date from the calendar to view available times.
              </div>
            )}
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
          
          <button 
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime}
            className={`px-6 py-2 rounded ${
              !selectedDate || !selectedTime
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800 transition'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelectionPage;