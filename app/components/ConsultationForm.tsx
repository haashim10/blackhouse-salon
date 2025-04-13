"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

interface ConsultationFormData {
  gender: 'male' | 'female';
  hairLength: 'short' | 'medium' | 'long' | 'very-long';
  hairColor: 'black' | 'dark-brown' | 'medium-brown' | 'light-brown' | 'dark-blonde' | 'medium-blonde' | 'light-blonde' | 'platinum' | 'red' | 'copper' | 'auburn' | 'blue' | 'pink' | 'purple' | 'green';
  hairStyle: 'straight' | 'wavy' | 'curly' | 'coily';
  volume: string;
  additionalDetails?: string;
  referenceImageURL?: string;
  referenceImageBase64?: string;
}

interface ConsultationFormProps {
  onSubmit: (data: ConsultationFormData) => void;
}

// Hair length options with descriptions and placeholder images
const hairLengthOptions = [
  { value: "short" as const, label: "Short", description: "Above the ears or neckline", image: "/hair-lengths/short.jpg" },
  { value: "medium" as const, label: "Medium", description: "Between chin and shoulders", image: "/hair-lengths/medium.jpg" },
  { value: "long" as const, label: "Long", description: "Below the shoulders", image: "/hair-lengths/long.jpg" },
  { value: "very-long" as const, label: "Very Long", description: "Down to mid-back or longer", image: "/hair-lengths/very-long.jpg" },
];

// Hair color options
const hairColorOptions = [
  { value: "black" as const, label: "Black", hex: "#0f0f0f" },
  { value: "dark-brown" as const, label: "Dark Brown", hex: "#3b2421" },
  { value: "medium-brown" as const, label: "Medium Brown", hex: "#4a3728" },
  { value: "light-brown" as const, label: "Light Brown", hex: "#705c46" },
  { value: "dark-blonde" as const, label: "Dark Blonde", hex: "#b89e6c" },
  { value: "medium-blonde" as const, label: "Medium Blonde", hex: "#dbb774" },
  { value: "light-blonde" as const, label: "Light Blonde", hex: "#e2cc9c" },
  { value: "platinum" as const, label: "Platinum Blonde", hex: "#eee6d8" },
  { value: "red" as const, label: "Red", hex: "#8c3c1e" },
  { value: "copper" as const, label: "Copper", hex: "#b56124" },
  { value: "auburn" as const, label: "Auburn", hex: "#782b18" },
  { value: "blue" as const, label: "Blue", hex: "#3f5faa" },
  { value: "pink" as const, label: "Pink", hex: "#db7093" },
  { value: "purple" as const, label: "Purple", hex: "#7b3f7b" },
  { value: "green" as const, label: "Green", hex: "#4b7865" },
];

// Hair styles
const hairStyleOptions = [
  { value: "straight" as const, label: "Straight", description: "Smooth and sleek", image: "/hair-styles/straight.jpg" },
  { value: "wavy" as const, label: "Wavy", description: "Gentle natural waves", image: "/hair-styles/wavy.jpg" },
  { value: "curly" as const, label: "Curly", description: "Defined curls and volume", image: "/hair-styles/curly.jpg" },
  { value: "coily" as const, label: "Coily", description: "Tight coils or kinks", image: "/hair-styles/coily.jpg" },
];

// Hair volume
const volumeOptions = [
  { value: "flat", label: "Flat/Fine", description: "Minimal body and volume" },
  { value: "medium", label: "Medium", description: "Natural body" },
  { value: "voluminous", label: "Voluminous", description: "Full-bodied and thick" },
];

