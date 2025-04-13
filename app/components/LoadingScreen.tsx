"use client";

import { useEffect, useState } from "react";

interface ConsultationType {
  gender: 'male' | 'female';
  hairLength?: 'short' | 'medium' | 'long' | 'very-long';
  hairColor?: 'black' | 'dark-brown' | 'medium-brown' | 'light-brown' | 'dark-blonde' | 'medium-blonde' | 'light-blonde' | 'platinum' | 'red' | 'copper' | 'auburn' | 'blue' | 'pink' | 'purple' | 'green';
  hairStyle?: 'straight' | 'wavy' | 'curly' | 'coily';
  volume?: string;
}

interface LoadingScreenProps {
  consultation: ConsultationType | null;
}

const hairTips = [
  "Regular trims every 6-8 weeks help prevent split ends and maintain your style.",
  "Apply heat protectant spray before using hot styling tools to prevent damage.",
  "Sleeping on a silk pillowcase can reduce hair breakage and frizz.",
  "Massage your scalp while shampooing to improve blood circulation and hair health.",
  "Deep conditioning treatments once a week can transform damaged hair.",
  "Brushing your hair before showering helps prevent tangles and breakage.",
  "Avoid washing your hair daily to preserve natural oils that protect your hair.",
  "Apply conditioner mid-length to ends, not on your scalp, for best results.",
  "Let your hair air-dry whenever possible to minimize heat damage.",
  "Use cool water for your final rinse to seal the hair cuticle and increase shine.",
  "Consider your hair type when choosing styling products for best results.",
  "Protect your hair from sun damage with hats or UV-protection products.",
];

export default function LoadingScreen({ consultation }: LoadingScreenProps) {
  const [tip, setTip] = useState("");
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Set a random tip
    const randomTip = hairTips[Math.floor(Math.random() * hairTips.length)];
    setTip(randomTip);
    
    // Simulate progress for visual feedback
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format consultation data for display
  const getHairLength = () => {
    const lengthMap = {
      "short": "Short",
      "medium": "Medium",
      "long": "Long",
      "very-long": "Very Long"
    } as const;
    return consultation?.hairLength ? lengthMap[consultation.hairLength] : "";
  };
  
  const getHairColor = () => {
    const colorMap = {
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
    } as const;
    return consultation?.hairColor ? colorMap[consultation.hairColor] : "";
  };
  
  const getHairStyle = () => {
    const styleMap = {
      "straight": "Straight",
      "wavy": "Wavy",
      "curly": "Curly",
      "coily": "Coily"
    } as const;
    return consultation?.hairStyle ? styleMap[consultation.hairStyle] : "";
  };
  
  return (
    <div className="max-w-2xl mx-auto text-center px-6 py-12">
      <div className="relative h-24 w-24 mx-auto mb-8">
        <div className="absolute inset-0 border-t-4 border-accent rounded-full animate-spin"></div>
      </div>
      
      <h2 className="text-3xl font-light mb-4">Generating Your Ideal Hairstyles</h2>
      
      <p className="text-muted mb-8">
        Our AI is creating personalized hairstyle options based on your preferences.
        This may take a moment...
      </p>
      
      {/* Progress bar */}
      <div className="w-full bg-accent/10 rounded-full h-2 mb-8">
        <div 
          className="bg-accent h-2 rounded-full" 
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      
      {/* Summary of selections */}
      <div className="mb-10 p-6 border border-accent/10 rounded-sm bg-background/50 backdrop-blur-sm">
        <h3 className="text-xl mb-3">Your Hair Preferences</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-right text-muted">Gender:</div>
          <div className="text-left">{consultation?.gender === "female" ? "Women's Style" : "Men's Style"}</div>
          
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
      
      {/* Random hair tip */}
      <div className="bg-accent/5 p-6 rounded-sm">
        <h3 className="uppercase text-sm tracking-wider mb-2">Styling Tip</h3>
        <p className="italic">{tip}</p>
      </div>
    </div>
  );
}