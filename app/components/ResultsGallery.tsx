"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ConsultationType {
  hairLength?: 'short' | 'medium' | 'long' | 'very-long';
  hairColor?: 'black' | 'dark-brown' | 'medium-brown' | 'light-brown' | 'dark-blonde' | 'medium-blonde' | 'light-blonde' | 'platinum' | 'red' | 'copper' | 'auburn' | 'blue' | 'pink' | 'purple' | 'green';
  hairStyle?: 'straight' | 'wavy' | 'curly' | 'coily';
  volume?: string;
}

interface ResultsGalleryProps {
  results: string[];
  consultation: ConsultationType;
  onStartOver: () => void;
}

type LengthMap = {
  [K in NonNullable<ConsultationType['hairLength']>]: string;
};

type ColorMap = {
  [K in NonNullable<ConsultationType['hairColor']>]: string;
};

type StyleMap = {
  [K in NonNullable<ConsultationType['hairStyle']>]: string;
};

export default function ResultsGallery({ results, consultation, onStartOver }: ResultsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(results?.[0] || null);
  
  if (!results || results.length === 0) {
    return (
      <div className="text-center p-12">
        <p className="mb-4">No results were generated. Please try again.</p>
        <button
          onClick={onStartOver}
          className="px-6 py-2 border border-accent hover:bg-accent hover:text-background transition-colors"
        >
          Start Over
        </button>
      </div>
    );
  }
  
  // Format consultation data for display
  const getHairLength = () => {
    const lengthMap: LengthMap = {
      "short": "Short",
      "medium": "Medium",
      "long": "Long",
      "very-long": "Very Long"
    };
    return consultation?.hairLength ? lengthMap[consultation.hairLength] : "";
  };
  
  const getHairColor = () => {
    const colorMap: ColorMap = {
      "black": "Black",
      "dark-brown": "Dark Brown",
      "medium-brown": "Medium Brown",
      "light-brown": "Light Brown",
      "dark-blonde": "Dark Blonde",
      "medium-blonde": "Medium Blonde",
      "light-blonde": "Light Blonde",
      "platinum": "Platinum Blonde",
      "red": "Red",
      "copper": "Copper",
      "auburn": "Auburn",
      "blue": "Blue",
      "pink": "Pink",
      "purple": "Purple",
      "green": "Green"
    };
    return consultation?.hairColor ? colorMap[consultation.hairColor] : "";
  };
  
  const getHairStyle = () => {
    const styleMap: StyleMap = {
      "straight": "Straight",
      "wavy": "Wavy",
      "curly": "Curly",
      "coily": "Coily"
    };
    return consultation?.hairStyle ? styleMap[consultation.hairStyle] : "";
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-light mb-2 text-center">Your Personalized Hairstyle Options</h2>
      <p className="text-center text-muted mb-10">
        Here are hairstyle ideas based on your preferences. Click on any image to see it in detail.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main selected image display */}
        <div className="md:col-span-2 order-2 md:order-1">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-lg">
            <Image
              src={selectedImage || ''}
              alt="Selected hairstyle"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Link
              href="/book"
              className="px-6 py-3 bg-accent text-background text-center uppercase tracking-wider text-sm hover:bg-accent/90 transition-colors"
            >
              Book This Style
            </Link>
            <button
              onClick={onStartOver}
              className="px-6 py-3 border border-accent text-center uppercase tracking-wider text-sm hover:bg-accent hover:text-background transition-colors"
            >
              Try Different Options
            </button>
          </div>
        </div>
        
        {/* Thumbnails and info */}
        <div className="order-1 md:order-2">
          {/* Your preferences summary */}
          <div className="mb-6 p-4 border border-accent/10 rounded-sm bg-background/50 backdrop-blur-sm">
            <h3 className="text-lg mb-3">Your Preferences</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-right text-muted">Length:</div>
              <div className="text-left">{getHairLength()}</div>
              
              <div className="text-right text-muted">Color:</div>
              <div className="text-left">{getHairColor()}</div>
              
              <div className="text-right text-muted">Style:</div>
              <div className="text-left">{getHairStyle()}</div>
              
              <div className="text-right text-muted">Volume:</div>
              <div className="text-left capitalize">{consultation?.volume}</div>
            </div>
          </div>
          
          {/* Thumbnails */}
          <h3 className="text-lg mb-3">All Options</h3>
          <div className="grid grid-cols-2 gap-2">
            {results.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`relative aspect-[3/4] w-full overflow-hidden rounded-sm transition-all ${
                  selectedImage === image 
                    ? 'ring-2 ring-accent scale-105 shadow-md' 
                    : 'opacity-80 hover:opacity-100'
                }`}
              >
                <Image
                  src={image}
                  alt={`Hairstyle option ${index + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                  Option {index + 1}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-6">
            <button 
              onClick={() => window.print()} 
              className="w-full px-4 py-2 border border-accent/30 text-center text-sm hover:bg-accent/10 transition-colors"
            >
              Save / Print Results
            </button>
          </div>
          
          <div className="mt-8 text-sm text-muted">
            <p>
              These are AI-generated images based on your preferences. Actual results may vary
              depending on your hair type, condition, and stylist techniques.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}