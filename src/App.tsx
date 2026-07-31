import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles } from 'lucide-react';

import SplashScreen from './components/SplashScreen';
import Cover from './components/Cover';
import Hero from './components/Hero';
import { siteConfig } from './config/site';

const AcaraHighlight = lazy(() => import('./components/AcaraHighlight'));
const Countdown = lazy(() => import('./components/Countdown'));
const DetailAcara = lazy(() => import('./components/DetailAcara'));
const AudioPlayer = lazy(() => import('./components/AudioPlayer'));
const GoogleMaps = lazy(() => import('./components/GoogleMaps'));
const Gallery = lazy(() => import('./components/Gallery'));
const GiftComponent = lazy(() => import('./components/Gift'));
const RSVPForm = lazy(() => import('./components/RSVPForm'));
const BukuTamu = lazy(() => import('./components/BukuTamu'));

const SectionLoader = () => (
  <div className="py-6 text-center text-xs text-[#0D5C53]/40 font-medium">Memuat...</div>
);

export default function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [opened, setOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [guestName, setGuestName] = useState("Bapak/Ibu/Saudara/i");
  const [guestLocation, setGuestLocation] = useState<string>("di Tempat");
  const [turutMengundangList, setTurutMengundangList] = useState<string[]>([]);
  
  // Initialize music playback based on previous manual pause flag
  useEffect(() => {
    const paused = localStorage.getItem('audioUserPaused') === 'true';
    if (!paused) {
      setIsMusicPlaying(true);
    }
  }, []);

  // Read guest name 'to', location 'di', & 'turut' parameter from URL query string or siteConfig
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      
      // Guest Name
      const toParam = params.get('to');
      if (toParam) {
        const decoded = decodeURIComponent(toParam).trim();
        if (decoded.length > 0) {
          setGuestName(decoded);
        }
      }

      // Guest Location
      const locParam = params.get('di') || params.get('lokasi') || params.get('loc') || params.get('location');
      if (locParam) {
        const decodedLoc = decodeURIComponent(locParam).trim();
        if (decodedLoc.length > 0) {
          const formattedLoc = decodedLoc.toLowerCase().startsWith('di ') || decodedLoc.toLowerCase().startsWith('di-')
            ? decodedLoc
            : `di ${decodedLoc}`;
          setGuestLocation(formattedLoc);
        }
      }

      // Turut Mengundang
      const turutParam = params.get('turut') || params.get('turut_mengundang') || params.get('tm');
      if (turutParam) {
        const decoded = decodeURIComponent(turutParam).trim();
        if (decoded.length > 0) {
          const parsedItems = decoded.split(/[\n,;|]+/).map(item => item.trim()).filter(Boolean);
          setTurutMengundangList(parsedItems);
        }
      } else if (siteConfig.event.turutMengundang) {
        const raw = siteConfig.event.turutMengundang;
        if (Array.isArray(raw)) {
          setTurutMengundangList(raw.map(item => item.trim()).filter(Boolean));
        } else if (typeof raw === 'string' && raw.trim().length > 0) {
          const parsedItems = raw.split(/[\n,;|]+/).map(item => item.trim()).filter(Boolean);
          setTurutMengundangList(parsedItems);
        }
      }
    } catch (e) {
      console.error("Error reading URL parameters in App:", e);
    }
  }, []);

  // Scroll to invitation top on open
  useEffect(() => {
    if (opened) {
      window.scrollTo(0, 0);
    }
  }, [opened]);

  const handleOpenInvitation = useCallback(() => {
    setOpened(true);
    setIsMusicPlaying(true);
  }, []);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleRSVPSuccess = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

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
              className="fixed inset-0 z-40 flex justify-center bg-[#F6F0E2] sm:bg-[#E8E4DA] overflow-hidden w-full max-w-full"
            >
              <div className="invitation-shell w-full h-full">
                <Cover onOpen={handleOpenInvitation} guestName={guestName} guestLocation={guestLocation} />
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
              <Hero guestName={guestName} guestLocation={guestLocation} />
              
              <Suspense fallback={<SectionLoader />}>
                <AcaraHighlight />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Countdown />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <DetailAcara />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <GoogleMaps />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <Gallery />
              </Suspense>

              <Suspense fallback={<SectionLoader />}>
                <GiftComponent />
              </Suspense>

              {/* Combined RSVP & Wishes section */}
              <Suspense fallback={<SectionLoader />}>
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

                    {/* Responsive Grid: RSVP form + Guest Book list side-by-side on Laptop/PC */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full items-start">
                      <RSVPForm onSuccess={handleRSVPSuccess} />
                      <BukuTamu refreshTrigger={refreshTrigger} />
                    </div>
                  </div>
                </section>
              </Suspense>


              {/* Closing Statement & Footer */}
              <section id="closing-section" className="relative pt-14 sm:pt-18 md:pt-20 pb-0 bg-islamic-pattern overflow-hidden flex flex-col items-center text-center border-t border-[#0D5C53]/10">
                <div className="max-w-xl w-full flex flex-col items-center gap-8 relative z-10 px-4">
                  {/* Mandala ornament */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center animate-floating">
                    <div className="absolute inset-0 bg-[#0D5C53] rotate-45 rounded-xl shadow-md border-2 border-[#D4AF37]" />
                    <div className="relative z-10 flex items-center justify-center">
                      <Star className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" />
                    </div>
                  </div>

                  {/* Closing Text */}
                  <div className="space-y-3 max-w-md">
                    <p className="text-sm sm:text-base text-[#0D5C53] leading-relaxed font-bold">
                      Merupakan suatu kehormatan &amp; kebahagiaan bagi kami apabila{' '}
                      <span className="text-[#D4AF37] font-extrabold underline decoration-dashed decoration-[#D4AF37]/50 underline-offset-4 px-1.5 py-0.5 bg-[#0D5C53]/5 rounded">
                        {guestName}
                      </span>{' '}
                      {guestLocation && (
                        <span className="text-[#0D5C53] font-bold italic">
                          ({guestLocation}){' '}
                        </span>
                      )}
                      berkenan hadir memberikan doa restu.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium italic">
                      Atas kehadiran &amp; doa restunya, kami ucapkan terima kasih.
                    </p>
                  </div>

                  {/* Closing Salam & Host Info */}
                  <div className="space-y-3 w-full flex flex-col items-center">
                    <h3 className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#D4AF37] uppercase">Wassalamu’alaikum Wr. Wb.</h3>
                    
                    <div className="pt-2 flex flex-col items-center gap-1">
                      <p className="text-[11px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest">Kami yang berbahagia,</p>
                      <p className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-wider">Keluarga Besar:</p>
                      <h4 className="font-serif text-lg sm:text-xl md:text-2xl font-black text-[#0D5C53] tracking-wide">{siteConfig.event.invitingFamily}</h4>
                    </div>

                    {/* Conditional Turut Mengundang Section — Luxury Plakat Card */}
                    {turutMengundangList.length > 0 && (
                      <div className="mt-6 relative w-full max-w-sm mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#FAF5EA] via-[#F4EBD9] to-[#FAF5EA] border-2 border-[#D4AF37]/50 shadow-[0_6px_20px_rgba(212,175,55,0.18)] text-center overflow-hidden">
                        {/* Delicate Inner Foil Border */}
                        <div className="absolute inset-1.5 rounded-xl border border-[#D4AF37]/35 pointer-events-none" />

                        {/* Header Ornament */}
                        <div className="relative z-10 flex items-center justify-center gap-2 mb-1.5">
                          <span className="text-[#D4AF37] text-xs">❖</span>
                          <h5 className="font-serif text-xs sm:text-sm font-bold tracking-[0.2em] text-[#0D5C53] uppercase">
                            Turut Mengundang
                          </h5>
                          <span className="text-[#D4AF37] text-xs">❖</span>
                        </div>

                        {/* Gold Gradient Line */}
                        <div className="relative z-10 w-24 h-0.5 mx-auto mb-3 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                        {/* List of Names */}
                        <div className="relative z-10 space-y-1.5">
                          {turutMengundangList.map((name, index) => (
                            <div key={index} className="flex items-center justify-center gap-2 text-xs sm:text-sm font-serif font-semibold text-[#0D5C53]">
                              <span className="text-[#D4AF37] text-[9px]">✦</span>
                              <span>{name}</span>
                              <span className="text-[#D4AF37] text-[9px]">✦</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative Wave & Islamic Ornaments as the bottom frame */}
                <div className="relative w-full mt-16 bg-transparent flex flex-col justify-end">
                  
                  {/* The Wavy Boundary Line */}
                  <div className="relative w-full">
                    <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-12 sm:h-16 md:h-20 text-[#0D5C53] block" fill="currentColor">
                      <path d="M0,0 C20,8 35,16 50,16 C65,16 80,8 100,0 L100,20 L0,20 Z" />
                      <path d="M0,0 C20,8 35,16 50,16 C65,16 80,8 100,0" fill="none" stroke="#D4AF37" strokeWidth="0.4" />
                      <path d="M0,1 C20,9 35,17 50,17 C65,17 80,9 100,1" fill="none" stroke="#D4AF37" strokeWidth="0.1" opacity="0.5" />
                    </svg>

                    {/* Hanging Ornaments — Perfectly Symmetrical on all screens */}
                    <div className="absolute inset-x-0 top-[10px] sm:top-[15px] flex justify-between px-4 sm:px-12 md:px-20 pointer-events-none z-20">
                      {/* Ornament Left Outer: Hanging Islamic Lantern */}
                      <div className="origin-top flex flex-col items-center animate-floating">
                        <div className="w-[1.5px] h-7 sm:h-12 bg-[#D4AF37]/65" />
                        <svg viewBox="0 0 100 120" className="w-5 h-6 sm:w-8 sm:h-9 text-[#D4AF37] fill-current drop-shadow-md">
                          <path d="M50,10 L30,30 L30,70 L50,90 L70,70 L70,30 Z" stroke="#D4AF37" strokeWidth="5" />
                          <circle cx="50" cy="50" r="12" fill="#0D5C53" />
                          <polygon points="50,30 55,45 70,50 55,55 50,70 45,55 30,50 45,45" fill="#D4AF37" />
                        </svg>
                      </div>

                      {/* Ornament Left Inner: Hanging Gold Star */}
                      <div className="origin-top flex flex-col items-center animate-floating-slow">
                        <div className="w-[1px] h-9 sm:h-16 bg-[#D4AF37]/50" />
                        <svg viewBox="0 0 100 100" className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] fill-current drop-shadow-sm">
                          <polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35" />
                        </svg>
                      </div>

                      {/* Ornament Right Inner: Hanging Gold Star */}
                      <div className="origin-top flex flex-col items-center animate-floating-slow">
                        <div className="w-[1px] h-9 sm:h-16 bg-[#D4AF37]/50" />
                        <svg viewBox="0 0 100 100" className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] fill-current drop-shadow-sm">
                          <polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35" />
                        </svg>
                      </div>

                      {/* Ornament Right Outer: Hanging Islamic Lantern */}
                      <div className="origin-top flex flex-col items-center animate-floating">
                        <div className="w-[1.5px] h-7 sm:h-12 bg-[#D4AF37]/65" />
                        <svg viewBox="0 0 100 120" className="w-5 h-6 sm:w-8 sm:h-9 text-[#D4AF37] fill-current drop-shadow-md">
                          <path d="M50,10 L30,30 L30,70 L50,90 L70,70 L70,30 Z" stroke="#D4AF37" strokeWidth="5" />
                          <circle cx="50" cy="50" r="12" fill="#0D5C53" />
                          <polygon points="50,30 55,45 70,50 55,55 50,70 45,55 30,50 45,45" fill="#D4AF37" />
                        </svg>
                      </div>
                    </div>

                    {/* The Rotated Diamond Star Centerpiece Emblem */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] sm:bottom-[-14px] w-6 h-6 sm:w-8 sm:h-8 rotate-45 bg-gradient-to-br from-[#D4AF37] to-[#8C6D23] shadow-lg z-30 flex items-center justify-center border-2 border-white/10">
                      <div className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 bg-[#0D5C53] border border-[#D4AF37] flex items-center justify-center">
                        <Star className="w-2 h-2 text-[#D4AF37] fill-[#D4AF37]" />
                      </div>
                    </div>
                  </div>

                  {/* Dark Green Solid Footer Base Block */}
                  <footer className="w-full bg-[#0D5C53] text-[#FAF6ED] pt-10 pb-8 px-4 sm:px-6 safe-bottom flex flex-col items-center relative z-10 select-none overflow-hidden">
                    
                    {/* Floating ambient sparkles — CSS animation (GPU) replaces Motion repeat:Infinity */}
                    <span className="absolute top-3 left-[12%] pointer-events-none animate-floating opacity-40">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </span>
                    <span className="absolute bottom-4 right-[12%] pointer-events-none animate-floating-slow opacity-30">
                      <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    </span>

                    {/* Footer Contents */}
                    <div className="max-w-md w-full flex flex-col items-center space-y-3 relative z-20 text-center">
                      <div className="flex items-center justify-center gap-2 font-serif text-xs sm:text-sm md:text-base font-bold text-[#D4AF37] tracking-wider">
                        <span>Walimatul Khitan</span>
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                        <span>{siteConfig.child.fullName}</span>
                      </div>
                      
                      {/* Minimalist Divider Line with Center Diamond Ornament */}
                      <div className="flex items-center gap-3 w-48 justify-center my-0.5 opacity-75">
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                        <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                      </div>

                      <div className="text-[11px] sm:text-xs text-[#FAF6ED]/75 font-medium flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                        <span>Dibuat oleh <strong className="text-[#D4AF37]">VINSZ</strong></span>
                        <span className="opacity-40">•</span>
                        <a 
                          href="https://wa.me/6281944090188?text=Halo%20VINSZ,%20saya%20ingin%20order%20undangan%20digital"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D4AF37] hover:underline font-bold transition-all"
                        >
                          Order: 081944090188
                        </a>
                      </div>

                      <p className="text-[9px] text-[#FAF6ED]/40 tracking-wider">
                        © 2026 All Rights Reserved.
                      </p>
                    </div>
                  </footer>
                </div>
              </section>

              {/* Floating Ambient Music Controller */}
              <Suspense fallback={null}>
                <AudioPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
              </Suspense>

            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
