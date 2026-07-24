import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/site';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Elegant loading mock simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
          }, 400); // Small delay for visual satisfaction
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          id="splash-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAFAF7]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Islamic Background Pattern */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-islamic-pattern bg-repeat" />
          
          {/* Frame Borders */}
          <div className="absolute inset-4 border border-[#0D5C53]/10 pointer-events-none rounded-3xl" />
          <div className="absolute inset-6 border border-[#D4AF37]/25 pointer-events-none rounded-3xl animate-pulse" />

          {/* Logo / Mandala */}
          <div className="relative flex flex-col items-center gap-6 max-w-sm px-6 text-center">
            {/* Elegant Spinning Mandala / Islamic Star Motif */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-28 h-28 flex items-center justify-center"
            >
              {/* Outer decorative star */}
              <div className="absolute inset-0 border-2 border-dashed border-[#D4AF37]/40 rounded-full animate-spin" style={{ animationDuration: '25s' }} />
              
              {/* Spinning Islamic Mandala Motif shape */}
              <div className="absolute w-20 h-20 bg-[#0D5C53] rotate-45 rounded-xl shadow-book flex items-center justify-center transform transition-transform" />
              <div className="absolute w-20 h-20 bg-[#0D5C53] rounded-xl shadow-book flex items-center justify-center" />
              
              {/* Inner glowing details */}
              <motion.div 
                className="absolute w-12 h-12 rounded-full border border-[#D4AF37] bg-[#FAFAF7] flex items-center justify-center z-10"
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <Star className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]/20" />
              </motion.div>

              {/* Little sparkles around */}
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-[#D4AF37] animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-[#D4AF37] animate-pulse delay-500" />
            </motion.div>

            {/* Event Header */}
            <div className="space-y-2 mt-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-black"
              >
                WALIMATUL KHITAN
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-serif text-3xl font-black tracking-tight text-[#0D5C53]"
              >
                {siteConfig.child.fullName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xs text-gray-500 font-bold"
              >
                Putra dari Bapak {siteConfig.child.fatherName} & Ibu {siteConfig.child.motherName}
              </motion.p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-48 h-1.5 bg-[#0D5C53]/5 rounded-full overflow-hidden mt-6 relative border border-[#0D5C53]/5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0D5C53] to-[#D4AF37]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Loading text percentage */}
            <motion.span 
              className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Memuat Undangan... {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
