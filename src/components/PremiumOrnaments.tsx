import React from 'react';

/** Ornamen sudut ukiran emas — filigree klasik undangan mewah */
export const CornerFiligree: React.FC<{ className?: string; flip?: 'x' | 'y' | 'both' }> = ({
  className = '',
  flip,
}) => {
  const flipClass =
    flip === 'x' ? 'scale-x-[-1]' : flip === 'y' ? 'scale-y-[-1]' : flip === 'both' ? 'scale-[-1]' : '';

  return (
    <svg
      viewBox="0 0 120 120"
      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 pointer-events-none select-none ${flipClass} ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 0 L55 0 C48 8 42 12 36 18 C28 26 22 36 18 48 C14 58 8 68 0 78 Z"
        fill="url(#goldFoil)"
        opacity="0.92"
      />
      <path
        d="M0 0 L40 0 C35 6 28 10 22 16 C16 22 12 30 8 40 C5 48 2 56 0 62"
        stroke="#8C6D23"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <path
        d="M8 8 C18 14 22 24 20 36 C18 44 12 50 6 54"
        stroke="#FBF5B7"
        strokeWidth="0.4"
        opacity="0.6"
      />
      <circle cx="14" cy="14" r="2.5" fill="#D4AF37" opacity="0.8" />
      <circle cx="28" cy="8" r="1.5" fill="#FBF5B7" opacity="0.7" />
      <circle cx="8" cy="28" r="1.5" fill="#FBF5B7" opacity="0.7" />
      <path
        d="M20 20 C26 24 28 30 26 36 C24 40 20 42 16 40"
        stroke="#AA771C"
        strokeWidth="0.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M0 0 L0 70 C6 62 10 52 8 42 C6 32 3 18 0 8"
        fill="url(#goldFoil)"
        opacity="0.35"
      />
      <defs>
        <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8C6D23" />
          <stop offset="25%" stopColor="#FBF5B7" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="75%" stopColor="#FCF6BA" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/** Header lengkung masjid dengan efek emboss kertas + trim emas */
export const PremiumArchHeader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute top-0 left-0 w-full z-10 pointer-events-none ${className}`}>
    <svg
      viewBox="0 0 100 50"
      preserveAspectRatio="none"
      className="w-full h-16 sm:h-20 md:h-24 drop-shadow-[0_4px_12px_rgba(13,92,83,0.25)]"
    >
      <defs>
        <linearGradient id="archGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0A4A44" />
          <stop offset="60%" stopColor="#0D5C53" />
          <stop offset="100%" stopColor="#094840" />
        </linearGradient>
        <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8C6D23" />
          <stop offset="30%" stopColor="#FBF5B7" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#FBF5B7" />
          <stop offset="100%" stopColor="#8C6D23" />
        </linearGradient>
      </defs>
      <path d="M0,0 L100,0 L100,15 C85,15 75,45 50,45 C25,45 15,15 0,15 Z" fill="url(#archGrad)" />
      <path d="M0,15 C15,15 25,45 50,45 C75,45 85,15 100,15" fill="none" stroke="url(#archGold)" strokeWidth="0.9" />
      <path d="M0,13 C15,13 25,43 50,43 C75,43 85,13 100,13" fill="none" stroke="#FBF5B7" strokeWidth="0.25" opacity="0.45" />
      {/* Subtle embossed line texture */}
      {[3, 6, 9].map((y) => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeWidth="0.15" opacity="0.06" />
      ))}
    </svg>

    {/* Diamond centerpiece — foil stamped */}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-[-7px] sm:bottom-[-9px] w-5 h-5 sm:w-6 sm:h-6 rotate-45 gold-foil-badge z-20 flex items-center justify-center">
      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#0D5C53] border border-[#D4AF37]/80 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-0" />
      </div>
    </div>
  </div>
);

/** Divider emas dengan ornamen tengah */
export const GoldOrnamentDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 w-full max-w-xs mx-auto ${className}`}>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-[#D4AF37]/70" />
    <svg viewBox="0 0 40 40" className="w-6 h-6 shrink-0" aria-hidden="true">
      <path
        d="M20 2 L24 14 L36 14 L26 22 L30 34 L20 26 L10 34 L14 22 L4 14 L16 14 Z"
        fill="url(#dividerGold)"
        stroke="#8C6D23"
        strokeWidth="0.5"
      />
      <circle cx="20" cy="20" r="3" fill="#0D5C53" stroke="#D4AF37" strokeWidth="0.5" />
      <defs>
        <linearGradient id="dividerGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AA771C" />
          <stop offset="50%" stopColor="#FBF5B7" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/20 to-[#D4AF37]/70" />
  </div>
);

/** Lapisan tekstur kertas premium — taruh di dalam section relative */
export const PaperTextureLayer: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-premium-paper pointer-events-none" aria-hidden="true" />
    <div className="absolute inset-0 bg-islamic-pattern opacity-50 pointer-events-none" aria-hidden="true" />
    <div className="absolute inset-0 paper-vignette pointer-events-none" aria-hidden="true" />
    {/* Corner filigree ornaments */}
    <CornerFiligree className="absolute top-12 sm:top-16 left-0 opacity-80" />
    <CornerFiligree className="absolute top-12 sm:top-16 right-0 opacity-80" flip="x" />
    <CornerFiligree className="absolute bottom-4 left-0 opacity-60" flip="y" />
    <CornerFiligree className="absolute bottom-4 right-0 opacity-60" flip="both" />
  </>
);
