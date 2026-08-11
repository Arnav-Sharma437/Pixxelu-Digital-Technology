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
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-6">
            India's First AI-Powered Animation, VFX & Digital Content Creation Academy<br className="hidden md:block"/>
            <span className="text-white mt-2 block">Job & Career with AI & AVGC-XR Skills</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-[var(--color-grey-500)]">
            Turn Your Creativity into a Career with AI & AVGC-XR Skills
          </p>
        </div>

        {/* Card Grid */}
        <div className="course-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            const accentColor = categoryColorMap[course.category] || '#E85C2B';

            return (
              <div 
                key={course.id} 
                className="course-card group relative rounded-[16px] overflow-hidden bg-[#1A1A1A] transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  '--card-accent': accentColor,
                  border: '1px solid color-mix(in srgb, var(--card-accent) 40%, transparent)',
                } as React.CSSProperties}
              >
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300 pointer-events-none z-0"
                  style={{ boxShadow: '0 0 24px 2px var(--card-accent)' }}
                />

                {/* Interactive border overlay for 100% opacity on hover */}
                <div 
                  className="absolute inset-0 rounded-[16px] border border-[var(--card-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" 
                />

                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] overflow-hidden shrink-0">
                  <img 
                    src={course.placeholderImage} 
                    alt={course.category} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/30 to-transparent opacity-100 z-10" />
                  
                  {/* Badge */}
                  <span 
                    className="absolute top-5 left-5 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-full backdrop-blur-sm transition-colors duration-300 z-20"
                    style={{ 
                      backgroundColor: 'rgba(0,0,0,0.6)', 
                      color: 'var(--card-accent)',
                      border: '1px solid var(--card-accent)'
                    }}
                  >
                    {course.badgeCode}
                  </span>
                </div>

                {/* Card Content */}
                <div className="relative p-6 pt-0 bg-[#1A1A1A] flex-1 flex flex-col z-20 -mt-20">
                  <h3 className="font-display font-bold text-xl md:text-2xl mb-3 text-white leading-snug">
                    {course.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-grey-500)] leading-relaxed">
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
