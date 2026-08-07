import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";

const fontDisplay = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const fontNav = Inter({
  variable: "--font-nav",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixxelu Digital Technology",
  description: "Websites exclusively on Squarespace, Wix, Shopify, and WordPress.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontNav.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <AmbientBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
