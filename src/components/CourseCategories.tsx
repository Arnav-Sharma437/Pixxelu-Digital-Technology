"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Course {
  id: string;
  category: string;
  title: string;
  skills: string;
  featured: boolean;
  badgeCode: string;
  placeholderImage: string;
}

const categoryColorMap: Record<string, string> = {
  'Animation': '#4A6CF7',
  'Filmmaking': '#F7484A',
  'VFX': '#3FBF63',
  'Digital Marketing': '#9B4AF7'
};

export function CourseCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses?featured=true')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch courses", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading || courses.length === 0) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.course-header', {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      // Cards staggered reveal
      gsap.from('.course-card', {
        autoAlpha: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.course-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, courses]);

  if (loading) return null;

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--color-off-black)] text-[var(--color-white)] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="course-header text-center mb-16 max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-4">
            India's First AI-Powered Animation, VFX & Digital Content Creation Academy<br className="hidden md:block"/>
            <span className="text-white block mt-2">Job & Career with AI & AVGC-XR Skills</span>
          </h2>
          <p className="font-body text-sm md:text-base text-gray-300 font-semibold tracking-wide uppercase">
            Turn Your Creativity into a Career with AI & AVGC-XR Skills
          </p>
        </div>

        {/* Card Grid */}
        <div className="course-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((course) => {
            const accentColor = categoryColorMap[course.category] || '#E85C2B';

            return (
              <div 
                key={course.id} 
                className="course-card relative rounded-[14px] overflow-hidden group cursor-pointer aspect-[4/5] sm:aspect-auto sm:h-[380px]"
                style={{
                  '--card-accent': accentColor,
                  border: '1px solid color-mix(in srgb, var(--card-accent) 60%, transparent)',
                } as React.CSSProperties}
              >
                {/* Background Image that covers the whole card */}
                <img 
                  src={course.placeholderImage} 
                  alt={course.category} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] z-0"
                />

                {/* Dark Gradient Overlay for text readability (bottom to top) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10 pointer-events-none" />

                {/* Glow Effect on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-10"
                  style={{ boxShadow: 'inset 0 0 40px 5px var(--card-accent)' }}
                />

                {/* Interactive border overlay for 100% opacity on hover */}
                <div 
                  className="absolute inset-0 rounded-[14px] border-2 border-[var(--card-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" 
                />

                {/* Badge */}
                <span 
                  className="absolute top-4 left-4 px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider rounded-md backdrop-blur-md z-30 transition-transform duration-500"
                  style={{ 
                    backgroundColor: 'rgba(0,0,0,0.6)', 
                    color: 'white',
                    border: '1px solid var(--card-accent)'
                  }}
                >
                  {course.badgeCode}
                </span>

                {/* Card Content - Pinned to bottom */}
                <div className="absolute bottom-0 left-0 w-full p-5 z-30 flex flex-col justify-end">
                  <h3 className="font-display font-bold text-[16px] md:text-[18px] mb-2 text-white leading-[1.3] drop-shadow-lg">
                    {course.title}
                  </h3>
                  <p className="font-body text-[10.5px] text-gray-300/90 leading-[1.5] drop-shadow-md pr-1">
                    {course.skills}
                  </p>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
