import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles } from 'lucide-react';

import SplashScreen from './components/SplashScreen';
import Cover from './components/Cover';
import Hero from './components/Hero';
import AcaraHighlight from './components/AcaraHighlight';
import Countdown from './components/Countdown';
import DetailAcara from './components/DetailAcara';
import AudioPlayer from './components/AudioPlayer';
import { siteConfig } from './config/site';

const GoogleMaps = lazy(() => import('./components/GoogleMaps'));
const Gallery = lazy(() => import('./components/Gallery'));
const GiftComponent = lazy(() => import('./components/Gift'));
const RSVPForm = lazy(() => import('./components/RSVPForm'));
const BukuTamu = lazy(() => import('./components/BukuTamu'));

export default function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [opened, setOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [guestName, setGuestName] = useState("Bapak/Ibu/Saudara/i");

  // Read guest name 'to' parameter from URL query string
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to');
      if (toParam) {
        const decoded = decodeURIComponent(toParam).trim();
        if (decoded.length > 0) {
          setGuestName(decoded);
        }
      }
    } catch (e) {
      console.error("Error reading 'to' query parameter in App:", e);
    }
  }, []);

  // Scroll to invitation top on open
  useEffect(() => {
    if (opened) {
      window.scrollTo(0, 0);
    }
  }, [opened]);

  const handleOpenInvitation = () => {
    setOpened(true);
    setIsMusicPlaying(true);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleRSVPSuccess = () => {
    // Increment count to trigger a live re-fetch in BukuTamu component
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-islamic-pattern text-[#0D5C53] selection:bg-[#0D5C53]/10 selection:text-[#0D5C53] overflow-x-hidden flex flex-col items-center">
      <AnimatePresence>
        {/* Step 1: Animated Splash Screen */}
        {showSplash && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <AnimatePresence>
          {!opened ? (
            /* Step 2: Personalized Front Envelope / Cover */
            <motion.div
              key="cover"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%', transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }}
              className="fixed inset-0 z-40 flex justify-center bg-[#E8E4DA] overflow-hidden"
            >
              <div className="invitation-shell w-full h-full">
                <Cover onOpen={handleOpenInvitation} />
              </div>
            </motion.div>
          ) : (
            /* Step 3: Full Premium Invitation Content */
            <motion.div
              key="main-invitation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="invitation-shell w-full flex flex-col min-h-screen bg-[#F6F1E6]"
            >
              {/* Sections Flow */}
              <Hero />
              
              <AcaraHighlight />
              
              <Countdown />
              
              <DetailAcara />
              
              <Suspense fallback={<div className="py-8 text-center text-xs text-[#0D5C53]/50 font-medium">Memuat...</div>}>
                <GoogleMaps />
                <Gallery />
                <GiftComponent />

                {/* Combined RSVP & Wishes section */}
                <section id="rsvp-wishes-section" className="relative section-padding bg-islamic-pattern border-t border-[#0D5C53]/10 overflow-hidden flex flex-col items-center">
                  {/* Visual Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0D5C53]/5 rounded-full filter blur-3xl pointer-events-none" />

                  <div className="max-w-4xl w-full flex flex-col items-center gap-10 relative z-10">
                    {/* Header */}
                    <div className="text-center space-y-2 mb-2">
                      <h2 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#0D5C53] font-medium">Ucapan &amp; Doa</h2>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-sm mx-auto leading-relaxed px-2">
                        Berikan ucapan harapan dan do'a kepada putra kami tercinta
                      </p>
                    </div>

                    {/* Responsive Grid: RSVP form + Guest Book list */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full items-start">
                      <RSVPForm onSuccess={handleRSVPSuccess} />
                      <BukuTamu refreshTrigger={refreshTrigger} />
                    </div>
                  </div>
                </section>
              </Suspense>

              {/* Closing Statement & Footer */}
              <section id="closing-section" className="relative pt-16 sm:pt-20 md:pt-24 pb-0 bg-islamic-pattern overflow-hidden flex flex-col items-center text-center border-t border-[#0D5C53]/10">
                <div className="max-w-2xl w-full flex flex-col items-center gap-10 relative z-10 px-4">
                  {/* Mandala ornament */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#0D5C53] rotate-45 rounded-lg shadow-md border-2 border-[#D4AF37]/50" />
                    <Star className="absolute w-7 h-7 text-[#D4AF37] fill-[#D4AF37]/20 z-10 animate-pulse" />
                  </div>

                  {/* Closing Text */}
                  <div className="space-y-4 max-w-lg">
                    <p className="text-sm sm:text-base md:text-lg text-[#0D5C53] leading-relaxed font-bold">
                      Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila{' '}
                      <span className="text-[#D4AF37] font-extrabold underline decoration-dashed decoration-[#D4AF37]/50 underline-offset-4 px-1.5 py-0.5 bg-[#0D5C53]/5 rounded">
                        {guestName}
                      </span>{' '}
                      berkenan hadir memberikan do’a restu untuk putra kami tercinta.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 font-semibold italic">
                      Atas kehadiran dan do’a restunya, kami ucapkan terima kasih.
                    </p>
                  </div>

                  {/* Closing Salam */}
                  <div className="space-y-3">
                    <h3 className="text-sm sm:text-base font-extrabold tracking-[0.2em] text-[#D4AF37] uppercase">Wassalamu’alaikum Wr. Wb.</h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-black uppercase tracking-wider">Keluarga Besar:</p>
                    <h4 className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-[#0D5C53] tracking-wide drop-shadow-sm">{siteConfig.event.invitingFamily}</h4>
                  </div>
                </div>

                {/* Decorative Wave & Child-friendly Islamic Ornaments as the bottom frame */}
                <div className="relative w-full mt-20 bg-transparent flex flex-col justify-end">
                  
                  {/* The Wavy Boundary Line */}
                  <div className="relative w-full">
                    <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-12 sm:h-16 md:h-20 text-[#0D5C53] block" fill="currentColor">
                      <path d="M0,0 C20,8 35,16 50,16 C65,16 80,8 100,0 L100,20 L0,20 Z" />
                      <path d="M0,0 C20,8 35,16 50,16 C65,16 80,8 100,0" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
                      <path d="M0,1 C20,9 35,17 50,17 C65,17 80,9 100,1" fill="none" stroke="#D4AF37" strokeWidth="0.1" opacity="0.5" />
                    </svg>

                    {/* Hanging Ornaments hanging from the wave curve */}
                    <div className="absolute inset-x-0 top-[10px] sm:top-[15px] flex justify-between px-8 sm:px-16 md:px-24 pointer-events-none z-20">
                      {/* Ornament Left: Hanging Islamic Lantern */}
                      <motion.div 
                        animate={{ rotate: [-4, 4, -4] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="origin-top flex flex-col items-center"
                      >
                        <div className="w-[1.5px] h-8 sm:h-12 bg-[#D4AF37]/65" />
                        <svg viewBox="0 0 100 120" className="w-6 h-7 sm:w-8 sm:h-9 text-[#D4AF37] fill-current drop-shadow-md">
                          <path d="M50,10 L30,30 L30,70 L50,90 L70,70 L70,30 Z" stroke="#D4AF37" strokeWidth="5" />
                          <circle cx="50" cy="50" r="12" fill="#0D5C53" />
                          <polygon points="50,30 55,45 70,50 55,55 50,70 45,55 30,50 45,45" fill="#D4AF37" />
                        </svg>
                      </motion.div>

                      {/* Ornament Left Inner: Swaying Star */}
                      <motion.div 
                        animate={{ rotate: [3, -3, 3] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                        className="origin-top flex flex-col items-center hidden sm:flex"
                      >
                        <div className="w-[1px] h-12 sm:h-16 bg-[#D4AF37]/50" />
                        <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#D4AF37] fill-current drop-shadow-sm">
                          <polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35" />
                        </svg>
                      </motion.div>

                      {/* Ornament Right Inner: Crescent Moon */}
                      <motion.div 
                        animate={{ rotate: [-3, 3, -3] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                        className="origin-top flex flex-col items-center hidden sm:flex"
                      >
                        <div className="w-[1px] h-12 sm:h-16 bg-[#D4AF37]/50" />
                        <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#D4AF37] fill-current drop-shadow-sm">
                          <path d="M40 10 A 30 30 0 1 0 70 80 A 35 35 0 1 1 40 10 Z" />
                        </svg>
                      </motion.div>

                      {/* Ornament Right: Decorative Ketupat */}
                      <motion.div 
                        animate={{ rotate: [5, -5, 5] }}
                        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                        className="origin-top flex flex-col items-center"
                      >
                        <div className="w-[1.5px] h-8 sm:h-12 bg-[#D4AF37]/65" />
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-[#D4AF37] to-[#B38F24] border border-white/20 rotate-45 shadow-md flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-[#0D5C53] border border-[#D4AF37]" />
                        </div>
                      </motion.div>
                    </div>

                    {/* The Rotated Diamond Star Centerpiece Emblem */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] sm:bottom-[-14px] w-6 h-6 sm:w-8 sm:h-8 rotate-45 bg-gradient-to-br from-[#D4AF37] to-[#8C6D23] shadow-lg z-30 flex items-center justify-center border-2 border-white/10">
                      <div className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 bg-[#0D5C53] border border-[#D4AF37] flex items-center justify-center">
                        <Star className="w-2 h-2 text-[#D4AF37] fill-[#D4AF37]" />
                      </div>
                    </div>
                  </div>

                  {/* Dark Green Solid Footer Base Block */}
                  <footer className="w-full bg-[#0D5C53] text-[#FAF6ED] pt-12 pb-10 px-4 sm:px-6 safe-bottom flex flex-col items-center relative z-10 select-none overflow-hidden">
                    
                    {/* Tiny Floating Mini-Stars behind content for magical kids vibe */}
                    <div className="absolute top-2 left-[10%] opacity-20 animate-bounce"><Sparkles className="w-4 h-4 text-[#D4AF37]" /></div>
                    <div className="absolute top-4 right-[15%] opacity-15 animate-pulse"><Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" /></div>
                    <div className="absolute bottom-6 left-[20%] opacity-25 animate-pulse"><Star className="w-3 h-3 text-[#D4AF37]" /></div>
                    <div className="absolute bottom-4 right-[8%] opacity-20 animate-bounce"><Sparkles className="w-4 h-4 text-[#D4AF37]" /></div>

                    {/* Footer Contents */}
                    <div className="max-w-md w-full flex flex-col items-center space-y-4 relative z-20 text-center">
                      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-serif text-sm sm:text-base md:text-lg font-black text-[#D4AF37] uppercase tracking-wider">
                        <span>Walimatul Khitan</span>
                        <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse shrink-0" />
                        <span className="break-words">{siteConfig.child.fullName}</span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-[#FAF6ED]/80 leading-relaxed font-medium max-w-sm">
                        Terima kasih atas doa restu Anda untuk ananda tercinta.
                      </p>

                      {/* Simple line decoration */}
                      <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent my-1" />

                      <div className="flex flex-col items-center space-y-1 text-[11px] sm:text-xs text-[#FAF6ED]/70 font-medium">
                        <p>
                          Dibuat dengan sepenuh hati oleh <span className="text-[#D4AF37] font-bold">VINSZ</span>
                        </p>
                        <a 
                          href="https://wa.me/6281944090188?text=Halo%20VINSZ,%20saya%20ingin%20order%20undangan%20digital"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:underline font-bold transition-all pt-1"
                        >
                          <span>Order? Hubungi 081944090188</span>
                        </a>
                      </div>

                      <p className="font-mono text-[9px] text-[#FAF6ED]/40 tracking-wider pt-1">
                        © 2026 All Rights Reserved.
                      </p>
                    </div>
                  </footer>
                </div>
              </section>

              {/* Floating Ambient Music Controller */}
              <AudioPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />

            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
