"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showImages, setShowImages] = useState(false);
  const [initialImageLoaded, setInitialImageLoaded] = useState(false);
  const headingRef = useRef(null);

  const images = [
    "/hairstyleimage3.jpg",
    "/hairstyleimage2.jpg",
    "/hairstyleimage1.jpg",
  ];

  // Start image carousel after text animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImages(true);
    }, 3500); // Start showing images after text animation (3s)

    return () => clearTimeout(timer);
  }, []);

  // Handle image carousel
  useEffect(() => {
    if (showImages && initialImageLoaded) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }
  }, [showImages, initialImageLoaded, images.length]);

  return (
    <main>
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background layer with images */}
        <div className="absolute inset-0">
          {showImages && (
            <div className="w-full h-full relative">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-800 ease-in-out ${
                    currentImage === index ? "opacity-100" : "opacity-0"
                  } ${index === 0 && !initialImageLoaded ? 'image-reveal' : ''}`}
                  onAnimationEnd={() => {
                    if (index === 0) setInitialImageLoaded(true);
                  }}
                >
                  <div className="relative w-3/4 h-3/4 max-w-3xl max-h-3xl shadow-2xl rounded-sm overflow-hidden">
                    <Image
                      src={img}
                      alt={`Hairstyle ${index + 1}`}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 75vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Text animation container */}
        <div className="relative z-10 px-4 flex items-center justify-center md:justify-start w-full max-w-7xl">
          <h1 className="text-5xl md:text-7xl text-foreground font-light uppercase tracking-widest space-y-4">
            <div className="flex justify-center md:justify-start">
              <span className="block overflow-hidden">
                <span className="inline-block typing-animation typing-1">
                  Styling
                </span>
              </span>
            </div>
            <div className="flex justify-center md:justify-start">
              <span className="block overflow-hidden">
                <span className="inline-block typing-animation typing-2">
                  Done
                </span>
              </span>
            </div>
            <div className="flex justify-center md:justify-start">
              <span className="block overflow-hidden">
                <span className="inline-block typing-animation typing-3">
                  By Professionals.
                </span>
              </span>
            </div>
          </h1>
        </div>

        {/* Call-to-action button */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 fade-in fade-in-delay">
          <Link
            href="/book"
            className="px-8 py-3 bg-white text-black uppercase tracking-wider text-sm hover:bg-gray-100 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl uppercase">Premium Services</h2>
            <p className="text-muted">
              Experience the art of hair styling with our expert team. We
              combine traditional techniques with modern aesthetics.
            </p>
            <Link
              href="/book"
              className="inline-block border px-8 py-3 uppercase text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              Book Appointment
            </Link>
          </div>
          <div className="aspect-[4/5] bg-accent/10 overflow-hidden relative">
            <Image
              src="/hairstyleimage3.jpg"
              alt="Premium haircut service"
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
