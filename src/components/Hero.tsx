import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../config/site';

export default function Hero() {
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to');
      if (toParam) {
        const decoded = decodeURIComponent(toParam).trim();
        if (decoded) {
          setGuestName(decoded);
        }
      }
    } catch (e) {
      console.error("Error reading 'to' parameter in Hero:", e);
    }
  }, []);

  const displayName = guestName.trim() || "Bapak/Ibu/Saudara/i";

  return (
    <section id="hero-section" className="relative min-h-screen w-full px-3 sm:px-4 overflow-x-hidden bg-[#F6F1E6] flex flex-col items-center justify-start safe-top">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-60 pointer-events-none" />

      {/* Top Mosque Arch Header */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-16 sm:h-24 md:h-28 text-[#0D5C53]" fill="currentColor">
          <path d="M0,0 L100,0 L100,15 C85,15 75,45 50,45 C25,45 15,15 0,15 Z" />
          <path d="M0,15 C15,15 25,45 50,45 C75,45 85,15 100,15" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
          <path d="M0,13 C15,13 25,43 50,43 C75,43 85,13 100,13" fill="none" stroke="#D4AF37" strokeWidth="0.2" opacity="0.5" />
        </svg>
        
        {/* Diamond Star Center */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] sm:bottom-[-10px] w-5 h-5 sm:w-7 sm:h-7 rotate-45 bg-gradient-to-br from-[#D4AF37] to-[#8C6D23] shadow-md z-20 flex items-center justify-center">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#0D5C53] border border-[#D4AF37]" />
        </div>
      </div>

      {/* Main Content Container — pt cukup besar agar Bismillah tidak tertutup lengkungan header */}
      <div className="relative z-20 max-w-xl w-full flex flex-col items-center text-center space-y-5 sm:space-y-8 pt-[5.5rem] sm:pt-32 md:pt-36 pb-10 sm:pb-12">
        
        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 px-4 flex flex-col items-center"
        >
          {/* Elegant Arabic Bismillah — leading longgar agar harakat tidak terpotong */}
          <div
            className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#0D5C53] font-medium select-none tracking-wide text-center w-full px-2 pt-1 pb-0.5"
            dir="rtl"
            style={{ lineHeight: 2.2 }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-black text-[#0D5C53] tracking-wide uppercase">
            Assalamu'alaikum Wr. Wb.
          </h3>
          
          <p className="text-[#0D5C53] font-semibold text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Tanpa mengurangi rasa hormat, kami bermaksud mengundang{' '}
            <span className="text-[#D4AF37] font-extrabold underline decoration-dashed decoration-[#D4AF37]/50 underline-offset-4 px-1.5 py-0.5 bg-[#0D5C53]/5 rounded">
              {displayName}
            </span>{' '}
            pada acara syukuran khitan anak kami:
          </p>
        </motion.div>

        {/* Arched Boy's Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-44 sm:w-64 md:w-72 aspect-[3/4] flex flex-col items-center justify-center my-2 sm:my-4"
        >
          {/* Outer Border with Arch shape */}
          <div className="absolute inset-0 rounded-t-[100px] rounded-b-xl border-[3px] border-[#D4AF37]/50 p-1.5 shadow-md">
            {/* Inner Image Container */}
            <div className="w-full h-full rounded-t-[100px] rounded-b-lg overflow-hidden bg-white shadow-inner">
              <img 
                src="/img/profil1.png" 
                alt="Arganta Humayun Portrait" 
                className="w-full h-full object-cover object-top brightness-[1.02] opacity-95"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>

        {/* Child Name */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-3 flex flex-col items-center w-full"
        >
          <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-[#0D5C53]/70 uppercase">
            ANANDA PUTRA TERCINTA
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#D4AF37] drop-shadow-md tracking-wider leading-tight text-center px-2">
            {siteConfig.child.fullName}
          </h2>
          
          {/* Parents info with elegant crescent decorations */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-3 w-full max-w-xl mx-auto px-2">
            {/* Left Crescent */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 text-[#0D5C53] flex-shrink-0">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M60 20 A 30 30 0 1 0 80 70 A 40 40 0 1 1 60 20 Z" fill="#0D5C53" />
                <path d="M75 35 L78 42 L85 42 L79 47 L81 54 L75 50 L69 54 L71 47 L65 42 L72 42 Z" fill="#D4AF37" />
              </svg>
            </div>
            
            <p className="text-xs sm:text-sm md:text-base font-bold text-[#0D5C53] text-center leading-relaxed flex-1">
              Putra dari Bapak <span className="font-black text-[#D4AF37] block sm:inline">{siteConfig.child.fatherName}</span> <br className="hidden sm:inline" />
              &amp; Ibu <span className="font-black text-[#D4AF37] block sm:inline">{siteConfig.child.motherName}</span>
            </p>
            
            {/* Right Crescent (Flipped) */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 text-[#0D5C53] flex-shrink-0 transform scale-x-[-1]">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M60 20 A 30 30 0 1 0 80 70 A 40 40 0 1 1 60 20 Z" fill="#0D5C53" />
                <path d="M75 35 L78 42 L85 42 L79 47 L81 54 L75 50 L69 54 L71 47 L65 42 L72 42 Z" fill="#D4AF37" />
              </svg>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom Decorative Pattern / Clean Space */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between items-end p-2 sm:p-4 pointer-events-none z-10">
        {/* Intentionally left clean to reduce clutter */}
      </div>
    </section>
  );
}

