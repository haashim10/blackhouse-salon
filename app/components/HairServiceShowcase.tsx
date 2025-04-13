"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface HairService {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageSrc: string;
  color: string;
  textColor: string;
  accentColor: string;
}

// The 5 hair services with high-quality images and color schemes
const hairServices: HairService[] = [
  {
    id: "global-bleach",
    name: "THE GLOBAL BLEACH",
    tagline: "Complete transformation.",
    description:
      "Full head premium bleach service for a bold, statement look that turns heads.",
    imageSrc: "/hairstyle1.jpg",
    color: "#000000", // Black background
    textColor: "#ffffff", // White text
    accentColor: "#3478F6", // Apple blue
  },
  {
    id: "half-head-highlights",
    name: "THE HALF HEAD HIGHLIGHTS",
    tagline: "Dimensional brilliance.",
    description:
      "Strategic placement of highlights to create depth and movement for a natural look.",
    imageSrc: "/hairstyle2.jpg",
    color: "#f5f5f7", // Light gray background (Apple light)
    textColor: "#1d1d1f", // Dark text
    accentColor: "#E85D00", // Orange accent
  },
  {
    id: "gents-highlights",
    name: "GENTS HIGHLIGHTS AND CUT",
    tagline: "Refined masculine style.",
    description:
      "Precision cut with expertly placed highlights for the modern gentleman.",
    imageSrc: "/hairstyle3.jpg",
    color: "#fbf1e8", // Warm light background
    textColor: "#1d1d1f", // Dark text
    accentColor: "#8C8C8C", // Gray accent
  },
  {
    id: "gloss-and-go",
    name: "THE GLOSS AND GO",
    tagline: "Instant shine boost.",
    description:
      "Quick, transformative gloss treatment that adds shine and enhances your natural color.",
    imageSrc: "/hairstyle4.jpeg",
    color: "#1d1d1f", // Dark gray background (Apple dark)
    textColor: "#f5f5f7", // Light text
    accentColor: "#5E5CE6", // Purple accent
  },
  {
    id: "colour-refresh",
    name: "THE COLOUR REFRESH",
    tagline: "Revitalize your look.",
    description:
      "Revive faded color with our specialized treatment for long-lasting vibrancy.",
    imageSrc: "/hairstyle5.jpg",
    color: "#000000", // Black background
    textColor: "#ffffff", // White text
    accentColor: "#3478F6", // Apple blue
  },
];

