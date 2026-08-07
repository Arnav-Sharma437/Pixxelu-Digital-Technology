"use client";

import React, { useEffect, useRef } from 'react';

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    // Define blobs
    const blobs = [
      { x: 0.2, y: 0.3, vx: 0.001, vy: 0.0015, r: 0.4 },
      { x: 0.8, y: 0.7, vx: -0.0012, vy: -0.001, r: 0.5 },
      { x: 0.5, y: 0.5, vx: 0.0015, vy: -0.0008, r: 0.45 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // We use multiply blend mode as requested
      ctx.globalCompositeOperation = 'multiply';

      blobs.forEach((blob) => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Bounce off edges
        if (blob.x < 0 || blob.x > 1) blob.vx *= -1;
        if (blob.y < 0 || blob.y > 1) blob.vy *= -1;

        const x = blob.x * width;
        const y = blob.y * height;
        const r = blob.r * Math.max(width, height);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, 'rgba(232, 92, 43, 0.15)'); // var(--color-orange) with low opacity
        gradient.addColorStop(1, 'rgba(232, 92, 43, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none w-full h-full"
    />
  );
}
