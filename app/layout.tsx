import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";
import SessionProvider from "./components/SessionProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vasthra | Premium Apparel",
  description: "Elevate your style with Vasthra's exclusive collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <SessionProvider>
          <CartProvider>
            {children}
            <CartSidebar />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
