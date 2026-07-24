import confetti from 'canvas-confetti';

export function triggerLuxuryConfetti() {
  const colors = ['#4E3629', '#B38728', '#FDF9F2', '#EADBC8', '#C5A880'];
  
  // Left side burst
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.8 },
    colors: colors
  });
  
  // Right side burst
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.8 },
    colors: colors
  });

  // Center celebration burst
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.6 },
      colors: colors
    });
  }, 350);
}
