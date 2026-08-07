import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Navbar } from "@/components/Navbar";

const fontDisplay = Space_Grotesk({
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
      <body className="min-h-full flex flex-col relative font-body text-[var(--color-black)] bg-[var(--color-white)]">
        <AmbientBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
