import { motion } from 'motion/react';
import { Calendar, Clock, Star, Sparkles } from 'lucide-react';
import { siteConfig } from '../config/site';
import { BookCard, BatikDivider } from './BookDecoration';

export default function DetailAcara() {
  const schedules = [
    {
      id: "event-1",
      day: "Rabu",
      date: "5 Agustus 2026",
      time: "17.00 WIB - Selesai",
      title: "Resepsi Syukuran",
      desc: "Momen syukur dan silaturahmi atas khitanan putra kami, disertai doa untuk masa depannya."
    },
    {
      id: "event-2",
      day: "Kamis",
      date: "6 Agustus 2026",
      time: "09.00 WIB - Selesai",
      title: "Resepsi Syukuran",
      desc: "Momen syukur dan silaturahmi atas khitanan putra kami, disertai doa untuk masa depannya."
    },
    {
      id: "event-3",
      day: "Jumat",
      date: "7 Agustus 2026",
      time: "13.00 WIB - Selesai",
      title: "Walimatul Khitan",
      desc: "Walimatul Khitanan merupakan acara syukuran atas terlaksananya khitan sebagai bentuk rasa syukur dan permohonan doa untuk kebaikan anak."
    }
  ];

  return (
    <section id="detail-acara-section" className="relative section-padding bg-islamic-pattern overflow-hidden flex flex-col items-center">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#0D5C53]/5 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none translate-x-1/3" />

      <div className="max-w-4xl w-full flex flex-col items-center text-center gap-10 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">AGENDA & LOKASI</span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#0D5C53]">Rangkaian Kegiatan</h2>
          <BatikDivider className="mx-auto" />
          <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed px-2">
            Berikut jadwal lengkap pelaksanaan khitanan ananda Arga yang diselenggarakan di kediaman kami.
          </p>
        </div>

        {/* Schedule Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {schedules.map((schedule, idx) => {
            const textDayClass = "text-[#0D5C53]";
            const textDateClass = "text-[#D4AF37]";
            const iconContainerClass = "bg-[#0D5C53]/5 text-[#0D5C53] group-hover:bg-[#0D5C53] group-hover:text-[#FAFAF7]";
            const dividerClass = "bg-gradient-to-r from-[#0D5C53]/10 via-[#D4AF37]/25 to-transparent";
            const titleClass = "text-[#0D5C53]";
            const descClass = "text-gray-500";
            const footerClass = "bg-[#0D5C53]/5 border border-[#0D5C53]/10";
            const footerIconClass = "text-[#0D5C53]";
            const footerTextClass = "text-[#0D5C53]";

            return (
              <BookCard
                key={schedule.id}
                className="flex flex-col gap-5 text-left"
              >
                {/* Day Badge */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex flex-col">
                    <span className={`font-serif text-2xl font-black ${textDayClass}`}>{schedule.day}</span>
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${textDateClass}`}>{schedule.date}</span>
                  </div>
                  <div className={`p-2.5 rounded-2xl transition-all duration-300 ${iconContainerClass}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>

                {/* Divider */}
                <div className={`h-[1px] w-full relative z-10 ${dividerClass}`} />

                {/* Content text */}
                <div className="space-y-1.5 flex-1 relative z-10">
                  <h3 className={`font-serif text-base font-bold flex items-center gap-1.5 ${titleClass}`}>
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>{schedule.title}</span>
                  </h3>
                  <p className={`text-xs leading-relaxed font-normal ${descClass}`}>{schedule.desc}</p>
                </div>
              </BookCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}

