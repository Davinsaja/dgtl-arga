import { useState, useEffect, useId } from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../config/site';

interface CoverProps {
  onOpen: () => void;
}

/** Ornamen sudut — setengah lingkaran geometris seperti referensi */
function CornerCircleOrnament({ corner }: { corner: 'tl' | 'tr' | 'bl' | 'br' }) {
  const uid = useId().replace(/:/g, '');
  const posClass =
    corner === 'tl'
      ? '-top-1 -left-1'
      : corner === 'tr'
        ? '-top-1 -right-1 scale-x-[-1]'
        : corner === 'bl'
          ? '-bottom-1 -left-1 scale-y-[-1]'
          : '-bottom-1 -right-1 scale-[-1]';

  return (
    <svg
      viewBox="0 0 90 90"
      className={`absolute w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] pointer-events-none select-none ${posClass}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`cornerGold-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBF5B7" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6D23" />
        </linearGradient>
        <clipPath id={`cornerClip-${uid}`}>
          <rect x="0" y="0" width="90" height="90" />
        </clipPath>
      </defs>
      <g clipPath={`url(#cornerClip-${uid})`}>
        {/* Lingkaran konsentris — pusat di sudut */}
        <circle cx="0" cy="0" r="82" fill="#0D5C53" />
        <circle cx="0" cy="0" r="72" fill="none" stroke={`url(#cornerGold-${uid})`} strokeWidth="2.5" />
        <circle cx="0" cy="0" r="58" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.65" />
        <circle cx="0" cy="0" r="44" fill="#094840" opacity="0.55" />

        {/* Bintang 8 sudut */}
        {[0, 45].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 0 0)`}>
            <polygon
              points="0,-34 8,-10 34,-10 12,4 20,30 0,14 -20,30 -12,4 -34,-10 -8,-10"
              fill={`url(#cornerGold-${uid})`}
              opacity="0.9"
            />
          </g>
        ))}

        {/* Motif arabesque kecil */}
        {[22.5, 67.5, 112.5, 157.5].map((deg) => (
          <circle
            key={deg}
            cx={Math.cos((deg * Math.PI) / 180) * 52}
            cy={Math.sin((deg * Math.PI) / 180) * 52}
            r="3.5"
            fill="#FAFAF7"
            opacity="0.35"
          />
        ))}

        <circle cx="0" cy="0" r="9" fill="#D4AF37" />
        <circle cx="0" cy="0" r="4.5" fill="#FAFAF7" opacity="0.5" />
      </g>
    </svg>
  );
}

