import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Copy, Check } from 'lucide-react';
import { siteConfig } from '../config/site';

export default function GiftComponent() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleCopy = (id: string, number: string, name: string) => {
    navigator.clipboard.writeText(number)
      .then(() => {
        setCopiedId(id);
        setToastMessage(`Nomor rekening ${name} berhasil disalin.`);
        setShowToast(true);

        setTimeout(() => {
          setCopiedId(null);
        }, 2000);

        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Gagal menyalin nomor: ", err);
      });
  };

  // Helper to format bank account numbers if they don't already have hyphens
  const formatAccountNumber = (num: string) => {
    if (num.includes('-')) return num;
    return num.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <section id="gift-section" className="relative section-padding bg-[#0D5C53] overflow-hidden flex flex-col items-center justify-center">
      {/* Soft Islamic Archway overlay inside background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#D4AF37]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full flex flex-col items-center text-center gap-10 relative z-10">
        
        {/* Header - Simple & Clean */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#D4AF37]">
            <Gift className="w-5 h-5" />
            <span className="text-[10px] tracking-[0.25em] font-bold uppercase">WALIMATUL KHITAN GIFT</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold italic text-[#FAFAF7]">Kado Digital</h2>
          <p className="text-xs md:text-sm text-[#FAFAF7]/85 max-w-xl mx-auto leading-relaxed px-4 font-normal">
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
          </p>
        </div>

        {/* Gift Cards Grid matching the requested image design */}
        <div className="flex justify-center w-full max-w-md mx-auto px-2">
          {siteConfig.gifts.map((account) => {
            // Check if Bank Mandiri or Bank BRI for customized look
            const isMandiri = account.name.toLowerCase().includes('mandiri');

            return (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden min-h-[200px] sm:min-h-[220px] md:min-h-[240px] text-left border border-white/20"
              >
                {/* Header of Credit Card */}
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-400 text-xs font-semibold tracking-wider uppercase font-sans">
                    Gift Card
                  </span>
                  
                  {/* Bank Brand Logo Representation */}
                  {isMandiri ? (
                    <div className="flex flex-col items-end">
                      <span className="text-blue-900 font-extrabold text-sm md:text-base tracking-tighter italic font-sans leading-none">
                        mandiri
                      </span>
                      <div className="w-8 h-1 bg-yellow-400 rounded-full mt-0.5"></div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 font-sans">
                      <span className="text-blue-600 font-black text-base md:text-lg tracking-tighter leading-none">
                        BRI
                      </span>
                      <div className="w-2 h-2 bg-[#FF7900] rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Golden Smart Card Microchip */}
                <div className="my-3 self-start">
                  <div className="w-10 h-8 bg-gradient-to-br from-[#E6C687] via-[#D4AF37] to-[#AA771C] rounded-lg border border-[#D4AF37]/50 relative overflow-hidden flex flex-col justify-between p-1 shadow-sm">
                    {/* Microchip authentic internal grid layout lines */}
                    <div className="grid grid-cols-3 gap-0.5 h-full w-full opacity-70">
                      <div className="border-r border-b border-[#735414]/40"></div>
                      <div className="border-r border-b border-[#735414]/40"></div>
                      <div className="border-b border-[#735414]/40"></div>
                      <div className="border-r border-[#735414]/40"></div>
                      <div className="border-r border-[#735414]/40"></div>
                      <div className="border-[#735414]/40"></div>
                    </div>
                  </div>
                </div>

                {/* Account Number & Copy Button Line */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2 sm:gap-3 mt-auto">
                  <span className="font-mono text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-wide sm:tracking-widest text-gray-800 break-all sm:break-normal">
                    {formatAccountNumber(account.number)}
                  </span>

                  {/* Dark Copy Button with Icon */}
                  <button
                    onClick={() => handleCopy(account.id, account.number, account.name)}
                    className={`py-1.5 px-4 rounded-xl text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer focus:outline-none shrink-0 ${
                      copiedId === account.id
                        ? "bg-[#D4AF37] text-white shadow-inner"
                        : "bg-[#2D2A26] text-white hover:bg-gray-800 active:scale-95 shadow-md"
                    }`}
                  >
                    {copiedId === account.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white animate-scale-up" />
                        <span>Selesai</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-300" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Card Holder Section */}
                <div className="mt-3">
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">
                    Nama Pemilik
                  </span>
                  <span className="text-sm md:text-base font-bold text-gray-700 tracking-wide block uppercase font-sans mt-0.5">
                    {account.holder}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Custom Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#FAFAF7] text-[#0D5C53] px-6 py-3 border border-[#D4AF37]/25 rounded-full shadow-2xl flex items-center gap-2 max-w-sm w-[90%] text-center justify-center"
            >
              <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="text-xs font-bold tracking-wider uppercase font-sans">{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
