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
    <section id="hero-section" className="relative min-h-screen sm:min-h-[100dvh] w-full px-3 sm:px-4 overflow-x-hidden bg-[#F6F1E6] flex flex-col items-center justify-between safe-top pb-6 sm:pb-8">
      {/* Background Pattern & Paper Texture */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-50 pointer-events-none" />
      <div className="absolute inset-0 paper-vignette opacity-70 pointer-events-none" />

      {/* Top Mosque Arch Header */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-14 sm:h-20 md:h-24 text-[#0D5C53]" fill="currentColor">
          <path d="M0,0 L100,0 L100,15 C85,15 75,45 50,45 C25,45 15,15 0,15 Z" />
          <path d="M0,15 C15,15 25,45 50,45 C75,45 85,15 100,15" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
          <path d="M0,13 C15,13 25,43 50,43 C75,43 85,13 100,13" fill="none" stroke="#D4AF37" strokeWidth="0.2" opacity="0.5" />
        </svg>
        
        {/* Diamond Star Center */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-7px] sm:bottom-[-9px] w-4 h-4 sm:w-6 sm:h-6 rotate-45 bg-gradient-to-br from-[#D4AF37] to-[#8C6D23] shadow-md z-20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-[#0D5C53] border border-[#D4AF37]" />
        </div>
      </div>

      {/* Hanging Decorative Islamic Lanterns (Left & Right) */}
      <div className="absolute top-10 left-1.5 sm:left-6 md:left-12 z-20 pointer-events-none flex flex-col items-center">
        <div className="w-[1px] h-10 sm:h-16 bg-gradient-to-b from-[#D4AF37] to-[#8C6D23]/60" />
        <motion.div 
          animate={{ rotate: [-3, 3, -3] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 sm:w-7 text-[#D4AF37] drop-shadow-md -mt-1"
        >
          <svg viewBox="0 0 40 70" fill="currentColor">
            <circle cx="20" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 12 L28 12 L24 20 L16 20 Z" />
            <path d="M14 20 L26 20 L30 42 L10 42 Z" fill="#FBF5B7" fillOpacity="0.8" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="31" r="4" fill="#D4AF37" />
            <path d="M10 42 L30 42 L25 52 L15 52 Z" />
            <path d="M20 52 L20 62" stroke="currentColor" strokeWidth="2" />
            <circle cx="20" cy="64" r="2" />
          </svg>
        </motion.div>
      </div>

      <div className="absolute top-10 right-1.5 sm:right-6 md:right-12 z-20 pointer-events-none flex flex-col items-center">
        <div className="w-[1px] h-14 sm:h-20 bg-gradient-to-b from-[#D4AF37] to-[#8C6D23]/60" />
        <motion.div 
          animate={{ rotate: [3, -3, 3] }} 
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-4.5 sm:w-6 text-[#D4AF37] drop-shadow-md -mt-1"
        >
          <svg viewBox="0 0 40 70" fill="currentColor">
            <circle cx="20" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 12 L28 12 L24 20 L16 20 Z" />
            <path d="M14 20 L26 20 L30 42 L10 42 Z" fill="#FBF5B7" fillOpacity="0.8" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="31" r="3.5" fill="#D4AF37" />
            <path d="M10 42 L30 42 L25 52 L15 52 Z" />
            <path d="M20 52 L20 62" stroke="currentColor" strokeWidth="2" />
            <circle cx="20" cy="64" r="2" />
          </svg>
        </motion.div>
      </div>

      {/* Main Content Container — Ringkas & Padat Agar Pas Sempurna 1 Layar Tanpa Scroll */}
      <div className="relative z-20 max-w-xl w-full flex flex-col items-center text-center space-y-2.5 sm:space-y-4 pt-[3.8rem] sm:pt-24 md:pt-26 flex-1 justify-evenly">
        
        {/* Intro Text & Opening Mosque Arch Plaque */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-1.5 sm:space-y-2.5 px-3 flex flex-col items-center w-full shrink-0"
        >
          {/* Bismillah Frame Plaque */}
          <div className="relative px-4 sm:px-8 py-1.5 sm:py-2 rounded-xl bg-gradient-to-b from-[#FAF6ED] to-[#F2EA99]/20 border border-[#D4AF37]/40 shadow-sm flex flex-col items-center">
            {/* Small Top Ornament Icon */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#0D5C53] text-[#D4AF37] px-2 py-0.2 rounded-full border border-[#D4AF37] text-[9px]">
              ☪
            </div>

            {/* Elegant Arabic Bismillah */}
            <div
              className="font-serif text-xl sm:text-2xl md:text-3xl text-[#0D5C53] font-medium select-none tracking-wide text-center w-full pt-0.5 pb-0.5"
              dir="rtl"
              style={{ lineHeight: 1.8 }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          </div>

          <h3 className="font-serif text-base sm:text-lg md:text-xl font-black text-[#0D5C53] tracking-wide uppercase mt-1">
            Assalamu'alaikum Wr. Wb.
          </h3>
          
          <p className="text-[#0D5C53] font-semibold text-[11px] sm:text-xs md:text-sm leading-relaxed max-w-md mx-auto">
            Tanpa mengurangi rasa hormat, kami bermaksud mengundang{' '}
            <span className="text-[#D4AF37] font-extrabold underline decoration-dashed decoration-[#D4AF37]/50 underline-offset-4 px-1 py-0.5 bg-[#0D5C53]/5 rounded">
              {displayName}
            </span>{' '}
            pada acara syukuran khitan anak kami:
          </p>
        </motion.div>

        {/* UNIFIED LUXURY MOSQUE ARCH PHOTO FRAME (Skala Pas Presisi) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-40 xs:w-48 sm:w-56 md:w-60 flex flex-col items-center justify-center shrink-0 my-1 sm:my-2"
        >
          {/* Continuous Gold & Emerald Mosque Arch Frame */}
          <div className="relative w-full aspect-[3/3.9] rounded-t-[100px] sm:rounded-t-[130px] rounded-b-xl p-[2.5px] bg-gradient-to-b from-[#D4AF37] via-[#FCF6BA] to-[#8C6D23] shadow-lg">
            
            {/* Inner Emerald Shell */}
            <div className="w-full h-full rounded-t-[97px] sm:rounded-t-[127px] rounded-b-lg bg-[#0D5C53] p-1.5 relative overflow-hidden flex flex-col items-center justify-center">
              
              {/* Subtle Pattern Watermark */}
              <div className="absolute inset-0 bg-islamic-pattern opacity-15 pointer-events-none" />

              {/* Gold Crescent Symbol in Top Arch Archway */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 text-[#D4AF37] drop-shadow text-[10px] sm:text-xs font-bold">
                ☪
              </div>

              {/* Ring Transisi Emas & Krem */}
              <div className="w-full h-full rounded-t-[90px] sm:rounded-t-[120px] rounded-b-md bg-[#FAF6ED] p-0.5 border border-[#D4AF37] shadow-inner relative overflow-hidden">
                
                {/* Image Container */}
                <div className="w-full h-full rounded-t-[88px] sm:rounded-t-[118px] rounded-b-[2px] overflow-hidden relative bg-white">
                  <img 
                    src={siteConfig.child.photo} 
                    alt="Arganta Humayun Portrait" 
                    className="w-full h-full object-cover brightness-[1.02]"
                    style={{ objectPosition: siteConfig.child.objectPosition || 'center top' }}
                    referrerPolicy="no-referrer"
                    fetchPriority="high"
                    decodes="async"
                  />
                  {/* Subtle Inner Ring Accent */}
                  <div className="absolute inset-0 rounded-t-[88px] sm:rounded-t-[118px] border border-[#D4AF37]/40 pointer-events-none" />
                </div>
              </div>

              {/* Corner Gold Filigree Accents inside Frame */}
              <div className="absolute top-1.5 left-2 w-3 h-3 border-t border-l border-[#D4AF37] pointer-events-none" />
              <div className="absolute top-1.5 right-2 w-3 h-3 border-t border-r border-[#D4AF37] pointer-events-none" />
              <div className="absolute bottom-1.5 left-2 w-3 h-3 border-b border-l border-[#D4AF37] pointer-events-none" />
              <div className="absolute bottom-1.5 right-2 w-3 h-3 border-b border-r border-[#D4AF37] pointer-events-none" />
            </div>
          </div>

          {/* Bottom Gold Ribbon Emblem Base */}
          <div className="relative -mt-3.5 z-30 bg-gradient-to-r from-[#0D5C53] via-[#09403A] to-[#0D5C53] border border-[#D4AF37] px-4 py-0.5 rounded-full shadow-md flex items-center gap-1.5 text-xs text-[#FCF6BA]">
            <span className="text-[#D4AF37] text-[9px]">❖</span>
            <span className="font-serif font-black tracking-widest uppercase text-[9px] sm:text-[10px] text-[#FCF6BA]">TASYAKURAN KHITAN</span>
            <span className="text-[#D4AF37] text-[9px]">❖</span>
          </div>
        </motion.div>

        {/* Child Name & Parent Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-1.5 sm:space-y-2 flex flex-col items-center w-full px-2 shrink-0"
        >
          {/* Child Full Name */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-[#D4AF37] drop-shadow-md tracking-wider leading-tight text-center">
            {siteConfig.child.fullName}
          </h2>

          {/* Gold Ornamental Divider */}
          <div className="flex items-center justify-center gap-2.5 w-full max-w-xs mx-auto my-0.5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
            <div className="w-2 h-2 bg-[#0D5C53] rotate-45 border border-[#D4AF37]" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
          </div>
          
          {/* Parents info with ornate Islamic card */}
          <div className="relative mt-1 w-full max-w-sm sm:max-w-md mx-auto p-2.5 sm:p-3.5 rounded-xl bg-[#0D5C53]/5 border border-[#0D5C53]/15 flex items-center justify-between gap-2.5 shadow-sm">
            {/* Left Crescent Icon */}
            <div className="w-7 h-7 sm:w-9 sm:h-9 text-[#0D5C53] flex-shrink-0">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M60 20 A 30 30 0 1 0 80 70 A 40 40 0 1 1 60 20 Z" fill="#0D5C53" />
                <path d="M75 35 L78 42 L85 42 L79 47 L81 54 L75 50 L69 54 L71 47 L65 42 L72 42 Z" fill="#D4AF37" />
              </svg>
            </div>
            
            <p className="text-[11px] sm:text-xs md:text-sm font-bold text-[#0D5C53] text-center leading-snug flex-1">
              Putra dari Bapak <span className="font-black text-[#D4AF37] block sm:inline">{siteConfig.child.fatherName}</span> <br className="hidden sm:inline" />
              &amp; Ibu <span className="font-black text-[#D4AF37] block sm:inline">{siteConfig.child.motherName}</span>
            </p>
            
            {/* Right Crescent Icon (Flipped) */}
            <div className="w-7 h-7 sm:w-9 sm:h-9 text-[#0D5C53] flex-shrink-0 transform scale-x-[-1]">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M60 20 A 30 30 0 1 0 80 70 A 40 40 0 1 1 60 20 Z" fill="#0D5C53" />
                <path d="M75 35 L78 42 L85 42 L79 47 L81 54 L75 50 L69 54 L71 47 L65 42 L72 42 Z" fill="#D4AF37" />
              </svg>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

