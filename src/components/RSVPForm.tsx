import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { RSVPInput } from '../types';
import { BookCard } from './BookDecoration';
import { dbService } from '../lib/dbService';

interface RSVPFormProps {
  onSuccess: () => void;
}

export default function RSVPForm({ onSuccess }: RSVPFormProps) {
  const [name, setName] = useState('');
  const [presence, setPresence] = useState<'hadir' | 'ragu' | 'tidak_hadir' | ''>('');
  const [wish, setWish] = useState('');
  const [guestLocation, setGuestLocation] = useState<string | null>(null);
  const [turutList, setTurutList] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);

      // Guest name from ?to=
      const toParam = params.get('to');
      if (toParam) {
        const decoded = decodeURIComponent(toParam).trim();
        if (decoded) setName(decoded);
      }

      // Guest location from ?di= or ?lokasi= etc.
      const locParam = params.get('di') || params.get('lokasi') || params.get('loc') || params.get('location');
      if (locParam) {
        const decoded = decodeURIComponent(locParam).trim();
        if (decoded) {
          const formatted = decoded.toLowerCase().startsWith('di ') || decoded.toLowerCase().startsWith('di-')
            ? decoded
            : `di ${decoded}`;
          setGuestLocation(formatted);
        }
      }

      // Turut mengundang from ?turut= or ?tm= etc.
      const turutParam = params.get('turut') || params.get('turut_mengundang') || params.get('tm');
      if (turutParam) {
        const decoded = decodeURIComponent(turutParam).trim();
        if (decoded) {
          const list = decoded.split(/[,|;\n]+/).map(s => s.trim()).filter(Boolean);
          if (list.length > 0) setTurutList(list);
        }
      }
    } catch (e) {
      console.error("Error reading query parameters in RSVPForm:", e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple robust validation
    if (!name.trim()) {
      setErrorMessage("Silakan masukkan nama Anda.");
      setSubmitStatus('error');
      return;
    }
    if (!presence) {
      setErrorMessage("Silakan pilih status konfirmasi kehadiran Anda.");
      setSubmitStatus('error');
      return;
    }
    if (!wish.trim()) {
      setErrorMessage("Silakan tulis ucapan doa atau ucapan selamat Anda.");
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const newRsvp = await dbService.addRSVP(
        name.trim(),
        presence as 'hadir' | 'ragu' | 'tidak_hadir',
        wish.trim()
      );

      // Store created ID to localStorage to enable editing/deletion by owner
      try {
        const myRsvpIds = JSON.parse(localStorage.getItem('my_rsvp_ids') || '[]');
        if (newRsvp && newRsvp.id) {
          myRsvpIds.push(newRsvp.id);
          localStorage.setItem('my_rsvp_ids', JSON.stringify(myRsvpIds));
        }
      } catch (err) {
        console.error("Failed to save RSVP ID to localStorage:", err);
      }

      setSubmitStatus('success');
      setName('');
      setPresence('');
      setWish('');
      // Signal parent component to instantly refresh comments
      onSuccess();
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Gagal menghubungi server. Silakan periksa koneksi Anda.');
      console.error("RSVP error: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BookCard id="rsvp-form-container" className="w-full max-w-xl">

      {/* Form title */}
      <div className="text-center border-b border-[#0D5C53]/10 pb-5 mb-6 relative z-10">
        <h3 className="font-sans text-lg sm:text-xl font-bold text-[#0D5C53]">Kirim Ucapan &amp; Konfirmasi Kehadiran</h3>

        {/* Guest info badge — kondisional, hanya tampil jika ada nama/lokasi */}
        {(name || guestLocation || turutList.length > 0) && (
          <div className="mt-3 flex flex-col items-center gap-1.5">
            {/* Kepada & Lokasi */}
            {name && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
                <span className="text-[#0D5C53]/60 font-medium">Kepada:</span>
                <span className="bg-[#0D5C53] text-[#FAFAF7] font-bold px-2.5 py-0.5 rounded-full">{name}</span>
                {guestLocation && (
                  <span className="text-[#AA771C] font-semibold italic">{guestLocation}</span>
                )}
              </div>
            )}
            {/* Turut Mengundang */}
            {turutList.length > 0 && (
              <div className="text-[10px] text-[#0D5C53]/60 font-medium italic">
                Turut: {turutList.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>

      {submitStatus === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center gap-4 py-8 relative z-10"
        >
          <div className="w-14 h-14 bg-[#0D5C53]/10 text-[#0D5C53] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-[#0D5C53]">Konfirmasi Berhasil!</h4>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
              Terima kasih banyak atas konfirmasi dan ucapan doa restu yang Anda kirimkan untuk ananda Arga.
            </p>
          </div>
          <button
            id="btn-rsvp-reset"
            onClick={() => setSubmitStatus('idle')}
            className="text-xs font-semibold text-[#0D5C53] underline cursor-pointer hover:text-[#09403A] mt-2 focus:outline-none"
          >
            Kirim ucapan baru
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          {/* Error notice */}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold">Gagal mengirim:</span> {errorMessage}
              </div>
            </motion.div>
          )}

          {/* Guest Name Input */}
          <div className="space-y-1.5 text-left">
            <label htmlFor="input-guest-name" className="text-sm font-bold text-[#0D5C53] tracking-wide">Nama Anda</label>
            <input
              id="input-guest-name"
              type="text"
              placeholder="Contoh: Sarif"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white border border-[#0D5C53]/30 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 disabled:opacity-50 shadow-sm transition-all duration-300"
            />
          </div>

          {/* Presence Selection (hadir | ragu | tidak_hadir) */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-semibold text-[#0D5C53]/85 tracking-wide block">Konfirmasi Kehadiran</label>
            <div className="flex flex-col gap-3">
              {/* Hadir (Full Width) */}
              <button
                type="button"
                id="btn-presence-hadir"
                disabled={isSubmitting}
                onClick={() => setPresence('hadir')}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 border cursor-pointer focus:outline-none flex items-center justify-center gap-2 ${
                  presence === 'hadir'
                    ? 'bg-[#0D5C53] border-[#0D5C53] text-[#FAFAF7] shadow-md shadow-[#0D5C53]/25'
                    : 'bg-[#FAFAF7]/40 border-gray-200 text-[#0D5C53] hover:border-[#D4AF37]/50'
                }`}
              >
                <span>Hadir</span>
              </button>

              {/* Ragu & Tidak Hadir (Side by Side) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="btn-presence-ragu"
                  disabled={isSubmitting}
                  onClick={() => setPresence('ragu')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 border cursor-pointer focus:outline-none flex items-center justify-center gap-2 ${
                    presence === 'ragu'
                      ? 'bg-[#0D5C53] border-[#0D5C53] text-[#FAFAF7] shadow-md shadow-[#0D5C53]/25'
                      : 'bg-[#FAFAF7]/40 border-gray-200 text-[#0D5C53] hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span>Masih Ragu</span>
                </button>
                <button
                  type="button"
                  id="btn-presence-tidak_hadir"
                  disabled={isSubmitting}
                  onClick={() => setPresence('tidak_hadir')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 border cursor-pointer focus:outline-none flex items-center justify-center gap-2 ${
                    presence === 'tidak_hadir'
                      ? 'bg-[#0D5C53] border-[#0D5C53] text-[#FAFAF7] shadow-md shadow-[#0D5C53]/25'
                      : 'bg-[#FAFAF7]/40 border-gray-200 text-[#0D5C53] hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span>Tidak Hadir</span>
                </button>
              </div>
            </div>
          </div>

          {/* Wish Message Area */}
          <div className="space-y-1.5 text-left">
            <div className="flex justify-between items-center">
              <label htmlFor="textarea-guest-wish" className="text-sm font-bold text-[#0D5C53] tracking-wide">Tulis Ucapan</label>
              <span className="text-[10px] text-slate-500 font-mono font-semibold">{wish.length}/350</span>
            </div>
            <textarea
              id="textarea-guest-wish"
              rows={4}
              maxLength={350}
              placeholder="Tulis ucapan selamat & doa terbaik Anda disini..."
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-white border border-[#0D5C53]/30 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 disabled:opacity-50 resize-none shadow-sm transition-all duration-300"
            />
          </div>

          {/* Submit Action */}
          <button
            id="btn-rsvp-submit"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#0D5C53] hover:bg-[#09403A] disabled:bg-[#0D5C53]/50 text-[#FAFAF7] font-semibold text-xs tracking-widest rounded-xl shadow-book hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 uppercase cursor-pointer focus:outline-none border border-[#D4AF37]/20"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-[#FAFAF7] border-t-transparent rounded-full animate-spin" />
                <span>MENGIRIM...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>KIRIM</span>
              </>
            )}
          </button>

        </form>
      )}
    </BookCard>
  );
}
