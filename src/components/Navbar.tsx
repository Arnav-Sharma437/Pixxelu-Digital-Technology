"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { ButtonNav } from './ui/Button';

const megaMenuColumns = [
  {
    title: 'Industrial Training',
    links: [
      'Data Science',
      'Data Analytics',
      'Machine Learning & AI',
      'Salesforce',
      'C/C++',
      'Software Testing',
    ],
  },
  {
    title: 'Diploma Courses',
    links: [
      'Cloud Computing and DevOps',
      'Masters in Digital Marketing',
      'Masters in Full-Stack Development',
      'Front-End Development with React',
      'Masters in Data Science and Analytics',
      'Masters in Blockchain Technology',
    ],
  },
  {
    title: 'Advanced Course',
    links: [
      'Fashion & Interior Design (CAD)',
      'AVGC-XR & AI',
      'Air Hostess Training',
      'Master Certificate in Architecture Design',
      'Game Design AR VR XR',
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[var(--color-white)] border-b border-gray-200' : 'bg-transparent text-[var(--color-white)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className={`text-3xl font-bold tracking-tight font-display ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
            <span className="text-[var(--color-orange)]">p</span>
            ixxel
            <span className="text-[var(--color-orange)]">u</span>
          </span>
          <span className="text-[0.7rem] tracking-[0.12em] font-nav uppercase -mt-1 opacity-80">
            Digital Technology
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center space-x-10 font-nav text-sm tracking-wide font-medium">
          
          <div className="group relative h-24 flex items-center cursor-pointer">
            <span className={`flex items-center hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              Academy <ChevronDown className="ml-1 w-4 h-4" />
            </span>
          </div>

          <div className="group relative h-24 flex items-center cursor-pointer">
            <span className={`flex items-center hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              Courses <ChevronDown className="ml-1 w-4 h-4" />
            </span>
            
            {/* Mega Menu Dropdown */}
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[1000px] bg-[var(--color-white)] text-[var(--color-black)] shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
              <div className="flex justify-between p-10">
                {megaMenuColumns.map((col, idx) => (
                  <div key={idx} className="flex-1 px-4 first:pl-0 last:pr-0">
                    <h3 className="text-[#8A2BE2] font-semibold text-lg mb-6">{col.title}</h3>
                    <ul className="space-y-4">
                      {col.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link href="#" className="text-gray-700 hover:text-[#8A2BE2] transition-colors text-[15px]">
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative h-24 flex items-center cursor-pointer">
            <span className={`flex items-center hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              Student Area <ChevronDown className="ml-1 w-4 h-4" />
            </span>
          </div>

          <div className="group relative h-24 flex items-center cursor-pointer">
            <Link href="/result" className={`hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              Result
            </Link>
          </div>
          
        </nav>

        {/* CTA */}
        <div>
          <ButtonNav lightState={scrolled}>
            Contact Us
          </ButtonNav>
        </div>
      </div>
    </header>
  );
}
