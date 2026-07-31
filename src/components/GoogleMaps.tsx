import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Map, MapPin, QrCode, ExternalLink, Compass } from 'lucide-react';
import QRCode from 'react-qr-code';
import { siteConfig } from '../config/site';


export default function GoogleMaps() {
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="location-section" ref={containerRef} className="relative section-padding bg-islamic-pattern overflow-hidden flex flex-col items-center">
      {/* Decorative vector arches */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-12 bg-[#0D5C53]/5 rounded-b-full filter blur-md pointer-events-none -z-10" />

      <div className="max-w-4xl w-full flex flex-col items-center text-center gap-10 relative z-10">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-[#D4AF37]">
            <Map className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#0D5C53]/75">PETUNJUK ARAH</span>
          </div>
          <h2 className="font-serif text-3xl font-black text-[#0D5C53]">Peta Lokasi & Navigasi</h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto rounded-full" />
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed px-2">
            Klik tombol navigasi atau pindai kode QR di bawah ini untuk melihat lokasi lengkap melalui aplikasi Google Maps.
          </p>
        </div>

        {/* Dynamic Map and QR Code Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
          
          {/* Map Embed Frame (lg:col-span-8) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 bg-[#FAFAF7]/95 border border-[#0D5C53]/15 p-3 rounded-3xl shadow-book flex flex-col gap-4 group"
          >
            {/* Interactive Embedded Iframe */}
            <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-inner border border-[#0D5C53]/5 bg-[#FAF6ED]">
              {shouldLoadMap ? (
                <iframe
                  title="Google Maps Location - Walimatul Khitan Arganta Humayun"
                  src={siteConfig.event.googleMapsEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-[#0D5C53]/50 font-medium">
                  Memuat Peta Lokasi...
                </div>
              )}
            </div>


            {/* Nav button */}
            <div className="px-2 pb-2">
              <a
                id="btn-open-google-maps"
                href={siteConfig.event.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#0D5C53] hover:bg-[#09403A] text-[#FAFAF7] font-semibold text-xs tracking-widest rounded-full shadow-book hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 uppercase group focus:outline-none"
              >
                <Compass className="w-4 h-4 animate-spin-slow group-hover:rotate-45 transition-transform" style={{ animationDuration: '6s' }} />
                <span>BUKA DI GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>
            </div>
          </motion.div>

          {/* QR Code Column (lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 bg-[#FAFAF7]/95 border border-[#0D5C53]/15 rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4 sm:gap-6 shadow-book w-full"
          >
            {/* QR icon header */}
            <div className="flex items-center gap-1.5 text-[#0D5C53]">
              <QrCode className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] font-bold tracking-widest uppercase font-mono">Pindai Kode QR</span>
            </div>

            {/* QR Container */}
            <div className="relative p-4 bg-white rounded-2xl shadow-inner border border-[#D4AF37]/20 flex items-center justify-center">
              {/* Corner decor arches around the QR */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />
              
              <div className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] p-2 flex items-center justify-center">
                <QRCode
                  value={siteConfig.event.googleMapsLink}
                  size={144}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                  fgColor="#0D5C53"
                  bgColor="#FFFFFF"
                />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-sm font-bold text-[#0D5C53]">Akses Peta Lebih Cepat</h4>
              <p className="text-[10px] text-gray-500 max-w-[200px] leading-relaxed mx-auto">
                Buka kamera handphone Anda dan arahkan ke kode QR di atas untuk mendapatkan rute berkendara langsung.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
