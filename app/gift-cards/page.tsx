'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Define gift card options
const giftCardAmounts = [25, 50, 75, 100, 150, 200];
const customAmountMin = 10;
const customAmountMax = 500;

// Define gift card template options
const cardTemplates = [
  { id: 'classic', name: 'Classic Black', color: 'bg-black' },
  { id: 'gold', name: 'Gold Accent', color: 'bg-amber-600' },
  { id: 'silver', name: 'Silver Edition', color: 'bg-gray-400' },
  { id: 'celebration', name: 'Celebration', color: 'bg-violet-700' }
];

const GiftCardPage = () => {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(50);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState<number | string>('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setIsCustomAmount(false);
  };

  const handleCustomAmountSelect = () => {
    setIsCustomAmount(true);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow only numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      setCustomAmount(value);
      
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= customAmountMin && numValue <= customAmountMax) {
        setAmount(numValue);
      }
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (isCustomAmount) {
      const numValue = parseInt(customAmount as string);
      if (isNaN(numValue) || numValue < customAmountMin || numValue > customAmountMax) {
        newErrors.amount = `Please enter an amount between $${customAmountMin} and $${customAmountMax}`;
      }
    }
    
    if (!recipientName.trim()) {
      newErrors.recipientName = 'Recipient name is required';
    }
    
    if (!recipientEmail.trim()) {
      newErrors.recipientEmail = 'Recipient email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      newErrors.recipientEmail = 'Please enter a valid email address';
    }
    
    if (!senderName.trim()) {
      newErrors.senderName = 'Your name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create gift card data
      const giftCardData = {
        amount,
        template: selectedTemplate,
        recipientName,
        recipientEmail,
        senderName,
        message,
      };
      
      // Store in session storage for checkout
      sessionStorage.setItem('giftCardData', JSON.stringify(giftCardData));
      
      // Redirect to checkout
      router.push('/gift-cards/checkout');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Gift Cards</h1>
        <p className="text-gray-600 mb-8">Give the gift of style and self-care with a BlackHouse Salon gift card.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gift Card Preview */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="border rounded-lg overflow-hidden">
              <div className={`h-48 ${cardTemplates.find(t => t.id === selectedTemplate)?.color} relative p-6 text-white`}>
                <div className="absolute top-6 left-6">
                  <div className="text-2xl font-bold mb-1">BlackHouse Salon</div>
                  <div className="text-sm opacity-80">Gift Card</div>
                </div>
                <div className="absolute bottom-6 right-6 text-2xl font-bold">
                  ${isCustomAmount ? (parseInt(customAmount as string) || 0) : amount}
                </div>
              </div>
              <div className="p-4 bg-white">
                <div className="text-sm text-gray-600">
                  <div className="mb-1">To: {recipientName || 'Recipient Name'}</div>
                  <div className="mb-1">From: {senderName || 'Your Name'}</div>
                  <div className="line-clamp-2 italic">
                    {message || 'Your personal message will appear here'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Gift Card Form */}
          <div>
            <form onSubmit={handleSubmit}>
              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Amount
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {giftCardAmounts.map(value => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleAmountSelect(value)}
                      className={`py-2 border rounded-md ${
                        amount === value && !isCustomAmount
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      ${value}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={handleCustomAmountSelect}
                    className={`py-2 border rounded-md ${
                      isCustomAmount
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    Custom
                  </button>
                </div>
                
                {isCustomAmount && (
                  <div className="mt-2">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">$</span>
                      <input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder={`${customAmountMin}-${customAmountMax}`}
                        className="border-gray-300 rounded-md focus:border-black focus:ring-black"
                        autoFocus
                      />
                    </div>
                    {errors.amount && (
                      <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Enter an amount between ${customAmountMin} and ${customAmountMax}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Card Design */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a Design
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {cardTemplates.map(template => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`h-16 rounded-md ${template.color} ${
                        selectedTemplate === template.id
                          ? 'ring-2 ring-offset-2 ring-black'
                          : ''
                      }`}
                      title={template.name}
                    />
                  ))}
                </div>
              </div>
              
              {/* Recipient Information */}
              <div className="mb-4">
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  id="recipientName"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full border-gray-300 rounded-md focus:border-black focus:ring-black"
                />
                {errors.recipientName && (
                  <p className="mt-1 text-sm text-red-600">{errors.recipientName}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  id="recipientEmail"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full border-gray-300 rounded-md focus:border-black focus:ring-black"
                />
                {errors.recipientEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.recipientEmail}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="senderName"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full border-gray-300 rounded-md focus:border-black focus:ring-black"
                />
                {errors.senderName && (
                  <p className="mt-1 text-sm text-red-600">{errors.senderName}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Personal Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  maxLength={150}
                  className="w-full border-gray-300 rounded-md focus:border-black focus:ring-black"
                  placeholder="Add a personal message..."
                />
                <p className="mt-1 text-xs text-gray-500 text-right">
                  {message.length}/150 characters
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition"
              >
                Continue to Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardPage;