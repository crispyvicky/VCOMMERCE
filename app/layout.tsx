import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";
import SessionProvider from "./components/SessionProvider";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
        className={`${ibmPlexSans.variable} antialiased bg-[var(--background)] text-[var(--foreground)] font-sans`}
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
