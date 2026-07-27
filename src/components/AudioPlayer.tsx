import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../config/site';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

function MusicNoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSrc, setCurrentSrc] = useState<string>(siteConfig.music.url);
  const [hasError, setHasError] = useState(false);

  // Maintain fresh reference of isPlaying for visibility handlers without stale closures
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Track whether audio was active before entering background so we can auto-resume upon return
  const wasPlayingBeforeHideRef = useRef(false);

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

  // Page visibility & app backgrounding logic:
  // 1. When switching apps or pressing Home button on phone: pause audio if playing & mark wasPlayingBeforeHide.
  // 2. When returning to Chrome/app: auto-resume audio if it was playing before leaving!
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const isCurrentlyAudioActive = isPlayingRef.current || (audioRef.current && !audioRef.current.paused);
        if (isCurrentlyAudioActive) {
          wasPlayingBeforeHideRef.current = true;
          audioRef.current?.pause();
          setIsPlaying(false);
        }
      } else {
        if (wasPlayingBeforeHideRef.current) {
          wasPlayingBeforeHideRef.current = false;
          setIsPlaying(true);
        }
      }
    };

    const handlePageHide = () => {
      const isCurrentlyAudioActive = isPlayingRef.current || (audioRef.current && !audioRef.current.paused);
      if (isCurrentlyAudioActive) {
        wasPlayingBeforeHideRef.current = true;
        audioRef.current?.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [setIsPlaying]);

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
    const newPlaying = !isPlaying;
    // Manual play/pause resets the auto-resume flag
    wasPlayingBeforeHideRef.current = false;
    setIsPlaying(newPlaying);
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

      <div className="relative group">
        {/* Subtle background pulse aura when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full bg-[#D4AF37]/30 animate-ping opacity-60 pointer-events-none duration-1000" />
        )}

        <button
          id="audio-floating-fab"
          onClick={togglePlay}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl focus:outline-none cursor-pointer"
          aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        >
          {/* Metallic Gold Ring Border */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#FCF6BA] to-[#AA771C] p-[2px] shadow-md">
            <span className="block w-full h-full rounded-full bg-[#0D5C53] group-hover:bg-[#09403A] transition-colors duration-300" />
          </span>

          {/* Main Music Logo with smooth slow rotation when playing */}
          <span className={`relative z-10 text-[#D4AF37] transition-all duration-300 ${isPlaying ? 'animate-spin-slow scale-105' : 'scale-95 opacity-80'}`}>
            <MusicNoteIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md" />
          </span>

          {/* Dynamic Play / Pause Badge at Bottom-Right */}
          <span className="absolute -bottom-0.5 -right-0.5 z-20 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#FCF6BA] to-[#AA771C] text-[#0D5C53] border-2 border-[#FAFAF7] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
            {isPlaying ? (
              <PauseIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
            ) : (
              <PlayIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
