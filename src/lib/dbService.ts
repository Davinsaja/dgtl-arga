import { db, isFirebaseEnabled } from './firebase';
import { 
  collection, 
  getDocs, 
  getDoc,
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  arrayUnion,
  increment
} from 'firebase/firestore';
import { RSVP, RSVPReply } from '../types';

// Helper to prevent database operations from hanging indefinitely if Firestore is not provisioned or configured
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 2500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Firebase operation timed out')), timeoutMs)
    )
  ]);
}

export const dbService = {
  // 1. Get All RSVPs
  async getRSVPs(): Promise<RSVP[]> {
    if (isFirebaseEnabled && db) {
      try {
        const rsvpsRef = collection(db, 'rsvps');
        const q = query(rsvpsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await withTimeout(getDocs(q));
        
        const rsvps: RSVP[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          rsvps.push({
            id: doc.id,
            name: data.name || '',
            presence: data.presence || 'hadir',
            wish: data.wish || '',
            createdAt: data.createdAt || new Date().toISOString(),
            likes: data.likes || 0,
            replies: data.replies || []
          });
        });
        return rsvps;
      } catch (err) {
        console.error("Firebase getRSVPs error, falling back to local api:", err);
      }
    }

    // Fallback to Local API
    const res = await fetch('/api/rsvps');
    const json = await res.json();
    if (json.success) {
      return json.data || [];
    }
    throw new Error(json.error || "Gagal memuat rsvp");
  },

  // 2. Add New RSVP
  async addRSVP(name: string, presence: 'hadir' | 'ragu' | 'tidak_hadir', wish: string): Promise<RSVP> {
    const cleanName = name.trim();
    const cleanWish = wish.trim();
    const createdAt = new Date().toISOString();

    if (isFirebaseEnabled && db) {
      try {
        const rsvpsRef = collection(db, 'rsvps');
        const docRef = await withTimeout(addDoc(rsvpsRef, {
          name: cleanName,
          presence,
          wish: cleanWish,
          createdAt,
          likes: 0,
          replies: []
        }));
        return {
          id: docRef.id,
          name: cleanName,
          presence,
          wish: cleanWish,
          createdAt,
          likes: 0,
          replies: []
        };
      } catch (err) {
        console.error("Firebase addRSVP error:", err);
      }
    }

    // Fallback to Local API
    const response = await fetch('/api/rsvps', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cleanName, presence, wish: cleanWish })
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || "Gagal menyimpan rsvp");
  },

  // 3. Update Existing RSVP (Self-edit)
  async updateRSVP(id: string, name: string, presence: 'hadir' | 'ragu' | 'tidak_hadir', wish: string): Promise<void> {
    const cleanName = name.trim();
    const cleanWish = wish.trim();

    if (isFirebaseEnabled && db) {
      try {
        const docRef = doc(db, 'rsvps', id);
        await withTimeout(updateDoc(docRef, {
          name: cleanName,
          presence,
          wish: cleanWish,
          updatedAt: new Date().toISOString()
        }));
        return;
      } catch (err) {
        console.error("Firebase updateRSVP error:", err);
      }
    }

    // Fallback to Local API
    const response = await fetch(`/api/rsvps/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cleanName, presence, wish: cleanWish })
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Gagal memperbarui rsvp");
    }
  },

  // 4. Delete RSVP (Self-delete)
  async deleteRSVP(id: string, isOwner: boolean): Promise<void> {
    if (isFirebaseEnabled && db) {
      try {
        const docRef = doc(db, 'rsvps', id);
        await withTimeout(deleteDoc(docRef));
        return;
      } catch (err) {
        console.error("Firebase deleteRSVP error:", err);
      }
    }

    // Fallback to Local API
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (isOwner) headers['x-is-owner'] = 'true';

    const response = await fetch(`/api/rsvps/${id}`, {
      method: 'DELETE',
      headers
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Gagal menghapus rsvp");
    }
  },

  // 5. Like/Unlike RSVP
  async likeRSVP(id: string, action: 'like' | 'unlike'): Promise<void> {
    if (isFirebaseEnabled && db) {
      try {
        const docRef = doc(db, 'rsvps', id);
        await withTimeout(updateDoc(docRef, {
          likes: increment(action === 'unlike' ? -1 : 1)
        }));
        return;
      } catch (err) {
        console.error("Firebase likeRSVP error:", err);
      }
    }

    // Fallback to Local API
    const response = await fetch(`/api/rsvps/${id}/like`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Gagal menyukai");
    }
  },

  // 6. Add Reply to RSVP
  async addReply(rsvpId: string, name: string, text: string, replyToName?: string): Promise<RSVPReply> {
    const cleanName = name.trim();
    const cleanText = text.trim();
    const cleanReplyTo = replyToName?.trim();
    const createdAt = new Date().toISOString();
    const replyId = Math.random().toString(36).substring(2, 11);

    const newReply: RSVPReply = {
      id: replyId,
      name: cleanName,
      text: cleanText,
      createdAt,
      ...(cleanReplyTo ? { replyToName: cleanReplyTo } : {})
    };

    if (isFirebaseEnabled && db) {
      try {
        const docRef = doc(db, 'rsvps', rsvpId);
        await withTimeout(updateDoc(docRef, {
          replies: arrayUnion(newReply)
        }));
        return newReply;
      } catch (err) {
        console.error("Firebase addReply error:", err);
      }
    }

    // Fallback to Local API
    const response = await fetch(`/api/rsvps/${rsvpId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cleanName, text: cleanText, replyToName: cleanReplyTo })
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || "Gagal menambahkan balasan");
  },

  // 7. Update Reply
  async updateReply(rsvpId: string, replyId: string, name: string, text: string): Promise<void> {
    const cleanName = name.trim();
    const cleanText = text.trim();

    if (isFirebaseEnabled && db) {
      try {
        const docRef = doc(db, 'rsvps', rsvpId);
        const docSnap = await withTimeout(getDoc(docRef));
        if (docSnap.exists()) {
          const data = docSnap.data();
          const replies: RSVPReply[] = data.replies || [];
          const updated = replies.map(r => {
            if (r.id === replyId) {
              return { ...r, name: cleanName, text: cleanText };
            }
            return r;
          });
          await withTimeout(updateDoc(docRef, { replies: updated }));
          return;
        }
      } catch (err) {
        console.error("Firebase updateReply error:", err);
      }
    }

    // Fallback to Local API
    const response = await fetch(`/api/rsvps/${rsvpId}/reply/${replyId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cleanName, text: cleanText })
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Gagal memperbarui balasan");
    }
  },

  // 8. Delete Reply
  async deleteReply(rsvpId: string, replyId: string): Promise<void> {
    if (isFirebaseEnabled && db) {
      try {
        const docRef = doc(db, 'rsvps', rsvpId);
        const docSnap = await withTimeout(getDoc(docRef));
        if (docSnap.exists()) {
          const data = docSnap.data();
          const replies: RSVPReply[] = data.replies || [];
          const filtered = replies.filter(r => r.id !== replyId);
          await withTimeout(updateDoc(docRef, { replies: filtered }));
          return;
        }
      } catch (err) {
        console.error("Firebase deleteReply error:", err);
      }
    }

    // Fallback to Local API
    const response = await fetch(`/api/rsvps/${rsvpId}/reply/${replyId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Gagal menghapus balasan");
    }
  }
};
