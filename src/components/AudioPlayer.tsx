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

function EqualizerIcon({ className }: { className?: string }) {
  const bars = [
    { x: 4, h: 10 },
    { x: 9, h: 16 },
    { x: 14, h: 12 },
    { x: 19, h: 18 },
  ];

  return (
    <svg viewBox="0 0 28 24" fill="currentColor" className={className} aria-hidden="true">
      {bars.map(({ x, h }) => (
        <rect
          key={x}
          x={x}
          y={(24 - h) / 2}
          width="3.5"
          height={h}
          rx="1.75"
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

  // Pause audio when page/tab is hidden and optionally resume when it becomes visible again
  const playingBeforeHideRef = React.useRef(false);
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        // Remember whether we were playing before the tab got hidden
        playingBeforeHideRef.current = isPlaying;
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        // Tab became visible again
        if (playingBeforeHideRef.current) {
          // Restore original source (in case it switched to fallback) and resume playback
          setCurrentSrc(siteConfig.music.url);
          setIsPlaying(true);
        }
      }
    };
    const handlePageHide = () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('beforeunload', handlePageHide);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('beforeunload', handlePageHide);
    };
  }, [isPlaying]);
  const handleAudioError = () => {
    console.warn("Audio source failed to load:", currentSrc);
    if (currentSrc !== siteConfig.music.fallbackUrl && siteConfig.music.fallbackUrl) {
      setCurrentSrc(siteConfig.music.fallbackUrl);
    } else {
      setHasError(true);
      setIsPlaying(false);
    }
  };

  // Initialize auto‑play based on user's previous pause action
  useEffect(() => {
    const pausedByUser = localStorage.getItem('audioUserPaused') === 'true';
    if (!pausedByUser) {
      // If the user hasn't manually paused before, start playing automatically
      setIsPlaying(true);
    }
  }, []);

  const togglePlay = () => {
    if (hasError) {
      setHasError(false);
      setCurrentSrc(siteConfig.music.url);
    }
    const newPlaying = !isPlaying;
    setIsPlaying(newPlaying);
    // Remember the user's explicit pause/play choice
    localStorage.setItem('audioUserPaused', (!newPlaying).toString());
  };

  return (
    <div id="audio-player-container" className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] right-3.5 sm:bottom-6 sm:right-6 z-40">
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
          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg focus:outline-none cursor-pointer group"
          aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
        >
          {/* Subtle metallic gold ring border */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#FCF6BA] to-[#AA771C] p-[1.5px]">
            <span className="block w-full h-full rounded-full bg-[#0D5C53] group-hover:bg-[#09403A] transition-colors duration-200" />
          </span>

          {/* Icon */}
          <span className="relative z-10 text-[#D4AF37] transition-all duration-200">
            {isPlaying ? (
              <EqualizerIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            ) : (
              <PlayIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 ml-0.5" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
