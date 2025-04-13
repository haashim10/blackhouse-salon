"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./theme-provider";
import { useServiceContext } from "../context/service-context";
import DropdownMenu from "./dropdown-menu";
import ThemeToggle from "./theme-toggle";
import CartNavCount from "./cart-nav-count";
import SocialIcon from "./social-icon";

export default function Navigation() {
  const { theme } = useTheme();
  const { serviceColors } = useServiceContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll position for navigation styling
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Determine if we should use service colors or default theme colors
  const useServiceColors = serviceColors.isActive;

  // Compute background opacity based on scroll state
  const bgOpacity =
    scrolled || mobileMenuOpen ? (useServiceColors ? "E6" : "80") : "00";

  // Set nav background and text colors based on service context and scroll state
  const navStyle = {
    backgroundColor: useServiceColors
      ? `${serviceColors.backgroundColor}${bgOpacity}`
      : `var(--background)${bgOpacity}`,
    color: useServiceColors ? serviceColors.textColor : "var(--foreground)",
    borderColor: useServiceColors
      ? `${serviceColors.textColor}20`
      : "var(--accent)10",
    transition: "all 300ms ease-in-out",
  };

  // Dynamic link style for navigation items
  const linkStyle = {
    color: useServiceColors ? serviceColors.textColor : "inherit",
  };

  return (
    <nav
      className="fixed w-full px-4 sm:px-6 py-4 z-40 backdrop-blur-sm border-b"
      style={navStyle}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="relative h-8 w-32 sm:h-10 sm:w-40 flex items-center"
        >
          <Image
            src="/Blackhouse logo_colour.avif"
            alt="BLACKHOUSE SALON"
            fill
            className={`object-contain ${
              useServiceColors && serviceColors.textColor === "#ffffff"
                ? "hidden"
                : theme === "dark"
                ? "hidden"
                : "block"
            }`}
            priority
          />
          <Image
            src="/Blackhouse logo_colour_inverted.avif"
            alt="BLACKHOUSE SALON"
            fill
            className={`object-contain ${
              useServiceColors && serviceColors.textColor === "#ffffff"
                ? "block"
                : theme === "dark"
                ? "block"
                : "hidden"
            }`}
            priority
          />
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          style={{
            color: useServiceColors ? serviceColors.textColor : "inherit",
          }}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link
            href="/about"
            className="nav-link text-sm font-normal hover:opacity-80 transition-colors"
            style={linkStyle}
          >
            About Us
          </Link>
          <Link
            href="/team"
            className="nav-link text-sm font-normal hover:opacity-80 transition-colors"
            style={linkStyle}
          >
            Meet the Team
          </Link>
          <Link
            href="/shop"
            className="nav-link text-sm font-normal hover:opacity-80 transition-colors"
            style={linkStyle}
          >
            Shop
          </Link>
          <Link
            href="/gift-cards"
            className="nav-link text-sm font-normal hover:opacity-80 transition-colors"
            style={linkStyle}
          >
            Gift Cards
          </Link>
          {/* Virtual Consultation Link */}
          <Link
            href="/virtual-consultation"
            className="nav-link text-sm font-normal relative group hover:opacity-80 transition-colors"
            style={linkStyle}
          >
            AI Stylist
            <span
              className="absolute -top-4 -right-4 text-xs px-1 py-0.5 rounded-sm group-hover:scale-110 transition-transform text-[0.65rem]"
              style={{
                backgroundColor: useServiceColors
                  ? serviceColors.accentColor
                  : "var(--accent)",
                color:
                  useServiceColors && serviceColors.textColor === "#ffffff"
                    ? "#000000"
                    : "#ffffff",
              }}
            >
              NEW
            </span>
          </Link>
          <div className="z-50">
            <DropdownMenu
              label="More"
              items={[
                { label: "Brand Affiliate", href: "/affiliate" },
                { label: "Opening Times", href: "/opening-times" },
                { label: "Contact Us", href: "/contact" },
                { label: "Careers", href: "/careers" },
                { label: "Reviews", href: "/reviews" },
              ]}
              textColor={useServiceColors ? serviceColors.textColor : undefined}
              backgroundColor={
                useServiceColors ? serviceColors.backgroundColor : undefined
              }
            />
          </div>
          <Link
            href="/book"
            className="nav-link text-sm font-normal hover:opacity-80 transition-colors"
            style={linkStyle}
          >
            Book
          </Link>
          <ThemeToggle
            textColor={useServiceColors ? serviceColors.textColor : undefined}
          />
        </div>

        {/* Desktop Social and Account Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="nav-link text-sm font-normal hover:opacity-80 transition-colors"
            style={linkStyle}
          >
            Login
          </Link>
          <Link
            href="/cart"
            className="nav-link text-sm font-normal hover:opacity-80 transition-colors flex items-center"
            style={linkStyle}
          >
            Cart
            <CartNavCount
              textColor={useServiceColors ? serviceColors.textColor : undefined}
            />
          </Link>
          <SocialIcon
            href="https://instagram.com"
            label="Instagram"
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            }
            textColor={useServiceColors ? serviceColors.textColor : undefined}
          />
          <SocialIcon
            href="https://facebook.com"
            label="Facebook"
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            }
            textColor={useServiceColors ? serviceColors.textColor : undefined}
          />
        </div>

        {/* Mobile Quick Actions (visible alongside the hamburger) */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/cart" className="flex items-center" style={linkStyle}>
            <span className="sr-only">Cart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <CartNavCount
              textColor={useServiceColors ? serviceColors.textColor : undefined}
            />
          </Link>
          <ThemeToggle
            textColor={useServiceColors ? serviceColors.textColor : undefined}
            mini={true}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[57px] bottom-0 z-30 overflow-y-auto"
          style={{
            backgroundColor: useServiceColors
              ? serviceColors.backgroundColor
              : "var(--background)",
            color: useServiceColors
              ? serviceColors.textColor
              : "var(--foreground)",
            height: "calc(100vh - 57px)",
          }}
        >
          <div className="min-h-full pb-20">
            <div className="flex flex-col py-4">
              <div className="px-4 py-2 mb-2 text-sm uppercase tracking-wider opacity-50">
                Main Menu
              </div>
              <Link
                href="/about"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/team"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Meet the Team
              </Link>
              <Link
                href="/shop"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/gift-cards"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Gift Cards
              </Link>
              <Link
                href="/virtual-consultation"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors flex items-center"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Stylist
                <span
                  className="ml-2 text-xs px-1 py-0.5 rounded-sm text-[0.65rem]"
                  style={{
                    backgroundColor: useServiceColors
                      ? serviceColors.accentColor
                      : "var(--accent)",
                    color:
                      useServiceColors && serviceColors.textColor === "#ffffff"
                        ? "#000000"
                        : "#ffffff",
                  }}
                >
                  NEW
                </span>
              </Link>
              <Link
                href="/book"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Now
              </Link>

              <div className="px-4 py-2 mt-4 mb-2 text-sm uppercase tracking-wider opacity-50">
                More Links
              </div>
              <Link
                href="/affiliate"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Brand Affiliate
              </Link>
              <Link
                href="/opening-times"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Opening Times
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/careers"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Careers
              </Link>
              <Link
                href="/reviews"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>

              <div className="px-4 py-2 mt-4 mb-2 text-sm uppercase tracking-wider opacity-50">
                Account
              </div>
              <Link
                href="/login"
                className="px-4 py-3 hover:bg-foreground/10 transition-colors"
                style={linkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>

              <div className="flex items-center gap-4 px-4 py-6 mt-4 mb-20">
                <SocialIcon
                  href="https://instagram.com"
                  label="Instagram"
                  icon={
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  }
                  textColor={
                    useServiceColors ? serviceColors.textColor : undefined
                  }
                />
                <SocialIcon
                  href="https://facebook.com"
                  label="Facebook"
                  icon={
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  }
                  textColor={
                    useServiceColors ? serviceColors.textColor : undefined
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
