import React from 'react';
import { motion } from 'motion/react';

// Highly intricate Javanese-Islamic ukiran corner SVG pattern
export const JavaneseCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    className={`w-10 h-10 text-[#D4AF37] opacity-60 pointer-events-none select-none ${className}`}
    fill="currentColor"
  >
    {/* Classical Javanese ukiran/floral leaf & spiral carving design */}
    <path d="M 0 0 
             L 50 0 
             C 45 6, 38 8, 32 10 
             C 26 12, 22 18, 20 25 
             C 18 32, 14 38, 8 42 
             C 4 45, 0 50, 0 50 
             Z" />
    <path d="M 4 4
             C 12 12, 12 24, 8 36
             C 6 42, 2 46, 2 46
             C 2 46, 10 40, 16 30
             C 20 22, 22 14, 16 6
             C 12 2, 4 4, 4 4 Z" opacity="0.8" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="24" cy="8" r="2" />
    <circle cx="8" cy="24" r="2" />
    <path d="M 0 0 L 0 90 C 4 80, 8 70, 6 60 C 4 50, 2 40, 2 0 Z" opacity="0.3" />
    <path d="M 0 0 L 90 0 C 80 4, 70 8, 60 6 C 50 4, 40 2, 0 2 Z" opacity="0.3" />
  </svg>
);

// Traditional Javanese Wayang Gunungan (Cosmic Mountain) representation 
// Symbolizing a sacred transition / gate of life, matching Walimatul Khitan
export const GununganWatermark: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 200 300"
    className={`pointer-events-none select-none ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
  >
    {/* Gunungan border outline */}
    <path
      d="M 100 20 
         C 120 60, 150 90, 165 130 
         C 180 170, 185 220, 175 260 
         C 170 280, 150 285, 100 285 
         C 50 285, 30 280, 25 260 
         C 15 220, 20 170, 35 130 
         C 50 90, 80 60, 100 20 Z"
      stroke="#D4AF37"
      strokeOpacity="0.08"
    />
    {/* Tree of Life (Pohon Hayat) inside Gunungan */}
    <path
      d="M 100 280 L 100 90"
      stroke="#0D5C53"
      strokeOpacity="0.06"
      strokeWidth="2"
    />
    <path
      d="M 100 220 C 120 200, 140 205, 155 210 M 100 220 C 80 200, 60 205, 45 210"
      stroke="#0D5C53"
      strokeOpacity="0.05"
    />
    <path
      d="M 100 180 C 125 155, 145 165, 162 170 M 100 180 C 75 155, 55 165, 38 170"
      stroke="#0D5C53"
      strokeOpacity="0.05"
    />
    <path
      d="M 100 140 C 130 115, 140 120, 155 125 M 100 140 C 70 115, 60 120, 45 125"
      stroke="#0D5C53"
      strokeOpacity="0.05"
    />
    {/* Gate/Pintu Gerbang at the base */}
    <rect
      x="82"
      y="240"
      width="36"
      height="35"
      rx="4"
      stroke="#D4AF37"
      strokeOpacity="0.08"
      fill="#FAFAF7"
      fillOpacity="0.02"
    />
    <path
      d="M 100 240 L 100 275 M 82 258 L 118 258"
      stroke="#D4AF37"
      strokeOpacity="0.07"
    />
    {/* Islamic 8-Point Star Mandala background glow behind Gunungan */}
    <path
      d="M 100 60 L 115 100 L 155 100 L 125 125 L 140 165 L 100 140 L 60 165 L 75 125 L 45 100 L 85 100 Z"
      stroke="#D4AF37"
      strokeOpacity="0.04"
    />
  </svg>
);

// Elegant double frame resembling physical book pages with gold lining
interface BookCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ children, className = '', id, animate = true }) => {
  const CardContainer = animate ? motion.div : 'div';
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.5, ease: "easeOut" },
      }
    : {};

  return (
    <CardContainer
      id={id}
      {...motionProps}
      className={`relative bg-[#FAF6ED] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-[#0D5C53]/10 shadow-sm transition-all duration-300 ${className}`}
    >
      {children}
    </CardContainer>
  );
};

// Premium divider combining Javanese scrollwork and Islamic Star
export const BatikDivider: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center justify-center gap-3 w-full max-w-xs mx-auto my-3 ${className}`}>
      {/* Left elegant gold wave line */}
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/65" />
      
      {/* Center Islamic-Javanese Ornament icon */}
      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
        <div className="absolute w-5 h-5 bg-[#0D5C53] rotate-45 rounded-sm shadow-sm" />
        <div className="absolute w-4 h-4 border border-[#D4AF37] rotate-45 rounded-sm" />
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 text-[#D4AF37] z-10 fill-current">
          <polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35" />
        </svg>
      </div>

      {/* Right elegant gold wave line */}
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/65" />
    </div>
  );
};
