"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { ButtonNav } from './ui/Button';

const academyLinks = [
  'Who We Are',
  'Facility',
  'Scholarship',
  'Franchise',
  'Placement',
  'Affiliations & Accreditations',
  'Online Diploma Programs',
];

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

const trainingColumns = [
  {
    groups: [
      {
        title: 'Creative / Web',
        links: ['Graphic Designing', 'Web Designing', 'Digital Marketing', 'UI and UX Designing', 'Fashion Designing with CAD', 'Graphics & Video'],
      },
      {
        title: 'Job Ready',
        links: ['Maya Pro', 'Max Pro', 'Master Rotoscoping', 'Cinema 4D Pro', 'Blender Pro', 'Design Pro'],
      }
    ]
  },
  {
    groups: [
      {
        title: 'Gaming',
        links: ['Games Designing', 'Unity Game Design', 'Unreal Game Course', 'Game Art & Develop', 'NFT Game Development', 'Play To Earn NFT Game Development'],
      },
      {
        title: 'Metaverse & VR',
        links: ['Animation, AR/VR & Metaverse', 'Virtual Reality', 'AR/VR Technologies', 'Metaverse and Web 3.0', 'Animation & Metaverse', 'AI Generative Art'],
      }
    ]
  },
  {
    groups: [
      {
        title: 'Animation',
        links: ['Multimedia Master', 'Animation & VFX', 'Master in Visual Effects', 'Degree In Animation', '3D Animation Film Making', 'ARCHI. Walkthrough'],
      },
      {
        title: 'Film',
        links: ['Film Making & Direction', 'Photography', 'Cinematography', 'Video Editing', 'Post Production', 'Music Production'],
      }
    ]
  }
];

const professionalColumns = [
  {
    title: 'Professional Degree',
    links: [
      'MBA in Digital Marketing',
      'MCA in Data Science and Data Analytics',
      'PG in Machine Learning, Python & AI',
      'MCA in Machine Learning & AI',
      'BCA in Data Analytics',
    ],
  },
  {
    title: 'Skill Degree',
    links: [
      'Degree in Multimedia & Animation',
      'Journalism & Mass Communication',
      'Degree in Interior Designing',
      'Degree in Computer Science',
      'Degree in Web Technologies',
      'Degree in Beauty & Wellness',
    ],
  }
];

const aiCoursesLinks = [
  'AI Course For Animation',
  'AI Course For Developers',
  'AI For Digital Marketing',
  'AI Course for Professionals',
  'AI for Google',
];

const studentAreaLinks = [
  'Placement Students',
  'Testimonials & Reviews',
  'All Events Gallery',
  'Creative Gallery',
  'Student Gallery',
  'Photography Gallery',
  'Animation Gallery',
  'Video Gallery',
  'Animation School and Career Guide',
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
      <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col shrink-0">
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
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-nav text-[13px] xl:text-sm tracking-wide font-medium flex-1 justify-center">
          
          {/* Academy */}
          <div className="group relative h-24 flex items-center cursor-pointer shrink-0">
            <span className={`flex items-center hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              Academy <ChevronDown className="ml-1 w-4 h-4" />
            </span>
            <div className="absolute top-[80px] left-0 w-[280px] bg-[var(--color-white)] text-[var(--color-black)] shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 py-4">
              <ul className="flex flex-col">
                {academyLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href="#" className="block px-6 py-2.5 text-[15px] text-gray-700 hover:text-[var(--color-orange)] hover:bg-gray-50 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Courses */}
          <div className="group relative h-24 flex items-center cursor-pointer shrink-0">
            <span className={`flex items-center hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              Courses <ChevronDown className="ml-1 w-4 h-4" />
            </span>
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[1000px] bg-[var(--color-white)] text-[var(--color-black)] shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
              <div className="flex justify-between p-10">
                {megaMenuColumns.map((col, idx) => (
                  <div key={idx} className="flex-1 px-4 first:pl-0 last:pr-0">
                    <h3 className="text-[#8A2BE2] font-semibold text-lg mb-6">{col.title}</h3>
                    <ul className="space-y-4">
                      {col.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link href="#" className="text-gray-700 hover:text-[#8A2BE2] transition-colors text-[14px]">
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

          {/* Training */}
          <div className="group relative h-24 flex items-center cursor-pointer shrink-0">
            <span className={`flex items-center hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              Training <ChevronDown className="ml-1 w-4 h-4" />
            </span>
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[1100px] bg-[var(--color-white)] text-[var(--color-black)] shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
              <div className="flex justify-between p-8">
                {trainingColumns.map((col, colIdx) => (
                  <div key={colIdx} className="flex-1 px-4 first:pl-0 last:pr-0 flex flex-col space-y-8">
                    {col.groups.map((group, groupIdx) => (
                      <div key={groupIdx}>
                        <h3 className="text-[#8A2BE2] font-semibold text-base mb-4">{group.title}</h3>
                        <ul className="space-y-2.5">
                          {group.links.map((link, linkIdx) => (
                            <li key={linkIdx}>
                              <Link href="#" className="text-gray-700 hover:text-[#8A2BE2] transition-colors text-[13px]">
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Professional */}
          <div className="group relative h-24 flex items-center cursor-pointer shrink-0">
            <span className={`flex items-center hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              Professional <ChevronDown className="ml-1 w-4 h-4" />
            </span>
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[700px] bg-[var(--color-white)] text-[var(--color-black)] shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
              <div className="flex justify-between p-10">
                {professionalColumns.map((col, idx) => (
                  <div key={idx} className="flex-1 px-4 first:pl-0 last:pr-0">
                    <h3 className="text-[#8A2BE2] font-semibold text-lg mb-6">{col.title}</h3>
                    <ul className="space-y-4">
                      {col.links.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Link href="#" className="text-gray-700 hover:text-[#8A2BE2] transition-colors text-[14px]">
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

          {/* AI Courses */}
          <div className="group relative h-24 flex items-center cursor-pointer shrink-0">
            <span className={`flex items-center hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              AI Courses <ChevronDown className="ml-1 w-4 h-4" />
            </span>
            <div className="absolute top-[80px] left-0 w-[280px] bg-[var(--color-white)] text-[var(--color-black)] shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 py-4">
              <ul className="flex flex-col">
                {aiCoursesLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href="#" className="block px-6 py-2.5 text-[15px] text-gray-700 hover:text-[var(--color-orange)] hover:bg-gray-50 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Student Area */}
          <div className="group relative h-24 flex items-center cursor-pointer shrink-0">
            <span className={`flex items-center hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              Student Area <ChevronDown className="ml-1 w-4 h-4" />
            </span>
            <div className="absolute top-[80px] left-0 w-[300px] bg-[var(--color-white)] text-[var(--color-black)] shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 py-4">
              <ul className="flex flex-col">
                {studentAreaLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href="#" className="block px-6 py-2.5 text-[15px] text-gray-700 hover:text-[var(--color-orange)] hover:bg-gray-50 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Result */}
          <div className="group relative h-24 flex items-center cursor-pointer shrink-0">
            <Link href="/result" className={`hover:text-[var(--color-orange)] transition-colors ${scrolled ? 'text-[var(--color-black)]' : 'text-current'}`}>
              Result
            </Link>
          </div>
          
        </nav>

        {/* CTA */}
        <div className="shrink-0 ml-4">
          <ButtonNav lightState={scrolled}>
            Contact Us
          </ButtonNav>
        </div>
      </div>
    </header>
  );
}
