import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { siteConfig } from '../config/site';
import { BatikDivider } from './BookDecoration';

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const images = siteConfig.gallery.images;

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

        {/* Carousel Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
          {images.map((imgSrc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-[#0D5C53]/10 cursor-zoom-in group"
              onClick={() => setActiveIdx(idx)}
            >
              <img
                src={imgSrc}
                alt={`Momen Arga ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay hover indicator */}
              <div className="absolute inset-0 bg-[#0D5C53]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-[#FAFAF7] gap-1.5 z-10">
                <ZoomIn className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-xs font-semibold uppercase tracking-wider">Perbesar</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal overlay */}
        <AnimatePresence>
          {activeIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 safe-top safe-bottom"
              onClick={() => setActiveIdx(null)}
            >
              {/* Close Button */}
              <button
                id="lightbox-close-btn"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-[#FAFAF7]/70 hover:text-[#FAFAF7] hover:bg-white/10 rounded-full transition-colors z-50 focus:outline-none"
                onClick={() => setActiveIdx(null)}
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                id="lightbox-prev-btn"
                className="absolute left-2 sm:left-4 p-2 sm:p-3 text-[#FAFAF7]/70 hover:text-[#FAFAF7] hover:bg-white/10 rounded-full transition-colors z-50 focus:outline-none"
                onClick={handlePrev}
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Active Image Frame */}
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[activeIdx]}
                  alt={`Momen Arga Perbesar ${activeIdx + 1}`}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/5"
                  referrerPolicy="no-referrer"
                />
                
                {/* Index badge counter */}
                <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono">
                  {activeIdx + 1} / {images.length}
                </div>
              </motion.div>

              {/* Next Button */}
              <button
                id="lightbox-next-btn"
                className="absolute right-2 sm:right-4 p-2 sm:p-3 text-[#FAFAF7]/70 hover:text-[#FAFAF7] hover:bg-white/10 rounded-full transition-colors z-50 focus:outline-none"
                onClick={handleNext}
                aria-label="Next Image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
