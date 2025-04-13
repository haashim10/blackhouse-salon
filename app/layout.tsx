import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { CartProvider } from "./context/cart-context";
import { ServiceProvider } from "./context/service-context";
import Navigation from "./components/navigation";

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
          <CartProvider>
            <ServiceProvider>
              <div className="flex flex-col min-h-screen">
                <Navigation />
                <main className="pt-24 flex-grow z-10 relative">
                  {children}
                </main>
              </div>
            </ServiceProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}