/** Gerbang masjid — header hijau + lengkung mihrab */
function MosqueGateHeader() {
  return (
    <div className="relative w-full shrink-0 h-[168px] sm:h-[188px]">
      {/* Background hijau + garis pinstripe */}
      <div className="absolute inset-0 bg-[#0D5C53] overflow-hidden">
        {[6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90].map((y) => (
          <div
            key={y}
            className="absolute left-0 right-0 h-px bg-white/[0.09]"
            style={{ top: `${y}%` }}
          />
        ))}
      </div>

      {/* Ornamen sudut atas */}
      <CornerCircleOrnament corner="tl" />
      <CornerCircleOrnament corner="tr" />

      {/* Lengkung mihrab — badan krem naik ke header */}
      <svg
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[72px] sm:h-[80px] text-[#FAFAF7]"
        aria-hidden="true"
      >
        <path d="M0,100 L400,100 L400,28 C340,28 310,96 200,96 C90,96 60,28 0,28 Z" fill="currentColor" />
        <path
          d="M0,28 C60,28 90,96 200,96 C310,96 340,28 400,28"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2.2"
        />
        <path
          d="M0,26 C60,26 90,94 200,94 C310,94 340,26 400,26"
          fill="none"
          stroke="#FBF5B7"
          strokeWidth="0.6"
          opacity="0.45"
        />
      </svg>

      {/* Bintang emas di puncak lengkung */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[58px] sm:bottom-[64px] z-20">
        <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#D4AF37] fill-current drop-shadow-md">
          <path d="M12 2 L14.2 9.2 L22 12 L14.2 14.8 L12 22 L9.8 14.8 L2 12 L9.8 9.2 Z" />
        </svg>
      </div>

      {/* Siluet kubah masjid kecil di atas lengkung */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[68px] sm:bottom-[76px] z-10 opacity-90">
        <svg viewBox="0 0 60 48" className="w-9 h-7 sm:w-10 sm:h-8 text-[#D4AF37]" fill="currentColor" aria-hidden="true">
          <path d="M30 4 C30 4 14 18 18 36 L42 36 C46 18 30 4 30 4 Z" opacity="0.85" />
          <rect x="16" y="36" width="28" height="10" rx="1" />
          <path d="M30 36 L30 46" stroke="#0D5C53" strokeWidth="2.5" />
          <path d="M30 4 L30 0" stroke="currentColor" strokeWidth="1.2" />
          <path d="M30 0 A 3.5 3.5 0 1 0 33 5.5 A 4.5 4.5 0 1 1 30 0 Z" />
        </svg>
      </div>
    </div>
  );
}

function BottomStarRow() {
  return (
    <div className="flex items-center justify-center gap-[7px] sm:gap-2 py-2.5">
      {Array.from({ length: 9 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`text-[#D4AF37] fill-current ${
            i === 4 ? 'w-3 h-3 sm:w-3.5 sm:h-3.5' : 'w-2 h-2 sm:w-2.5 sm:h-2.5 opacity-75'
          }`}
          aria-hidden="true"
        >
          <path d="M12 2 L14.2 9.2 L22 12 L14.2 14.8 L12 22 L9.8 14.8 L2 12 L9.8 9.2 Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Cover({ onOpen }: CoverProps) {
  const [guestName, setGuestName] = useState('Bapak/Ibu/Saudara/i');

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get('to');
      if (toParam) {
        const decoded = decodeURIComponent(toParam)
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .trim();
        if (decoded.length > 0) {
          setGuestName(decoded);
        }
      }
    } catch (e) {
      console.error("Error reading 'to' query parameter:", e);
    }
  }, []);

  return (
    <div
      id="envelope-cover"
      className="relative flex h-[100dvh] min-h-[100dvh] w-full items-center justify-center bg-[#E8E4DA] safe-top safe-bottom overflow-hidden"
    >
      {/* Kartu undangan — proporsi portrait seperti referensi */}
      <div className="relative flex flex-col w-full max-w-[400px] h-full max-h-[100dvh] sm:max-h-[860px] sm:h-[92dvh] sm:rounded-2xl sm:shadow-[0_20px_60px_rgba(13,92,83,0.18)] overflow-hidden bg-[#FAFAF7]">

        {/* Pattern halus */}
        <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />

        {/* Gerbang masjid */}
        <MosqueGateHeader />

        {/* Konten utama — spacing rapat seperti referensi */}
        <div className="relative z-10 flex flex-1 flex-col items-center text-center px-6 pt-3 pb-2 overflow-y-auto overscroll-contain">
          {/* Judul */}
          <div className="mb-3 sm:mb-4 flex flex-col items-center gap-0.5">
            <p className="font-serif italic text-[1.65rem] sm:text-[1.85rem] text-[#0D5C53] leading-none">
              {siteConfig.cover.label}
            </p>
            <h1 className="font-sans font-extrabold text-[0.8rem] sm:text-sm tracking-[0.24em] text-[#D4AF37] uppercase">
              {siteConfig.cover.title}
            </h1>
          </div>

          {/* Foto bulat */}
          <div className="relative mb-3 sm:mb-4">
            <div className="rounded-full bg-gradient-to-br from-[#D4AF37] via-[#FCF6BA] to-[#AA771C] p-[2.5px] shadow-[0_6px_22px_rgba(212,175,55,0.32)]">
              <div className="w-[130px] h-[130px] sm:w-[148px] sm:h-[148px] rounded-full overflow-hidden bg-[#0D5C53]">
                <img
                  src={siteConfig.cover.photo}
                  alt={siteConfig.child.fullName}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Nama */}
          <h2 className="font-serif text-[1.2rem] sm:text-[1.35rem] font-bold text-[#0D5C53] mb-4 sm:mb-5 leading-snug px-1">
            {siteConfig.child.fullName}
          </h2>

          {/* Tamu */}
          <div className="flex flex-col items-center gap-1 mb-5 sm:mb-6">
            <p className="font-serif text-[0.8rem] sm:text-sm text-[#0D5C53]/75 italic">Kepada Yth;</p>
            <p className="font-serif text-base sm:text-lg font-bold text-[#D4AF37] leading-snug break-words max-w-[260px]">
              {guestName}
            </p>
          </div>

          {/* Tombol */}
          <motion.button
            id="btn-open-envelope"
            onClick={onOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-9 sm:px-10 py-2.5 sm:py-3 gold-gradient-bg hover:brightness-105 text-white font-serif font-bold text-[0.82rem] sm:text-sm rounded-full shadow-[0_5px_20px_rgba(212,175,55,0.4)] border border-white/20 cursor-pointer tracking-wide"
          >
            {siteConfig.cover.buttonText}
          </motion.button>

          {/* Spacer agar footer menempel bawah */}
          <div className="flex-1 min-h-2" />
        </div>

        {/* Footer — ornamen sudut bawah + bintang */}
        <div className="relative shrink-0 h-[72px] sm:h-[80px]">
          <CornerCircleOrnament corner="bl" />
          <CornerCircleOrnament corner="br" />
          <div className="absolute inset-x-0 bottom-0 safe-bottom">
            <BottomStarRow />
          </div>
        </div>
      </div>
    </div>
  );
}
