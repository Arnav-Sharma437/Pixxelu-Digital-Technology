"use client";

import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ButtonPrimary, ButtonGhost } from './ui/Button';

const slides = [
  {
    id: 'squarespace',
    name: 'Squarespace',
    eyebrow: 'Squarespace Development',
    headline: 'Design-first websites, built to launch fast.',
    subhead: 'For brands who want a beautiful site without the technical overhead.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'wix',
    name: 'Wix',
    eyebrow: 'Wix Enterprise',
    headline: 'High-speed sites your team can actually edit.',
    subhead: 'Full editor autonomy, without needing a developer for every change.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    eyebrow: 'Shopify Plus',
    headline: 'Commerce engines built to convert.',
    subhead: 'Custom storefronts engineered for checkout speed and scale.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    eyebrow: 'WordPress / Headless',
    headline: 'Full-control architecture for content-heavy sites.',
    subhead: 'Headless CMS builds for teams that need real editorial power.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const slideContentRef = useRef<HTMLDivElement>(null);
  
  // Initial entrance animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { autoAlpha: 0, y: -10, duration: 0.5 })
        .from('.hero-headline', { autoAlpha: 0, y: 30, duration: 0.8 }, '-=0.2')
        .from('.hero-subhead', { autoAlpha: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero-cta-row > *', { autoAlpha: 0, y: 20, duration: 0.5, stagger: 0.1 }, '-=0.3')
        .from('.thumbnail-card', { autoAlpha: 0, y: 30, duration: 0.5, stagger: 0.08 }, '-=0.2');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleSlideChange = (index: number) => {
    if (index === activeSlide || isTransitioning) return;
    setIsTransitioning(true);

    const ctx = gsap.context(() => {
      // Fade out current content
      gsap.to(slideContentRef.current, {
        autoAlpha: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setActiveSlide(index);
          // Fade in new content
          gsap.fromTo(slideContentRef.current,
            { autoAlpha: 0, y: 20 },
            { 
              autoAlpha: 1, 
              y: 0, 
              duration: 0.4, 
              ease: 'power2.out',
              onComplete: () => setIsTransitioning(false)
            }
          );
        }
      });
    }, heroRef);
    
    return () => ctx.revert();
  };

  const nextSlide = () => {
    handleSlideChange((activeSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    handleSlideChange((activeSlide - 1 + slides.length) % slides.length);
  };

  const slide = slides[activeSlide];

  return (
    <section ref={heroRef} className="relative min-h-screen bg-[var(--color-off-black)] text-[var(--color-white)] flex flex-col pt-32 pb-0">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === activeSlide ? 'opacity-30' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-off-black)] via-transparent to-[var(--color-off-black)]" />
        <div className="absolute inset-0 bg-[var(--color-off-black)] opacity-60" />
      </div>

      {/* Main Banner Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6">
        <div ref={slideContentRef} className="max-w-4xl relative">
          <div className="hero-eyebrow font-nav text-[var(--color-orange)] mb-6 flex items-center">
            <span className="w-8 h-[1px] bg-[var(--color-orange)] mr-4" />
            {slide.eyebrow}
          </div>
          <h1 className="hero-headline font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
            {slide.headline}
          </h1>
          <p className="hero-subhead font-body text-xl md:text-2xl text-[var(--color-grey-800)] max-w-2xl mb-12">
            {slide.subhead}
          </p>
          <div className="hero-cta-row flex flex-wrap gap-4">
            <ButtonPrimary>Start a project</ButtonPrimary>
            <ButtonGhost darkSection>See our platforms</ButtonGhost>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-md transition-colors border border-white/10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-md transition-colors border border-white/10"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Thumbnail Strip */}
      <div className="relative z-20 w-full bg-black/20 backdrop-blur-sm border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex gap-4 overflow-x-auto snap-x scrollbar-hide pb-2 md:pb-0">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleSlideChange(i)}
                className={`thumbnail-card snap-start shrink-0 relative w-48 h-24 rounded-xl overflow-hidden text-left transition-all duration-300 ${
                  activeSlide === i 
                    ? 'border-2 border-[var(--color-orange)] opacity-100 scale-100' 
                    : 'border-2 border-transparent opacity-50 hover:opacity-80 scale-95'
                }`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${s.image})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <span className="absolute bottom-3 left-4 font-display font-bold text-lg text-white">{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stat Strip */}
      <div className="relative z-20 bg-[var(--color-white)] text-[var(--color-black)] py-10 w-full">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="py-4 md:py-0 md:pr-8 flex-1 text-center md:text-left">
            <div className="font-display text-4xl font-bold mb-1">50+</div>
            <div className="font-nav text-[var(--color-grey-500)]">Custom sites launched</div>
          </div>
          <div className="py-4 md:py-0 md:px-8 flex-1 text-center md:text-left">
            <div className="font-display text-4xl font-bold mb-1">4</div>
            <div className="font-nav text-[var(--color-grey-500)]">Platforms mastered & custom-built</div>
          </div>
          <div className="py-4 md:py-0 md:pl-8 flex-1 text-center md:text-left">
            <div className="font-display text-4xl font-bold mb-1">5.0</div>
            <div className="font-nav text-[var(--color-grey-500)]">Avg client satisfaction rating</div>
          </div>
        </div>
      </div>

    </section>
  );
}
