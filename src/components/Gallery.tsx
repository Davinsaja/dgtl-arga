import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Image, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { siteConfig } from '../config/site';
import { BatikDivider } from './BookDecoration';

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const images = siteConfig.gallery.images;

  const getImgSrc = (item: string | { url: string; position?: string }) =>
    typeof item === 'string' ? item : item.url;
  const getImgPos = (item: string | { url: string; position?: string }) =>
    typeof item === 'string' ? 'center top' : (item.position || 'center top');

  // Lock body & documentElement scroll when Lightbox is open to prevent background scrolling bug completely
  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [activeIdx]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery-section" className="relative section-padding bg-islamic-pattern border-t border-b border-[#0D5C53]/10 overflow-hidden flex flex-col items-center">
      {/* Background Ornaments Removed for cleaner look */}

      <div className="max-w-6xl w-full flex flex-col items-center gap-10 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-[#D4AF37]">
            <Image className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#0D5C53]/75">GALERI FOTO</span>
          </div>
          <h2 className="font-serif text-3xl font-black text-[#0D5C53]">Momen Bahagia Arga</h2>
          <BatikDivider className="mx-auto" />
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed px-2">
            Kumpulan potret momen berharga, kebahagiaan keluarga, dan kesiapan ananda Arga menyambut kesucian.
          </p>
        </div>

        {/* Gallery Grid 2x2 on all screens for large, prominent photos */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-5 md:gap-6 w-full max-w-2xl mx-auto">
          {images.map((imgItem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              whileHover={{ y: -4 }}
              className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-[#0D5C53]/15 cursor-zoom-in group transition-all duration-200"
              onClick={() => setActiveIdx(idx)}
            >
              <img
                src={getImgSrc(imgItem)}
                alt={`Momen Arga ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: getImgPos(imgItem) }}
                referrerPolicy="no-referrer"
                loading="lazy"
                decodes="async"
              />
              
              {/* Overlay hover indicator */}
              <div className="absolute inset-0 bg-[#0D5C53]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-[#FAFAF7] gap-1.5 z-10">
                <ZoomIn className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-xs font-semibold uppercase tracking-wider">Perbesar</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal overlay via React Portal mounted to document.body */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {activeIdx !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 w-screen h-screen z-[999999] bg-black/98 flex flex-col items-center justify-center p-4 overflow-hidden touch-none select-none"
                onClick={() => setActiveIdx(null)}
              >
                {/* Close Button */}
                <button
                  id="lightbox-close-btn"
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 text-white/80 hover:text-white hover:bg-white/20 bg-black/60 border border-white/20 rounded-full transition-colors z-[1000000] focus:outline-none cursor-pointer"
                  onClick={() => setActiveIdx(null)}
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Prev Button */}
                <button
                  id="lightbox-prev-btn"
                  className="absolute left-2 sm:left-6 p-2.5 sm:p-3 text-white/80 hover:text-white hover:bg-white/20 bg-black/60 border border-white/20 rounded-full transition-colors z-[1000000] focus:outline-none cursor-pointer"
                  onClick={handlePrev}
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
                </button>

                {/* Active Image Frame */}
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center px-2 z-[1000000]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={getImgSrc(images[activeIdx])}
                    alt={`Momen Arga Perbesar ${activeIdx + 1}`}
                    className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/15"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Index badge counter */}
                  <div className="mt-3.5 px-4 py-1 bg-black/80 border border-white/20 rounded-full text-white/90 text-xs font-mono tracking-widest shadow-lg">
                    {activeIdx + 1} / {images.length}
                  </div>
                </motion.div>

                {/* Next Button */}
                <button
                  id="lightbox-next-btn"
                  className="absolute right-2 sm:right-6 p-2.5 sm:p-3 text-white/80 hover:text-white hover:bg-white/20 bg-black/60 border border-white/20 rounded-full transition-colors z-[1000000] focus:outline-none cursor-pointer"
                  onClick={handleNext}
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      </div>
    </section>
  );
}
