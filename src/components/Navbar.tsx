"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ButtonNav } from './ui/Button';

const platforms = [
  {
    name: 'SQUARESPACE',
    services: ['Custom Theme Design', 'E-commerce Setup', 'Migration', 'SEO Optimization'],
  },
  {
    name: 'WIX',
    services: ['Velo Development', 'Custom Integrations', 'Animation', 'Performance Tuning'],
  },
  {
    name: 'SHOPIFY',
    services: ['Store Setup', 'Custom Theme Dev', 'App Integrations', 'Migration'],
  },
  {
    name: 'WORDPRESS',
    services: ['Headless CMS', 'Custom Plugin Dev', 'Theme Build', 'Speed Optimization'],
  }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activePlatformData = platforms.find(p => p.name === hoveredPlatform) || platforms[0];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[var(--color-white)] border-b border-gray-200' : 'bg-transparent text-[var(--color-white)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className={`text-2xl font-bold tracking-tight font-display ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
            <span className="text-[var(--color-orange)]">p</span>
            ixxel
            <span className="text-[var(--color-orange)]">u</span>
          </span>
          <span className="text-[0.65rem] tracking-[0.12em] font-nav uppercase -mt-1 opacity-80">
            Digital Technology
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 font-nav text-[0.8125rem] tracking-[0.08em]">
          <div className="group relative">
            <button className={`uppercase hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              Platforms
            </button>
            {/* Mega Menu Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[600px] bg-[var(--color-white)] text-[var(--color-black)] shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
              <div className="flex p-8">
                <div className="w-1/2 border-r border-gray-100 pr-6 space-y-4 flex flex-col items-start">
                  {platforms.map(platform => (
                    <button
                      key={platform.name}
                      onMouseEnter={() => setHoveredPlatform(platform.name)}
                      className={`text-lg font-display tracking-tight text-left transition-colors ${
                        (hoveredPlatform === platform.name || (!hoveredPlatform && platforms[0].name === platform.name))
                          ? 'text-[var(--color-black)] font-bold'
                          : 'text-[var(--color-grey-800)] font-medium hover:text-gray-600'
                      }`}
                    >
                      {platform.name}
                    </button>
                  ))}
                </div>
                <div className="w-1/2 pl-8 flex flex-col justify-center">
                  <h4 className="text-[var(--color-orange)] font-nav text-[0.7rem] mb-4">SERVICES</h4>
                  <ul className="space-y-3 font-body text-sm text-[var(--color-grey-500)]">
                    {activePlatformData.services.map((service, idx) => (
                      <li key={idx} className="hover:text-[var(--color-black)] transition-colors cursor-default">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Link href="/cases" className={`hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>Cases</Link>
          <Link href="/company" className={`hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>Company</Link>
          <Link href="/insights" className={`hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>Insights</Link>
          <Link href="/contact" className={`hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>Contact</Link>
        </nav>

        {/* CTA */}
        <div>
          <ButtonNav lightState={scrolled}>
            Get in touch
          </ButtonNav>
        </div>
      </div>
    </header>
  );
}