export default function HairServiceShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoRotation = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set new interval
    intervalRef.current = setInterval(() => {
      goToNextService();
    }, 6000); // Change service every 6 seconds
  };

  const goToNextService = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setIsTextAnimating(true);
      setPrevIndex(activeIndex);

      // Wait for fade out to complete
      timeoutRef.current = setTimeout(() => {
        setActiveIndex((current) => (current + 1) % hairServices.length);

        // Wait for new content to settle
        timeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 500);

      // Reset text animation after it completes
      timeoutRef.current = setTimeout(() => {
        setIsTextAnimating(false);
      }, 1000);
    }
  };

  const goToService = (index: number) => {
    if (index === activeIndex || isTransitioning) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsTransitioning(true);
    setIsTextAnimating(true);
    setPrevIndex(activeIndex);

    // Wait for fade out to complete
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(index);

      // Wait for new content to settle
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 500);

    // Reset text animation after it completes
    timeoutRef.current = setTimeout(() => {
      setIsTextAnimating(false);
    }, 1000);

    // Restart auto rotation
    startAutoRotation();
  };

  useEffect(() => {
    // Start auto rotation when component mounts
    startAutoRotation();

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const activeService = hairServices[activeIndex];
  const transitionDuration = 800; // ms

  return (
    <section
      className="w-full py-24 md:py-32 overflow-hidden bg-transition"
      style={{
        backgroundColor: activeService.color,
        color: activeService.textColor,
        transition: `background-color ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl uppercase text-center mb-16 tracking-wider font-light">
          Our Signature Services
        </h2>

        {/* Service Navigation Tabs (Apple-style) */}
        <div className="flex justify-center mb-16 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex space-x-1 md:space-x-4">
            {hairServices.map((service, index) => (
              <button
                key={service.id}
                onClick={() => goToService(index)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 relative ${
                  activeIndex === index
                    ? "scale-105 font-medium"
                    : "hover:bg-current hover:bg-opacity-5"
                }`}
                style={{
                  backgroundColor:
                    activeIndex === index
                      ? service.color === "#000000" ||
                        service.color === "#1d1d1f"
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(0, 0, 0, 0.08)"
                      : "transparent",
                  boxShadow:
                    activeIndex === index
                      ? "0 2px 8px rgba(0,0,0,0.1)"
                      : "none",
                }}
              >
                {service.name}
                {activeIndex === index && (
                  <div
                    className="h-0.5 w-12 mx-auto mt-1 rounded-full"
                    style={{ backgroundColor: service.accentColor }}
                  ></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Service Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <div
              className={`space-y-4 transition-opacity duration-500 relative ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {/* Optional subtle backdrop for text visibility */}
              <div className="absolute -inset-6 bg-current opacity-5 rounded-lg blur-xl -z-10"></div>
              <div className="relative inline-block mb-6">
                {/* Gradient background effect for the heading */}
                <div
                  className="absolute inset-0 -m-2 rounded-lg opacity-10"
                  style={{
                    background: `linear-gradient(135deg, ${activeService.accentColor}, transparent)`,
                    filter: "blur(8px)",
                    transform: "translate(-5%, -5%) scale(1.1)",
                  }}
                ></div>

                {/* Main heading with enhanced visibility */}
                <h3
                  className={`text-4xl md:text-6xl font-light uppercase tracking-wide relative ${
                    !isTextAnimating ? "slide-up" : ""
                  }`}
                  style={{
                    textShadow:
                      activeService.color === "#000000" ||
                      activeService.color === "#1d1d1f"
                        ? "0 2px 10px rgba(255,255,255,0.15)"
                        : "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  {activeService.name}
                  <span
                    className="absolute -bottom-3 left-0 w-1/3 h-1 rounded-full"
                    style={{ backgroundColor: activeService.accentColor }}
                  ></span>
                </h3>
              </div>
              <p
                className={`text-xl md:text-2xl font-light mb-3 ${
                  !isTextAnimating ? "slide-up delay-100" : ""
                }`}
              >
                {activeService.tagline}
              </p>
              <p
                className={`text-base md:text-lg opacity-80 mb-8 max-w-lg mx-auto md:mx-0 ${
                  !isTextAnimating ? "slide-up delay-200" : ""
                }`}
              >
                {activeService.description}
              </p>
              <div
                className={`flex flex-col sm:flex-row justify-center md:justify-start gap-4 ${
                  !isTextAnimating ? "slide-up delay-300" : ""
                }`}
              >
                <Link
                  href={`/book?service=${activeService.id}`}
                  className="px-8 py-3 uppercase tracking-wider text-sm apple-button"
                  style={{
                    backgroundColor: activeService.accentColor,
                    color: "#ffffff",
                  }}
                >
                  Book Now
                </Link>
                <Link
                  href={`/services#${activeService.id}`}
                  className="px-8 py-3 border border-current uppercase tracking-wider text-sm hover:bg-current hover:bg-opacity-10 transition-colors apple-button"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div
                className={`relative aspect-[3/4] overflow-hidden rounded-sm shadow-xl transition-opacity duration-500 ${
                  isTransitioning ? "opacity-0" : "opacity-100 scale-in"
                }`}
              >
                <Image
                  src={activeService.imageSrc}
                  alt={activeService.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />

                {/* Decorative elements (Apple-like) */}
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20"
                  style={{ backgroundColor: activeService.accentColor }}
                ></div>
                <div
                  className="absolute -top-4 -left-4 w-16 h-16 rounded-full opacity-10"
                  style={{ backgroundColor: activeService.accentColor }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Indicators (dots) - Apple style */}
        <div className="flex justify-center mt-16 space-x-3">
          {hairServices.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goToService(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "scale-125"
                  : "opacity-30 hover:opacity-60"
              }`}
              style={{
                backgroundColor:
                  activeIndex === index
                    ? activeService.accentColor
                    : activeService.textColor,
              }}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
