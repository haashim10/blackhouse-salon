"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./theme-provider";
import { useServiceContext } from "../context/service-context";

const hairServices = [
  {
    id: "global-bleach",
    name: "THE GLOBAL BLEACH",
    tagline: "Complete transformation.",
    description:
      "Full head premium bleach service for a bold, statement look that turns heads.",
    imageSrc: "/globalbleach.jpeg",
    color: "#000000",
    textColor: "#ffffff",
    accentColor: "#3478F6",
  },
  {
    id: "half-head-highlights",
    name: "THE HALF HEAD HIGHLIGHTS",
    tagline: "Dimensional brilliance.",
    description:
      "Strategic placement of highlights to create depth and movement for a natural look.",
    imageSrc: "/halfhead.jpeg",
    color: "#f5f5f7",
    textColor: "#1d1d1f",
    accentColor: "#E85D00",
  },
  {
    id: "gents-highlights",
    name: "GENTS HIGHLIGHTS AND CUT",
    tagline: "Refined masculine style.",
    description:
      "Precision cut with expertly placed highlights for the modern gentleman.",
    imageSrc: "/gentscut.jpeg",
    color: "#fbf1e8",
    textColor: "#1d1d1f",
    accentColor: "#8C8C8C",
  },
  {
    id: "gloss-and-go",
    name: "THE GLOSS AND GO",
    tagline: "Instant shine boost.",
    description:
      "Quick, transformative gloss treatment that adds shine and enhances your natural color.",
    imageSrc: "/hairstyle4.jpeg",
    color: "#1d1d1f",
    textColor: "#f5f5f7",
    accentColor: "#5E5CE6",
  },
  {
    id: "colour-refresh",
    name: "THE COLOUR REFRESH",
    tagline: "Revitalize your look.",
    description:
      "Revive faded color with our specialized treatment for long-lasting vibrancy.",
    imageSrc: "/hairstyle5.jpg",
    color: "#000000",
    textColor: "#ffffff",
    accentColor: "#3478F6",
  },
];

export default function IntegratedHeroAndServices() {
  const { theme } = useTheme();
  const { setServiceColors } = useServiceContext();

  const [showHeroImage, setShowHeroImage] = useState(false);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const activeService = hairServices[activeIndex];

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Update service colors in context when active service changes
  useEffect(() => {
    const service = hairServices[activeIndex];
    const handleScroll = () => {
      const servicesTop = servicesRef.current?.offsetTop || 0;
      const servicesBottom = servicesTop + (servicesRef.current?.offsetHeight || 0);
      const isInServiceSection = window.scrollY >= servicesTop - 100 && window.scrollY < servicesBottom - 100;
      
      if (isInServiceSection) {
        setServiceColors({
          backgroundColor: service.color,
          textColor: service.textColor,
          accentColor: service.accentColor,
          isActive: true
        });
      } else {
        setServiceColors({
          backgroundColor: "transparent",
          textColor: "var(--foreground)",
          accentColor: "#000000",
          isActive: false
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, setServiceColors, activeService]);

  useEffect(() => {
    const imageTimer = setTimeout(() => {
      setShowHeroImage(true);

      const scrollTimer = setTimeout(() => {
        scrollToServices();
      }, 3100);

      return () => clearTimeout(scrollTimer);
    }, 2200);

    return () => clearTimeout(imageTimer);
  }, []);

  useEffect(() => {
    let transitionTimer: NodeJS.Timeout;

    if (textAnimationComplete) {
      transitionTimer = setTimeout(() => {
        scrollToServices();
      }, 1500);
    }

    return () => {
      if (transitionTimer) {
        clearTimeout(transitionTimer);
      }
    };
  }, [textAnimationComplete]);

  const handleTextAnimationEnd = () => {
    setTextAnimationComplete(true);
  };

  const startAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      goToNextService();
    }, 6000);
  };

  useEffect(() => {
    startAutoRotation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const goToNextService = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setActiveIndex((current) => (current + 1) % hairServices.length);

        timeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 500);
    }
  };

  const goToService = (index: number) => {
    if (index === activeIndex || isTransitioning) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsTransitioning(true);

    timeoutRef.current = setTimeout(() => {
      setActiveIndex(index);

      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 500);

    startAutoRotation();
  };

  const getBackgroundColor = (
    service: (typeof hairServices)[0],
    isActive: boolean
  ) => {
    if (!isActive) return "transparent";

    const isDarkColor =
      service.color === "#000000" || service.color === "#1d1d1f";

    if (theme === "dark") {
      return isDarkColor
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(255, 255, 255, 0.1)";
    }
    return isDarkColor ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.08)";
  };

  return (
    <>
      <section
        className={`h-[calc(100vh-20px)] flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0">
          {showHeroImage && (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-800 ease-in-out opacity-100 image-reveal">
                <div className="relative w-3/4 h-3/4 max-w-3xl max-h-3xl shadow-2xl rounded-sm overflow-hidden">
                  <Image
                    src="/hairstyleimage3.jpg"
                    alt="Hairstyle showcase"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 75vw"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

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
                <span
                  className="inline-block typing-animation typing-3"
                  onAnimationEnd={handleTextAnimationEnd}
                >
                  By Professionals.
                </span>
              </span>
            </div>
          </h1>
        </div>

        <div
          className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 fade-in fade-in-delay ${
            textAnimationComplete ? "animate-pulse" : "opacity-0"
          }`}
        >
          <Link
            href="/book"
            className="px-8 py-3 bg-white text-black uppercase tracking-wider text-sm hover:bg-gray-100 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </section>

      <section
        ref={servicesRef}
        className={`w-full py-24 md:py-32 overflow-hidden bg-transition`}
        style={{
          backgroundColor: activeService.color,
          color: activeService.textColor,
          transition: `background-color 800ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl uppercase text-center mb-16 tracking-wider font-light">
            Our Signature Services
          </h2>

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
                    backgroundColor: getBackgroundColor(
                      service,
                      activeIndex === index
                    ),
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

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <div
                className={`space-y-4 transition-opacity duration-500 relative ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="absolute -inset-6 bg-current opacity-5 rounded-lg blur-xl -z-10"></div>

                <div className="relative inline-block mb-6">
                  <div
                    className="absolute inset-0 -m-2 rounded-lg opacity-10"
                    style={{
                      background: `linear-gradient(135deg, ${activeService.accentColor}, transparent)`,
                      filter: "blur(8px)",
                      transform: "translate(-5%, -5%) scale(1.1)",
                    }}
                  ></div>

                  <h3
                    className="text-4xl md:text-6xl font-light uppercase tracking-wide relative slide-up"
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

                <p className="text-xl md:text-2xl font-light mb-3 slide-up delay-100">
                  {activeService.tagline}
                </p>
                <p className="text-base md:text-lg opacity-80 mb-8 max-w-lg mx-auto md:mx-0 slide-up delay-200">
                  {activeService.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 slide-up delay-300">
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
    </>
  );
}