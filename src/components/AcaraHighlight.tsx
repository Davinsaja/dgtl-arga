import { motion } from 'motion/react';
import { siteConfig } from '../config/site';

export default function AcaraHighlight() {
  return (
    <section id="acara-highlight" className="relative w-full overflow-hidden bg-[#F6F1E6] section-padding flex flex-col items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-60 pointer-events-none" />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md sm:max-w-lg mx-auto flex flex-col items-center px-2 sm:px-0"
      >
        {/* Top Mosque Arch Header */}
        <div className="relative w-full h-32 sm:h-40 overflow-hidden rounded-t-2xl">
          {/* Solid background for the top header */}
          <div className="absolute inset-0 bg-[#0D5C53]" />
          
          {/* Subtle horizontal lines/pattern for texture in the header */}
          <div className="absolute inset-0 opacity-10 flex flex-col justify-between py-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-[1px] bg-white" />
            ))}
          </div>

          {/* Top Left Corner Ornament */}
          <div className="absolute top-[-5%] left-[-5%] w-20 h-20 text-[#D4AF37] opacity-90">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M60 20 A 30 30 0 1 0 80 70 A 40 40 0 1 1 60 20 Z" fill="#D4AF37" />
              <path d="M75 35 L78 42 L85 42 L79 47 L81 54 L75 50 L69 54 L71 47 L65 42 L72 42 Z" fill="#FAF6ED" />
            </svg>
          </div>
          
          {/* Top Right Corner Ornament */}
          <div className="absolute top-[-5%] right-[-5%] w-20 h-20 text-[#D4AF37] opacity-90 transform scale-x-[-1]">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M60 20 A 30 30 0 1 0 80 70 A 40 40 0 1 1 60 20 Z" fill="#D4AF37" />
              <path d="M75 35 L78 42 L85 42 L79 47 L81 54 L75 50 L69 54 L71 47 L65 42 L72 42 Z" fill="#FAF6ED" />
            </svg>
          </div>

          {/* Arch Shape cutting into the header from below */}
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute bottom-[-2px] left-0 w-full h-16 sm:h-20 text-[#F6F1E6]" fill="currentColor">
            <path d="M0,50 L100,50 L100,20 C85,20 75,50 50,50 C25,50 15,20 0,20 Z" />
            <path d="M0,20 C15,20 25,50 50,50 C75,50 85,20 100,20" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M0,18 C15,18 25,48 50,48 C75,48 85,18 100,18" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
          </svg>
          
          {/* Mosque Center floating above arch */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[15%] w-14 h-14 sm:w-16 sm:h-16 text-[#D4AF37] z-20 flex items-center justify-center drop-shadow-md">
             <svg viewBox="0 0 100 100" fill="currentColor">
               <path d="M50 10 C50 10 20 40 30 70 L70 70 C80 40 50 10 50 10 Z" fill="#D4AF37" />
               <rect x="25" y="70" width="50" height="20" fill="#B99131" />
               <path d="M50 70 L50 90" stroke="#0D5C53" strokeWidth="4" />
               <path d="M50 10 L50 0" stroke="#D4AF37" strokeWidth="2" />
               {/* Crescent on top */}
               <path d="M50 0 A 5 5 0 1 0 54 8 A 6 6 0 1 1 50 0 Z" fill="#D4AF37" />
             </svg>
          </div>
        </div>

        {/* Content Section below arch */}
        <div className="w-full flex flex-col items-center pt-6 pb-8 px-4 sm:pt-8 sm:pb-10 sm:px-6 relative z-10 bg-[#F6F1E6] rounded-b-2xl border-x border-b border-[#D4AF37]/20 shadow-lg">
          <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-[#B99131] tracking-[0.05em] uppercase mb-3 sm:mb-4 text-center transform scale-y-110">
            TASYAKURAN KHITAN
          </h2>
          
          <p className="font-serif italic font-medium text-base sm:text-lg md:text-xl text-[#B99131] mb-5 sm:mb-6 text-center tracking-wide">
            Insya Allah akan dilaksanakan pada:
          </p>

          <div className="flex flex-col items-center mb-5 sm:mb-6 w-full text-center">
            <h3 className="font-serif font-bold text-lg sm:text-xl md:text-2xl text-[#0D5C53] leading-snug">
              Rabu - Jumat,<br/>
              5 - 7 Agustus 2026
            </h3>
          </div>

          <div className="w-full max-w-sm border-[1.5px] border-dashed border-[#0D5C53] rounded-sm py-3 px-4 sm:py-4 sm:px-6 flex flex-col items-center text-center">
             <p className="font-serif text-sm sm:text-[15px] md:text-base text-[#0D5C53] leading-relaxed">
               {siteConfig.event.address.fullText}
             </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