export default function ConsultationForm({ onSubmit }: ConsultationFormProps) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    gender: "female",
    hairLength: "medium",
    hairColor: "black",
    hairStyle: "straight",
    volume: "medium",
    additionalDetails: "",
    referenceImageURL: "",
  });
  
  const [referenceImageFile, setReferenceImageFile] = useState<File | null>(null);
  const [referenceImagePreview, setReferenceImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReferenceImageFile(file);
      setReferenceImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Convert the image to base64 if provided
    let referenceImageBase64: string | undefined;
    if (referenceImageFile) {
      referenceImageBase64 = await convertFileToBase64(referenceImageFile);
    }
    
    // Prepare the final form data including the base64 image
    const finalFormData: ConsultationFormData = {
      ...formData,
      referenceImageBase64,
    };
    
    onSubmit(finalFormData);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="bg-background/50 backdrop-blur-sm p-6 md:p-10 border border-accent/10 rounded-sm shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Required fields */}
          <div className="space-y-6">
            {/* Gender Selection */}
            <div>
              <label className="block text-sm uppercase tracking-wider mb-2">I'm looking for</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className={`px-4 py-2 border ${formData.gender === "female" ? "bg-accent text-background" : "border-accent/20"} cursor-pointer transition-colors`}>
                    Women's Style
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className={`px-4 py-2 border ${formData.gender === "male" ? "bg-accent text-background" : "border-accent/20"} cursor-pointer transition-colors`}>
                    Men's Style
                  </span>
                </label>
              </div>
            </div>

            {/* Hair Length */}
            <div>
              <label htmlFor="hairLength" className="block text-sm uppercase tracking-wider mb-2">
                Hair Length
              </label>
              <select
                id="hairLength"
                name="hairLength"
                value={formData.hairLength}
                onChange={handleInputChange}
                required
                className="w-full border-accent/20 border bg-transparent px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="" disabled>
                  Select hair length
                </option>
                {hairLengthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Hair Color */}
            <div>
              <label className="block text-sm uppercase tracking-wider mb-2">
                Hair Color
              </label>
              <div className="grid grid-cols-5 gap-2">
                {hairColorOptions.map((color) => (
                  <label
                    key={color.value}
                    className={`relative cursor-pointer p-1 text-center rounded-sm ${
                      formData.hairColor === color.value ? "ring-2 ring-accent" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="hairColor"
                      value={color.value}
                      checked={formData.hairColor === color.value}
                      onChange={handleInputChange}
                      className="sr-only"
                      required
                    />
                    <div 
                      className="w-full h-8 rounded-sm mb-1" 
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs">{color.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hair Style */}
            <div>
              <label htmlFor="hairStyle" className="block text-sm uppercase tracking-wider mb-2">
                Hair Style
              </label>
              <select
                id="hairStyle"
                name="hairStyle"
                value={formData.hairStyle}
                onChange={handleInputChange}
                required
                className="w-full border-accent/20 border bg-transparent px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="" disabled>
                  Select hair style
                </option>
                {hairStyleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right side - Additional options */}
          <div className="space-y-6">
            {/* Volume Level */}
            <div>
              <label className="block text-sm uppercase tracking-wider mb-2">
                Volume Level
              </label>
              <div className="space-y-2">
                {volumeOptions.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="volume"
                      value={option.value}
                      checked={formData.volume === option.value}
                      onChange={handleInputChange}
                      required
                      className="mr-2"
                    />
                    <span className="mr-2">{option.label}</span>
                    <span className="text-xs text-muted">{option.description}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label htmlFor="additionalDetails" className="block text-sm uppercase tracking-wider mb-2">
                Additional Details <span className="text-muted normal-case">(optional)</span>
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleInputChange}
                placeholder="Describe any specific preferences or details about your dream hairstyle..."
                rows={4}
                className="w-full border-accent/20 border bg-transparent px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Reference Image */}
            <div>
              <label className="block text-sm uppercase tracking-wider mb-2">
                Reference Image <span className="text-muted normal-case">(optional)</span>
              </label>
              <div className="border-2 border-dashed border-accent/20 p-4 text-center rounded-sm">
                {referenceImagePreview ? (
                  <div className="relative h-32 w-full">
                    <Image
                      src={referenceImagePreview}
                      alt="Reference image preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setReferenceImageFile(null);
                        setReferenceImagePreview(null);
                      }}
                      className="absolute top-0 right-0 bg-accent text-background rounded-full p-1"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm mb-2">
                      Upload a photo for reference <br />
                      <span className="text-xs text-muted">(Max size: 5MB, JPEG or PNG)</span>
                    </p>
                    <input
                      type="file"
                      id="referenceImage"
                      accept="image/jpeg, image/png"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="referenceImage"
                      className="inline-block px-4 py-2 bg-accent/10 hover:bg-accent/20 cursor-pointer transition-colors text-sm"
                    >
                      Select Image
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Or enter URL */}
            <div>
              <label htmlFor="referenceImageURL" className="block text-sm uppercase tracking-wider mb-2">
                Or enter image URL <span className="text-muted normal-case">(optional)</span>
              </label>
              <input
                type="url"
                id="referenceImageURL"
                name="referenceImageURL"
                value={formData.referenceImageURL}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full border-accent/20 border bg-transparent px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            className="inline-block px-8 py-3 bg-accent text-background hover:bg-accent/90 transition-colors uppercase tracking-wider text-sm"
          >
            Generate Hairstyle Ideas
          </button>
          <p className="mt-2 text-xs text-muted">
            By submitting, you agree that BLACKHOUSE SALON may use the data to generate AI images.
          </p>
        </div>
      </div>
    </form>
  );
}