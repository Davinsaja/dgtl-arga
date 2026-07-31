import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Check, HelpCircle, X, Sparkles, Heart, MessageCircle } from 'lucide-react';
import { RSVP } from '../types';
import { BookCard } from './BookDecoration';
import { dbService } from '../lib/dbService';

interface BukuTamuProps {
  refreshTrigger: number;
}

export default function BukuTamu({ refreshTrigger }: BukuTamuProps) {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // States for user self-edit/delete
  const [myRsvpIds, setMyRsvpIds] = useState<string[]>([]);
  const [myReplyIds, setMyReplyIds] = useState<string[]>([]);
  const [myLikedIds, setMyLikedIds] = useState<string[]>([]); // Liked main RSVP IDs
  const [myLikedReplyIds, setMyLikedReplyIds] = useState<string[]>([]); // Liked reply IDs

  // Editing state for main RSVP
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPresence, setEditPresence] = useState<'hadir' | 'ragu' | 'tidak_hadir'>('hadir');
  const [editWish, setEditWish] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Replying state
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyTargetName, setReplyTargetName] = useState<string>('');
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // Editing state for Reply
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editReplyName, setEditReplyName] = useState('');
  const [editReplyText, setEditReplyText] = useState('');
  const [isSavingReply, setIsSavingReply] = useState(false);

  const fetchRsvps = async (force = false) => {
    try {
      const data = await dbService.getRSVPs(force);
      setRsvps(data);
      setError(null);
    } catch (err: any) {
      console.error("Fetch RSVPs error: ", err);
      setError(err.message || "Gagal menghubungi server. Silakan muat ulang halaman.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRsvps(refreshTrigger > 0);
    // Load own RSVP IDs, Reply IDs, and Liked IDs from localStorage

    try {
      const stored = JSON.parse(localStorage.getItem('my_rsvp_ids') || '[]');
      setMyRsvpIds(stored);
      const storedReplies = JSON.parse(localStorage.getItem('my_reply_ids') || '[]');
      setMyReplyIds(storedReplies);
      const storedLikes = JSON.parse(localStorage.getItem('my_liked_ids') || '[]');
      setMyLikedIds(storedLikes);
      const storedReplyLikes = JSON.parse(localStorage.getItem('my_liked_reply_ids') || '[]');
      setMyLikedReplyIds(storedReplyLikes);
    } catch (e) {
      console.error(e);
    }
  }, [refreshTrigger]);

  const startEdit = (rsvp: RSVP) => {
    setEditingId(rsvp.id);
    setEditName(rsvp.name);
    setEditPresence(rsvp.presence);
    setEditWish(rsvp.wish);
    setReplyingId(null); // Close reply if open
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editName.trim() || !editWish.trim()) {
      alert("Nama dan ucapan tidak boleh kosong.");
      return;
    }
    setIsSaving(true);
    try {
      await dbService.updateRSVP(id, editName, editPresence, editWish);
      setEditingId(null);
      fetchRsvps();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Terjadi kesalahan jaringan.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus ucapan ini?");
    if (!confirmDelete) return;

    const isOwner = myRsvpIds.includes(id);

    try {
      await dbService.deleteRSVP(id, isOwner);
      // Remove from local list if deleted
      if (isOwner) {
        const updated = myRsvpIds.filter(item => item !== id);
        setMyRsvpIds(updated);
        localStorage.setItem('my_rsvp_ids', JSON.stringify(updated));
      }
      fetchRsvps();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Terjadi kesalahan jaringan.");
    }
  };

  const handleLike = async (id: string) => {
    const hasLiked = myLikedIds.includes(id);
    const action = hasLiked ? 'unlike' : 'like';

    try {
      // Optimistic UI update
      setMyLikedIds(prev => {
        let next;
        if (hasLiked) {
          next = prev.filter(likedId => likedId !== id);
        } else {
          next = [...prev, id];
        }
        localStorage.setItem('my_liked_ids', JSON.stringify(next));
        return next;
      });
      setRsvps(prev => prev.map(r => {
        if (r.id === id) {
          return { ...r, likes: Math.max(0, (r.likes || 0) + (hasLiked ? -1 : 1)) };
        }
        return r;
      }));

      await dbService.likeRSVP(id, action);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleLikeReply = async (rsvpId: string, replyId: string) => {
    const hasLiked = myLikedReplyIds.includes(replyId);
    const action = hasLiked ? 'unlike' : 'like';

    try {
      // Optimistic UI
      setMyLikedReplyIds(prev => {
        const next = hasLiked ? prev.filter(id => id !== replyId) : [...prev, replyId];
        localStorage.setItem('my_liked_reply_ids', JSON.stringify(next));
        return next;
      });
      setRsvps(prev => prev.map(r => {
        if (r.id === rsvpId) {
          return {
            ...r,
            replies: (r.replies || []).map(rep => {
              if (rep.id === replyId) {
                return { ...rep, likes: Math.max(0, (rep.likes || 0) + (hasLiked ? -1 : 1)) };
              }
              return rep;
            })
          };
        }
        return r;
      }));

      await dbService.likeReply(rsvpId, replyId, action);
    } catch (err) {
      console.error("Like reply failed", err);
    }
  };

  const startReply = (id: string, targetName: string) => {
    setReplyingId(id);
    setReplyTargetName(targetName);
    setReplyName('');
    setReplyText('');
    setEditingId(null);
    setEditingReplyId(null);
  };

  const cancelReply = () => {
    setReplyingId(null);
    setReplyTargetName('');
  };

  const submitReply = async (id: string) => {
    if (!replyName.trim() || !replyText.trim()) {
      alert("Nama dan balasan tidak boleh kosong.");
      return;
    }
    setIsReplying(true);
    try {
      const newReply = await dbService.addReply(id, replyName, replyText, replyTargetName);
      // Save created reply id locally
      if (newReply && newReply.id) {
        const updatedReplies = [...myReplyIds, newReply.id];
        setMyReplyIds(updatedReplies);
        localStorage.setItem('my_reply_ids', JSON.stringify(updatedReplies));
      }
      setReplyingId(null);
      setReplyTargetName('');
      fetchRsvps();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Terjadi kesalahan jaringan.");
    } finally {
      setIsReplying(false);
    }
  };

  const startEditReply = (rsvpId: string, reply: { id: string; name: string; text: string }) => {
    setEditingReplyId(reply.id);
    setEditReplyName(reply.name);
    setEditReplyText(reply.text);
    setReplyingId(null);
  };

  const cancelEditReply = () => {
    setEditingReplyId(null);
  };

  const handleSaveReplyEdit = async (rsvpId: string, replyId: string) => {
    if (!editReplyName.trim() || !editReplyText.trim()) {
      alert("Nama dan balasan tidak boleh kosong.");
      return;
    }
    setIsSavingReply(true);
    try {
      await dbService.updateReply(rsvpId, replyId, editReplyName, editReplyText);
      setEditingReplyId(null);
      fetchRsvps();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Terjadi kesalahan jaringan.");
    } finally {
      setIsSavingReply(false);
    }
  };

  const handleDeleteReply = async (rsvpId: string, replyId: string) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus balasan ini?");
    if (!confirmDelete) return;

    try {
      await dbService.deleteReply(rsvpId, replyId);
      const updatedReplies = myReplyIds.filter(id => id !== replyId);
      setMyReplyIds(updatedReplies);
      localStorage.setItem('my_reply_ids', JSON.stringify(updatedReplies));
      fetchRsvps();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Terjadi kesalahan jaringan.");
    }
  };

  const formatDistanceToNow = (dateStr: string) => {
    try {
      const past = new Date(dateStr).getTime();
      const now = Date.now();
      const diffMs = now - past;
      
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSecs < 60) return "Baru saja";
      if (diffMins < 60) return `${diffMins} menit lalu`;
      if (diffHours < 24) return `${diffHours} jam lalu`;
      return `${diffDays} hari lalu`;
    } catch (e) {
      return "Baru saja";
    }
  };

  const getPresenceBadge = (status: 'hadir' | 'ragu' | 'tidak_hadir') => {
    switch (status) {
      case 'hadir':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            <Check className="w-2.5 h-2.5 shrink-0" />
            <span>Hadir</span>
          </span>
        );
      case 'ragu':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            <HelpCircle className="w-2.5 h-2.5 shrink-0" />
            <span>Masih Ragu</span>
          </span>
        );
      case 'tidak_hadir':
        return (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-gray-500 bg-gray-50 border border-gray-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
            <X className="w-2.5 h-2.5 shrink-0" />
            <span>Tidak Hadir</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <BookCard id="buku-tamu-container" className="w-full max-w-xl flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#0D5C53]/10 pb-4 relative z-10">
        <div className="flex items-center gap-2 text-[#0D5C53] min-w-0">
          <MessageSquare className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <h3 className="font-serif text-sm sm:text-base md:text-lg font-black leading-tight">Buku Tamu & Ucapan Do’a ({rsvps.length})</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-[#0D5C53]/70 font-bold font-mono uppercase tracking-widest bg-[#0D5C53]/5 px-2.5 py-0.5 rounded-full">
            Realtime
          </span>
        </div>
      </div>

      {/* Wishes Display logic */}
      {isLoading ? (
        <div className="space-y-4 py-8 relative z-10">
          {[1, 2].map((n) => (
            <div key={n} className="animate-pulse space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded-md w-1/3" />
                <div className="h-4 bg-gray-200 rounded-full w-16" />
              </div>
              <div className="h-3 bg-gray-200 rounded-md w-full" />
              <div className="h-3 bg-gray-200 rounded-md w-4/5" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8 text-gray-500 text-xs relative z-10">
          {error}
        </div>
      ) : rsvps.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-xs italic relative z-10">
          Belum ada ucapan doa. Jadilah yang pertama memberikan doa restu Anda!
        </div>
      ) : (
        <div className="max-h-[50vh] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto pr-1 space-y-4 scroll-smooth relative z-10 pb-4">
          <AnimatePresence initial={false}>
            {rsvps.map((rsvp) => {
              const isOwner = myRsvpIds.includes(rsvp.id);
              const isEditing = editingId === rsvp.id;
              const isReplyingNow = replyingId === rsvp.id;
              const hasLiked = myLikedIds.includes(rsvp.id);

              return (
                <motion.div
                  key={rsvp.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#FAFAF7] border border-[#0D5C53]/10 rounded-2xl p-4 md:p-5 shadow-inner flex flex-col gap-3 relative group overflow-hidden"
                >
                  {/* Thin gold lining inside each comment */}
                  <div className="absolute inset-1 border border-[#D4AF37]/15 rounded-[0.9rem] pointer-events-none group-hover:border-[#D4AF37]/35 transition-colors duration-300" />
                  
                  {isEditing ? (
                    /* EDITING FORM INLINE */
                    <div className="flex flex-col gap-3 relative z-10 text-left">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#0D5C53]">Nama Anda</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#0D5C53]">Kehadiran</label>
                        <select
                          value={editPresence}
                          onChange={(e: any) => setEditPresence(e.target.value)}
                          className="w-full text-xs px-2 py-1.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="hadir">Hadir</option>
                          <option value="ragu">Masih Ragu</option>
                          <option value="tidak_hadir">Tidak Hadir</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#0D5C53]">Ucapan / Doa</label>
                        <textarea
                          rows={3}
                          value={editWish}
                          onChange={(e) => setEditWish(e.target.value)}
                          className="w-full text-xs p-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#D4AF37] resize-none"
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-1">
                        <button
                          onClick={cancelEdit}
                          className="text-[10px] font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md"
                        >
                          Batal
                        </button>
                        <button
                          disabled={isSaving}
                          onClick={() => handleSaveEdit(rsvp.id)}
                          className="text-[10px] font-bold text-[#FAFAF7] bg-[#0D5C53] hover:bg-[#09403A] px-3 py-1.5 rounded-md flex items-center gap-1"
                        >
                          {isSaving ? "Menyimpan..." : "Simpan"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* STANDARD CARD VIEW */
                    <>
                      {/* Floating sparkle ornament on group hover */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]/40" />
                      </div>

                      {/* Name & status row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0D5C53]/15 pb-2.5 relative z-10">
                        <h4 className="text-sm font-bold text-[#0D5C53] capitalize flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          <span>{rsvp.name}</span>
                          {isOwner && (
                            <span className="text-[9px] font-bold text-[#0D5C53] bg-[#0D5C53]/10 px-2 py-0.5 rounded-md">
                              Saya
                            </span>
                          )}
                        </h4>
                        {getPresenceBadge(rsvp.presence)}
                      </div>

                      {/* Wish content text */}
                      <p className="text-sm text-slate-800 leading-relaxed font-medium relative z-10 text-left">
                        {rsvp.wish}
                      </p>

                      {/* Replies List */}
                      {rsvp.replies && rsvp.replies.length > 0 && (
                        <div className="relative z-10 mt-2 pl-3.5 border-l-2 border-[#D4AF37]/40 space-y-3">
                          {rsvp.replies.map(reply => {
                            const isMyReply = myReplyIds.includes(reply.id);
                            const isEditingReply = editingReplyId === reply.id;

                            return (
                              <div key={reply.id} className="text-left space-y-1 bg-[#F5F5EF]/60 p-2.5 rounded-xl border border-[#0D5C53]/5">
                                {isEditingReply ? (
                                  /* Inline Edit Reply Form */
                                  <div className="space-y-2 pt-1">
                                    <input
                                      type="text"
                                      value={editReplyName}
                                      onChange={(e) => setEditReplyName(e.target.value)}
                                      className="w-full text-xs px-2.5 py-1 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#D4AF37]"
                                      placeholder="Nama Anda"
                                    />
                                    <textarea
                                      rows={2}
                                      value={editReplyText}
                                      onChange={(e) => setEditReplyText(e.target.value)}
                                      className="w-full text-xs p-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#D4AF37] resize-none"
                                      placeholder="Ketik balasan..."
                                    />
                                    <div className="flex justify-end gap-1.5">
                                      <button
                                        onClick={cancelEditReply}
                                        className="text-[10px] font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded cursor-pointer"
                                      >
                                        Batal
                                      </button>
                                      <button
                                        disabled={isSavingReply}
                                        onClick={() => handleSaveReplyEdit(rsvp.id, reply.id)}
                                        className="text-[10px] font-bold text-white bg-[#0D5C53] hover:bg-[#09403A] px-2.5 py-1 rounded cursor-pointer"
                                      >
                                        {isSavingReply ? "Menyimpan..." : "Simpan"}
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex flex-wrap items-center justify-between gap-1">
                                      <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="text-xs font-bold text-[#0D5C53]">{reply.name}</span>
                                        {reply.replyToName && (
                                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded font-mono">
                                            <span>▸</span>
                                            <span>{reply.replyToName}</span>
                                          </span>
                                        )}
                                        <span className="text-[10px] text-slate-400 font-mono tracking-wide font-medium">
                                          • {formatDistanceToNow(reply.createdAt)}
                                        </span>
                                      </div>

                                      {/* Reply Edit / Delete controls */}
                                      {(isMyReply || isOwner) && (
                                        <div className="flex gap-2 text-[10px] text-slate-400 font-bold ml-auto">
                                          <button
                                            onClick={() => startEditReply(rsvp.id, reply)}
                                            className="hover:text-[#0D5C53] cursor-pointer transition-colors"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            onClick={() => handleDeleteReply(rsvp.id, reply.id)}
                                            className="hover:text-red-600 cursor-pointer transition-colors"
                                          >
                                            Hapus
                                          </button>
                                        </div>
                                      )}
                                    </div>

                                    <p className="text-xs text-slate-700 font-medium leading-relaxed">{reply.text}</p>

                                    <div className="flex items-center justify-between gap-2 pt-1">
                                      {/* Like button on reply */}
                                      <button
                                        onClick={() => handleLikeReply(rsvp.id, reply.id)}
                                        className={`flex items-center gap-0.5 text-[10px] font-bold transition-colors py-0.5 px-1 rounded hover:bg-red-50 ${
                                          myLikedReplyIds.includes(reply.id)
                                            ? 'text-red-500 cursor-pointer'
                                            : 'text-slate-400 hover:text-red-500 cursor-pointer'
                                        }`}
                                      >
                                        <Heart className={`w-3 h-3 ${myLikedReplyIds.includes(reply.id) ? 'fill-red-500' : ''}`} />
                                        <span>{reply.likes || 0}</span>
                                      </button>

                                      {/* Balas sub-comment */}
                                      <button
                                        onClick={() => startReply(rsvp.id, reply.name)}
                                        className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-[#0D5C53] cursor-pointer transition-colors"
                                      >
                                        <MessageCircle className="w-3 h-3" />
                                        <span>Balas {reply.name}</span>
                                      </button>

                                      {/* Hapus balasan sendiri */}
                                      {isMyReply && (
                                        <button
                                          onClick={() => handleDeleteReply(rsvp.id, reply.id)}
                                          className="text-[10px] font-bold text-slate-400 hover:text-red-600 cursor-pointer transition-colors ml-auto"
                                        >
                                          Hapus
                                        </button>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Reply form inline */}
                      {isReplyingNow && (
                        <div className="relative z-10 bg-white border border-[#D4AF37]/35 p-3.5 rounded-xl mt-3 text-left space-y-2.5 shadow-sm">
                           {replyTargetName && (
                             <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                               <span>Membalas <strong className="text-[#0D5C53]">{replyTargetName}</strong></span>
                             </div>
                           )}
                           <input
                              type="text"
                              placeholder="Nama Anda"
                              value={replyName}
                              onChange={(e) => setReplyName(e.target.value)}
                              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25 font-medium text-slate-800"
                            />
                            <textarea
                              rows={2.5}
                              placeholder="Ketik balasan Anda..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/25 font-medium text-slate-800 resize-none"
                            />
                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                onClick={cancelReply}
                                className="text-xs font-bold text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-all cursor-pointer"
                              >
                                Batal
                              </button>
                              <button
                                disabled={isReplying}
                                onClick={() => submitReply(rsvp.id)}
                                className="text-xs font-bold text-[#FAFAF7] bg-[#D4AF37] hover:bg-[#B99131] px-4 py-1.5 rounded-md transition-all shadow-sm cursor-pointer"
                              >
                                {isReplying ? "Mengirim..." : "Kirim Balasan"}
                              </button>
                            </div>
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="flex justify-between items-center text-xs relative z-10 mt-2 border-t border-[#0D5C53]/5 pt-2.5">
                        <div className="flex items-center gap-3.5">
                           {/* Format Date */}
                           <span className="text-[10px] text-slate-500 font-semibold font-mono tracking-wide">
                             {formatDistanceToNow(rsvp.createdAt)}
                           </span>

                           {/* Like Button */}
                           <button 
                             onClick={() => handleLike(rsvp.id)}
                             className={`flex items-center gap-1 font-bold text-xs transition-colors py-1 px-1.5 rounded-md hover:bg-red-50 ${hasLiked ? 'text-red-500 hover:text-red-600 cursor-pointer' : 'text-slate-400 hover:text-red-500 cursor-pointer'}`}
                           >
                             <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-red-500' : ''}`} />
                             <span>{rsvp.likes || 0}</span>
                           </button>

                           {/* Balas Button */}
                           <button 
                             onClick={() => startReply(rsvp.id, rsvp.name)}
                             className="flex items-center gap-1 text-slate-400 hover:text-[#0D5C53] hover:bg-emerald-50 py-1 px-1.5 rounded-md cursor-pointer font-bold text-xs transition-colors"
                           >
                             <MessageCircle className="w-3.5 h-3.5" />
                             <span>Balas</span>
                           </button>
                        </div>

                        {/* Owner Controls */}
                        {isOwner && (
                          <div className="flex gap-3 text-slate-400 font-bold text-xs">
                            <button
                              onClick={() => startEdit(rsvp)}
                              className="hover:text-[#0D5C53] cursor-pointer transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(rsvp.id)}
                              className="hover:text-red-600 cursor-pointer transition-colors"
                            >
                              Hapus
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </BookCard>
  );
}
