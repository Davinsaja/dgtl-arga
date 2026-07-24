/// <reference types="vite/client" />
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Pastikan Anda mengisi kredensial ini di file .env lokal Anda atau di Environment Variables Vercel
// dengan nama VITE_FIREBASE_...
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Deteksi apakah konfigurasi Firebase sudah dimasukkan
const isFirebaseEnabled = !!(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

const app = isFirebaseEnabled 
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null;

export const db = app ? getFirestore(app) : null;
export { isFirebaseEnabled };
