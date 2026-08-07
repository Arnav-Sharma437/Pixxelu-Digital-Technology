"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { autoAlpha: 0, y: -10, duration: 0.5 })
        .from('.hero-headline', { autoAlpha: 0, y: 30, duration: 0.8 }, '-=0.2')
        .from('.hero-subhead', { autoAlpha: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from('.hero-cta-row > *', { autoAlpha: 0, y: 20, duration: 0.5, stagger: 0.1 }, '-=0.3')
        .from('.thumbnail-strip-wrapper', { autoAlpha: 0, y: 30, duration: 0.5 }, '-=0.2');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleSlideChange = (index: number) => {
    if (index === activeSlide || isTransitioning) return;
    setIsTransitioning(true);

    const ctx = gsap.context(() => {
      gsap.to(slideContentRef.current, {
        autoAlpha: 0,
        y: -15,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setActiveSlide(index);
          gsap.fromTo(slideContentRef.current,
            { autoAlpha: 0, y: 15 },
            { 
              autoAlpha: 1, 
              y: 0, 
              duration: 0.35, 
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
    <>
      <section ref={heroRef} className="relative h-screen bg-[var(--color-off-black)] text-[var(--color-white)] flex flex-col pt-32 pb-0 overflow-hidden">
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[var(--color-black)]">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === activeSlide ? 'opacity-40' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${s.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
          {/* Gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-off-black)]/80 via-transparent to-[var(--color-off-black)]" />
        </div>

        {/* Main Banner Content */}
        {/* Removed flex-col justify-center from the inner wrapper so text anchors to the top and grows downwards, stopping vertical jumping */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6">
          <div ref={slideContentRef} className="max-w-4xl relative min-h-[250px] pb-10">
            <div className="hero-eyebrow font-nav text-[var(--color-orange)] mb-4 flex items-center text-sm font-semibold tracking-wider">
              <span className="w-8 h-[2px] bg-[var(--color-orange)] mr-4" />
              {slide.eyebrow}
            </div>
            <h1 className="hero-headline font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              {slide.headline}
            </h1>
            <p className="hero-subhead font-body text-lg md:text-xl text-[var(--color-grey-800)] max-w-2xl mb-10">
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
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all border border-white/10 hover:border-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all border border-white/10 hover:border-white/30"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Thumbnail Strip */}
        <div className="thumbnail-strip-wrapper relative z-20 w-full bg-gradient-to-t from-black/80 to-transparent mt-auto pt-10 pb-6 border-b-2 border-[var(--color-orange)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-4 overflow-x-auto snap-x scrollbar-hide">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => handleSlideChange(i)}
                  className={`thumbnail-card snap-start shrink-0 relative w-40 h-20 md:w-48 md:h-24 rounded-lg overflow-hidden text-left transition-all duration-300 ${
                    activeSlide === i 
                      ? 'border-2 border-[var(--color-orange)] opacity-100 scale-100 shadow-[0_0_15px_rgba(232,92,43,0.3)]' 
                      : 'border border-white/20 opacity-40 hover:opacity-100 scale-95 hover:scale-100'
                  }`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/50 transition-colors" />
                  <span className={`absolute bottom-2 left-3 font-display font-semibold text-sm md:text-base text-white transition-all duration-300 ${activeSlide === i ? 'translate-y-0' : 'translate-y-1'}`}>
                    {s.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stat Strip */}
      <section className="relative z-20 bg-[var(--color-white)] text-[var(--color-black)] py-10 w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="py-4 md:py-0 md:pr-8 flex-1 text-center md:text-left">
            <div className="font-display text-3xl md:text-4xl font-bold mb-1">50+</div>
            <div className="font-nav text-[var(--color-grey-500)] text-xs md:text-sm">Custom sites launched</div>
          </div>
          <div className="py-4 md:py-0 md:px-8 flex-1 text-center md:text-left">
            <div className="font-display text-3xl md:text-4xl font-bold mb-1">4</div>
            <div className="font-nav text-[var(--color-grey-500)] text-xs md:text-sm">Platforms mastered & custom-built</div>
          </div>
          <div className="py-4 md:py-0 md:pl-8 flex-1 text-center md:text-left">
            <div className="font-display text-3xl md:text-4xl font-bold mb-1">5.0</div>
            <div className="font-nav text-[var(--color-grey-500)] text-xs md:text-sm">Avg client satisfaction rating</div>
          </div>
        </div>
      </section>
    </>
  );
}
