import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import ThemeToggle from "./components/theme-toggle";
import DropdownMenu from "./components/dropdown-menu";
import SocialIcon from "./components/social-icon";

export const metadata: Metadata = {
  title: "BLACKHOUSE SALON | Modern Hair Styling",
  description: "Premium hair salon services with modern aesthetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <nav className="fixed w-full p-6 z-50 bg-background/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link href="/" className="relative h-10 w-40 flex items-center">
                <Image
                  src="/Blackhouse logo_colour.avif"
                  alt="BLACKHOUSE SALON"
                  fill
                  className="object-contain block dark:hidden"
                  priority
                />
                <Image
                  src="/Blackhouse logo_colour_inverted.avif"
                  alt="BLACKHOUSE SALON"
                  fill
                  className="object-contain hidden dark:block"
                  priority
                />
              </Link>

              {/* Main Navigation */}
              <div className="flex items-center gap-8">
                <Link
                  href="/about"
                  className="nav-link text-foreground hover:text-accent text-sm font-normal"
                >
                  About Us
                </Link>
                <Link
                  href="/team"
                  className="nav-link text-foreground hover:text-accent text-sm font-normal"
                >
                  Meet the Team
                </Link>
                <Link
                  href="/shop"
                  className="nav-link text-foreground hover:text-accent text-sm font-normal"
                >
                  Shop
                </Link>
                <Link
                  href="/gift-cards"
                  className="nav-link text-foreground hover:text-accent text-sm font-normal"
                >
                  Gift Cards
                </Link>
                <DropdownMenu
                  label="More"
                  items={[
                    { label: "Affiliate Program", href: "/affiliate" },
                    { label: "Opening Times", href: "/opening-times" },
                    { label: "Contact Us", href: "/contact" },
                    { label: "Careers", href: "/careers" },
                    { label: "Reviews", href: "/reviews" },
                  ]}
                />
                <Link
                  href="/book"
                  className="nav-link text-foreground hover:text-accent text-sm font-normal"
                >
                  Book
                </Link>
                <ThemeToggle />
              </div>
              {/* Social and Account Links */}
              <div className="flex items-center gap-6">
                <Link
                  href="/login"
                  className="nav-link text-foreground hover:text-accent text-sm font-normal"
                >
                  Login
                </Link>
                <Link
                  href="/cart"
                  className="nav-link text-foreground hover:text-accent text-sm font-normal"
                >
                  Cart (0)
                </Link>
                <SocialIcon
                  href="https://instagram.com"
                  label="Instagram"
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  }
                />
                <SocialIcon
                  href="https://facebook.com"
                  label="Facebook"
                  icon={
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  }
                />
              </div>
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
