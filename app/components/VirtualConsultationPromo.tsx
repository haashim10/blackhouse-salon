"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function VirtualConsultationPromo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay for the animation to work properly
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 px-6">
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Text content */}
        <div className="space-y-6 order-2 md:order-1">
          <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
            NEW FEATURE
          </div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Virtual Hair Stylist
          </h2>
          <p className="text-lg text-muted">
            Explore new hairstyles before your appointment. Our AI-powered
            virtual consultation creates personalized style suggestions based on
            your preferences.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-accent mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Discover styles that match your preferences</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-accent mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Visualize different colors, lengths, and styles</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-accent mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>Book your appointment with confidence</span>
            </li>
          </ul>
          <div className="pt-4">
            <Link
              href="/virtual-consultation"
              className="inline-block px-8 py-3 bg-accent text-background hover:bg-accent/90 transition-colors uppercase tracking-wider text-sm"
            >
              Try Virtual Stylist
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative order-1 md:order-2">
          <div className="aspect-[4/3] w-full relative overflow-hidden rounded-sm shadow-xl">
            <Image
              src="/virtual-consultation-preview.jpg" // You'll need to add this image
              alt="Virtual Hair Consultation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-2xl font-light mb-2">
                Find Your Perfect Style
              </div>
              <div className="text-sm">Powered by AI technology</div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full -z-10"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  );
}
