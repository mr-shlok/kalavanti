import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import ToastProvider from "@/components/providers/ToastProvider";
import CartProvider from "@/components/providers/CartProvider";
import WishlistProvider from "@/components/providers/WishlistProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import IntroCurtain from "@/components/IntroCurtain";

export const metadata: Metadata = {
  title: {
    default: "Kalavanti — Handcrafted Fine Jewellery Since 1948",
    template: "%s · Kalavanti",
  },
  description:
    "Kalavanti is a house of handcrafted diamond, gold, platinum and bridal jewellery — BIS hallmarked, certified, with lifetime buyback and free insured delivery across India.",
};

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-full font-body text-ink antialiased">
        <IntroCurtain />
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <Suspense
                fallback={
                  <div className="sticky top-0 z-50 h-[68px] border-b border-line bg-surface" aria-hidden />
                }
              >
                <Header />
              </Suspense>
              <main>{children}</main>
              <Footer />
              <CartDrawer />
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
