"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import { useServiceContext } from "../context/service-context";

export default function Footer() {
  const { theme } = useTheme();
  const { serviceColors } = useServiceContext();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Determine if we should use service colors or default theme colors
  const useServiceColors = serviceColors.isActive;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would normally connect to an API endpoint
      // This is just a simulation of an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // If successful:
      setSubscriptionStatus("success");
      setEmail("");
    } catch (error) {
      setSubscriptionStatus("error");
    } finally {
      setIsSubmitting(false);

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus("idle");
      }, 3000);
    }
  };

  return (
    <footer className="pt-16 pb-6 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6">
        {/* Newsletter Subscription */}
        <div className="max-w-xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Stay connected!"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow px-4 py-3 rounded-none border border-gray-200 dark:border-gray-700 text-black dark:text-white bg-white dark:bg-gray-900 focus:ring-0 focus:border-black dark:focus:border-white"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-medium transition-colors sm:mt-0 mt-2"
            >
              {isSubmitting ? "..." : "Join"}
            </button>
          </form>

          {subscriptionStatus === "success" && (
            <p className="mt-2 text-green-600 dark:text-green-400">
              Thank you for subscribing!
            </p>
          )}

          {subscriptionStatus === "error" && (
            <p className="mt-2 text-red-600 dark:text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Column 1 */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link
              href="/"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              About Us
            </Link>
            <Link
              href="/team"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              Meet The Team
            </Link>
            <Link
              href="/returns"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              Returns
            </Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link
              href="/affiliate"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              Brand Affiliates
            </Link>
            <Link
              href="/reviews"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              Reviews
            </Link>
            <Link
              href="/prices"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              Our Prices
            </Link>
            <Link
              href="/opening-times"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              Opening Times
            </Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link
              href="/covid-policy"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              COVID-19 Policy
            </Link>
            <Link
              href="/contact"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              Contact Us
            </Link>
            <a
              href="https://instagram.com/blackhousesalon"
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com/blackhousesalon"
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-wide text-black dark:text-white hover:opacity-80 transition-opacity text-sm"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} BLACKHOUSE SALON. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
