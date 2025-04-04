import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SALON | Modern Hair Styling",
  description: "Premium hair salon services with modern aesthetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="fixed w-full p-6 z-50 mix-blend-difference">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="nav-link">SALON</Link>
            <div className="flex gap-8">
              <Link href="/services" className="nav-link">Services</Link>
              <Link href="/book" className="nav-link">Book Now</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
