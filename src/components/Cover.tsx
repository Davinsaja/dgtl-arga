import { memo, useId } from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../config/site';
import { CornerFiligree } from './PremiumOrnaments';

interface CoverProps {
  onOpen: () => void;
  guestName: string;
  guestLocation: string;
}

/** Ornamen sudut — setengah lingkaran geometris seperti referensi */
const CornerCircleOrnament = memo(function CornerCircleOrnament({ corner }: { corner: 'tl' | 'tr' | 'bl' | 'br' }) {
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
      className={`absolute w-[72px] h-[72px] sm:w-[75px] sm:h-[75px] pointer-events-none select-none ${posClass}`}
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
});

/** Gerbang masjid — header hijau + lengkung mihrab */
const MosqueGateHeader = memo(function MosqueGateHeader() {
  return (
    <div className="relative w-full shrink-0 h-[120px] xs:h-[135px] sm:h-[125px]">
      {/* Background hijau + garis pinstripe */}
      <div className="absolute inset-0 bg-[#0D5C53] overflow-hidden flex flex-col items-center pt-2">
        {[10, 25, 40, 55, 70, 85].map((y) => (
          <div
            key={y}
            className="absolute left-0 right-0 h-px bg-white/[0.08]"
            style={{ top: `${y}%` }}
          />
        ))}

        {/* Lentera Emas Kecil */}
        <div className="relative z-10 text-[#D4AF37] opacity-90 drop-shadow">
          <svg viewBox="0 0 24 32" className="w-5 h-6 sm:w-6 sm:h-7" fill="currentColor">
            <path d="M12 0 L12 4 M8 4 L16 4 L14 8 L10 8 Z" stroke="currentColor" strokeWidth="1" />
            <path d="M7 8 L17 8 L19 20 L5 20 Z" fill="#FBF5B7" fillOpacity="0.85" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="12" cy="14" r="2.5" fill="#D4AF37" />
            <path d="M5 20 L19 20 L16 26 L8 26 Z" />
            <circle cx="12" cy="28" r="1.5" />
          </svg>
        </div>

        {/* Teks Undangan di dalam header hijau */}
        <p className="relative z-10 font-serif italic text-xl sm:text-2xl text-[#FCF6BA] drop-shadow-md leading-none mt-1 tracking-wide">
          {siteConfig.cover.label}
        </p>
      </div>

      {/* Ornamen sudut atas */}
      <CornerCircleOrnament corner="tl" />
      <CornerCircleOrnament corner="tr" />

      {/* Lengkung mihrab */}
      <svg
        viewBox="0 0 400 90"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[55px] sm:h-[50px] text-[#F6F0E2]"
        aria-hidden="true"
      >
        <path d="M0,90 L400,90 L400,24 C340,24 310,86 200,86 C90,86 60,24 0,24 Z" fill="currentColor" />
        <path
          d="M0,24 C60,24 90,86 200,86 C310,86 340,24 400,24"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2.2"
        />
        <path
          d="M0,22 C60,22 90,84 200,84 C310,84 340,22 400,22"
          fill="none"
          stroke="#FBF5B7"
          strokeWidth="0.6"
          opacity="0.45"
        />
      </svg>

      {/* Bintang emas di puncak lengkung */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[42px] sm:bottom-[40px] z-20">
        <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-[20px] sm:h-[20px] text-[#D4AF37] fill-current drop-shadow-md">
          <path d="M12 2 L14.2 9.2 L22 12 L14.2 14.8 L12 22 L9.8 14.8 L2 12 L9.8 9.2 Z" />
        </svg>
      </div>
    </div>
  );
});

const BottomStarRow = memo(function BottomStarRow() {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-2">
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
});

const Cover = memo(function Cover({ onOpen, guestName, guestLocation }: CoverProps) {
  return (
    <div
      id="envelope-cover"
      className="relative flex h-[100dvh] min-h-[100dvh] w-full items-center justify-center bg-[#F6F0E2] sm:bg-[#E3DAC9] safe-top safe-bottom overflow-y-auto no-scrollbar overflow-x-hidden p-0 sm:p-4"
    >
      {/* Kartu undangan */}
      <div className="relative flex flex-col w-full sm:max-w-[440px] h-full max-h-[100dvh] sm:max-h-[820px] sm:h-[94dvh] sm:rounded-3xl sm:shadow-[0_20px_60px_rgba(13,92,83,0.25)] overflow-y-auto no-scrollbar overflow-x-hidden bg-[#F6F0E2] justify-between shadow-[inset_0_0_35px_rgba(212,175,55,0.18)] border-0 sm:border border-[#D4AF37]/30 my-auto">

        {/* Outer Gold Foil Double Line Frame inside Card */}
        <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-[#D4AF37]/35 pointer-events-none z-10" />

        {/* Pattern Arabesque Islami Halus */}
        <div className="absolute inset-0 bg-islamic-pattern opacity-50 pointer-events-none" />

        {/* Ornamen Ukiran Sudut Emas Klasik (Corner Filigree) */}
        <CornerFiligree className="absolute top-28 left-2 w-12 h-12 opacity-70 z-10" />
        <CornerFiligree className="absolute top-28 right-2 w-12 h-12 opacity-70 z-10" flip="x" />
        <CornerFiligree className="absolute bottom-16 left-2 w-12 h-12 opacity-70 z-10" flip="y" />
        <CornerFiligree className="absolute bottom-16 right-2 w-12 h-12 opacity-70 z-10" flip="both" />

        {/* Gerbang masjid header */}
        <MosqueGateHeader />

        {/* Konten utama */}
        <div className="relative z-20 flex flex-1 flex-col items-center justify-evenly text-center px-4 py-1.5 min-h-max">
          
          {/* Subtitle TASYAKURAN KHITAN */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[#D4AF37] text-xs">❖</span>
              <h1 className="font-sans font-black text-xs sm:text-sm tracking-[0.24em] text-[#0D5C53] uppercase">
                {siteConfig.cover.title}
              </h1>
              <span className="text-[#D4AF37] text-xs">❖</span>
            </div>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          {/* Frame Foto Mewah Islami */}
          <div className="relative my-1.5 xs:my-2 shrink-0 flex items-center justify-center">
            {/* Outer Golden Glow & Halo Ornament */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37]/25 via-[#FBF5B7]/35 to-[#AA771C]/15 scale-105 pointer-events-none" />

            {/* Rotating Decorative Outer Gold Ring */}
            <div className="absolute -inset-3.5 sm:-inset-4 rounded-full border border-dashed border-[#D4AF37]/60 pointer-events-none animate-[spin_40s_linear_infinite]" />

            {/* Outer Metallic Gold Border Frame */}
            <div className="relative rounded-full p-[4px] bg-gradient-to-b from-[#FBF5B7] via-[#D4AF37] to-[#8C6D23] shadow-[0_12px_35px_rgba(212,175,55,0.45),0_4px_15px_rgba(13,92,83,0.35)]">
              {/* Middle Emerald Inset */}
              <div className="rounded-full p-[2.5px] bg-[#0D5C53]">
                {/* Inner Ivory Frame Ring */}
                <div className="w-[150px] h-[150px] xs:w-[170px] xs:h-[170px] sm:w-[160px] sm:h-[160px] rounded-full overflow-hidden bg-[#FAF5EA] border-2 border-[#FAF5EA] relative shadow-inner">
                  <img
                    src={siteConfig.cover.photo}
                    alt={siteConfig.child.fullName}
                    className="w-full h-full object-cover brightness-[1.03] contrast-[1.02] transition-transform duration-500 hover:scale-105"
                    style={{ objectPosition: siteConfig.cover.objectPosition || '62% 15%' }}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  {/* Subtle Inner Ring Highlight */}
                  <div className="absolute inset-0 rounded-full border border-[#D4AF37]/40 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Top Gold Crescent Emblem Ornament */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0D5C53] border-2 border-[#D4AF37] px-2.5 py-0.5 rounded-full shadow-md z-30 flex items-center justify-center gap-1 text-[#FCF6BA]">
              <span className="text-[#D4AF37] text-xs font-bold">☪</span>
            </div>
          </div>

          {/* Nama Anak */}
          <h2 className="font-serif text-xl xs:text-2xl sm:text-2xl font-black text-[#0D5C53] drop-shadow-sm leading-tight px-1">
            {siteConfig.child.fullName}
          </h2>

          {/* Plakat Tamu / Kepada Yth */}
          <div className="flex flex-col items-center gap-1 w-full max-w-[290px] py-3 px-4 rounded-xl bg-[#FAF5EA] border-2 border-[#D4AF37]/50 shadow-[0_4px_14px_rgba(212,175,55,0.16)] relative">
            <p className="font-serif text-xs sm:text-sm font-bold text-[#0D5C53] mt-0.5">Kepada Yth;</p>
            <p className="font-serif text-sm xs:text-base sm:text-base font-black text-[#AA771C] leading-snug break-words">
              {guestName}
            </p>
            {guestLocation && (
              <p className="font-serif text-xs sm:text-sm font-bold text-[#0D5C53]/90 italic tracking-wide mt-0.5">
                {guestLocation}
              </p>
            )}
          </div>

          {/* Tombol Buka Undangan */}
          <motion.button
            id="btn-open-envelope"
            onClick={onOpen}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-9 sm:px-9 py-2.5 sm:py-2.5 bg-gradient-to-r from-[#0D5C53] via-[#09403A] to-[#0D5C53] border-2 border-[#D4AF37] text-[#FCF6BA] font-serif font-black text-xs sm:text-xs rounded-full shadow-[0_8px_25px_rgba(13,92,83,0.4)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.45)] cursor-pointer tracking-wider uppercase transition-all duration-200"
          >
            {siteConfig.cover.buttonText}
          </motion.button>

        </div>

        {/* Footer — ornamen sudut bawah + bintang */}
        <div className="relative shrink-0 h-[55px] sm:h-[65px]">
          <CornerCircleOrnament corner="bl" />
          <CornerCircleOrnament corner="br" />
          <div className="absolute inset-x-0 bottom-0 safe-bottom">
            <BottomStarRow />
          </div>
        </div>

      </div>
    </div>
  );
});

export default Cover;
