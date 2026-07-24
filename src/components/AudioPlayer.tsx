import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../config/site';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8.5 5.5v13c0 .55.6.88 1.05.62l10.5-6.5a.75.75 0 0 0 0-1.24L9.55 4.88A.75.75 0 0 0 8.5 5.5Z" />
    </svg>
  );
}

function EqualizerIcon({ className, animated }: { className?: string; animated?: boolean }) {
  const bars = [
    { x: 4, h: 10, cls: 'audio-eq-bar-1' },
    { x: 9, h: 16, cls: 'audio-eq-bar-2' },
    { x: 14, h: 12, cls: 'audio-eq-bar-3' },
    { x: 19, h: 18, cls: 'audio-eq-bar-4' },
  ];

  return (
    <svg viewBox="0 0 28 24" fill="currentColor" className={className} aria-hidden="true">
      {bars.map(({ x, h, cls }) => (
        <rect
          key={x}
          x={x}
          y={(24 - h) / 2}
          width="3.5"
          height={h}
          rx="1.75"
          className={animated ? `audio-eq-bar ${cls}` : undefined}
        />
      ))}
    </svg>
  );
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSrc, setCurrentSrc] = useState<string>(siteConfig.music.url);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio play error:", err);
          if (currentSrc !== siteConfig.music.fallbackUrl && siteConfig.music.fallbackUrl) {
            console.log("Switching to fallback audio source...");
            setCurrentSrc(siteConfig.music.fallbackUrl);
          } else {
            setIsPlaying(false);
          }
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSrc, setIsPlaying]);

  const handleAudioError = () => {
    console.warn("Audio source failed to load:", currentSrc);
    if (currentSrc !== siteConfig.music.fallbackUrl && siteConfig.music.fallbackUrl) {
      setCurrentSrc(siteConfig.music.fallbackUrl);
    } else {
      setHasError(true);
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (hasError) {
      setHasError(false);
      setCurrentSrc(siteConfig.music.url);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div id="audio-player-container" className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] right-4 md:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] md:right-6 z-50">
      <audio
        ref={audioRef}
        src={currentSrc}
        loop
        preload="auto"
        onError={handleAudioError}
      />

      <div className="flex items-center gap-2">
        <button
          id="audio-floating-fab"
          onClick={togglePlay}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer group ${
            isPlaying ? 'audio-fab-playing' : 'shadow-book hover:shadow-lg'
          }`}
          aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
        >
          {/* Gradient ring border */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#FCF6BA] to-[#AA771C] p-[2px]">
            <span className="block w-full h-full rounded-full bg-[#0D5C53] group-hover:bg-[#09403A] transition-colors duration-300" />
          </span>

          {/* Soft inner glow when playing */}
          {isPlaying && (
            <span className="absolute inset-[3px] rounded-full bg-[#D4AF37]/10 pointer-events-none" />
          )}

          {/* Icon */}
          <span className="relative z-10 text-[#D4AF37] transition-all duration-300">
            {isPlaying ? (
              <EqualizerIcon className="w-6 h-6" animated />
            ) : (
              <PlayIcon className="w-6 h-6 ml-0.5 drop-shadow-sm" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
