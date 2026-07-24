import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Star } from 'lucide-react';
import { siteConfig } from '../config/site';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const targetDate = new Date(siteConfig.event.countdownDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsFinished(true);
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Walimatul+Khitan+Arganta+Humayun+(Arga)&dates=20260805T080000Z/20260805T170000Z&details=Acara+syukuran+khitanan+putra+kami+tercinta+Arganta+Humayun.+Kehadiran+dan+doa+restu+Bapak/Ibu+sekalian+merupakan+kehormatan+bagi+kami.&location=Kediaman+Arganta+Humayun`;

  return (
    <section id="countdown-section" className="relative section-padding bg-islamic-pattern border-t border-b border-[#0D5C53]/10 overflow-hidden flex flex-col items-center">
      {/* Decorative Islamic Star Corners Removed for cleaner look */}

      <div className="max-w-2xl w-full flex flex-col items-center text-center space-y-7 relative z-10">
        
        {/* Header */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 text-[#D4AF37]">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#0D5C53]/75">MOMEN KHITANAN</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#0D5C53]">Menuju Hari Bahagia</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto px-2">Doa dan restu Anda di hari bahagia syukuran khitanan putra kami tercinta.</p>
        </div>

        {/* Countdown view logic */}
        <div className="w-full px-2">
          <AnimatePresence mode="wait">
            {isFinished ? (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#FAFAF7]/95 border border-[#D4AF37]/25 p-8 rounded-3xl shadow-book max-w-md mx-auto flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 bg-[#0D5C53]/10 rounded-full flex items-center justify-center text-[#0D5C53]">
                  <Star className="w-6 h-6 fill-current text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0D5C53]">Alhamdulillah</h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed text-center">
                  &ldquo;Alhamdulillah, seluruh rangkaian acara khitan telah berlangsung dengan lancar.&rdquo;
                </p>
                <span className="text-[10px] text-gray-400">Terima kasih atas segala do’a dan restu yang Anda berikan.</span>
              </motion.div>
            ) : (
              timeLeft && (
                <motion.div
                  key="countdown-grid"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-md mx-auto w-full"
                >
                  {/* Countdown Card 1: Days */}
                  <div className="bg-[#0D5C53] p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-book flex flex-col items-center justify-center gap-0.5 border border-[#D4AF37]/25 min-w-0">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FAFAF7] font-mono leading-none tabular-nums">
                      {timeLeft.days.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">Hari</span>
                  </div>

                  {/* Countdown Card 2: Hours */}
                  <div className="bg-[#0D5C53] p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-book flex flex-col items-center justify-center gap-0.5 border border-[#D4AF37]/25 min-w-0">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FAFAF7] font-mono leading-none tabular-nums">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">Jam</span>
                  </div>

                  {/* Countdown Card 3: Minutes */}
                  <div className="bg-[#0D5C53] p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-book flex flex-col items-center justify-center gap-0.5 border border-[#D4AF37]/25 min-w-0">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FAFAF7] font-mono leading-none tabular-nums">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">Menit</span>
                  </div>

                  {/* Countdown Card 4: Seconds */}
                  <div className="bg-[#0D5C53] p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-book flex flex-col items-center justify-center gap-0.5 border border-[#D4AF37]/25 min-w-0">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#D4AF37] font-mono leading-none tabular-nums">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-[#FAFAF7]/70 font-bold uppercase tracking-wider">Detik</span>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Calendar Integration Button */}
        <div className="flex flex-col items-center gap-4 mt-2">
          <a
            id="btn-save-calendar"
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-[#0D5C53] hover:bg-[#09403A] text-[#FAFAF7] text-xs font-semibold rounded-xl shadow-book flex items-center gap-2 border border-[#D4AF37]/20 transition-all duration-300 transform active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>Simpan di Kalender</span>
          </a>

          {/* Date String badge */}
          <div className="bg-[#0D5C53]/5 px-4 py-1.5 rounded-full border border-[#0D5C53]/10 flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-[#0D5C53] tracking-wider uppercase">
              {siteConfig.event.datesString}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

