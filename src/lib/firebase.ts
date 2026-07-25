/// <reference types="vite/client" />

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

export const isFirebaseEnabled = !!(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID
);

let dbInstance: any = null;

export async function getFirestoreDb() {
  if (!isFirebaseEnabled) return null;
  if (dbInstance) return dbInstance;

  try {
    const { initializeApp, getApps, getApp } = await import('firebase/app');
    const { getFirestore } = await import('firebase/firestore');
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    dbInstance = getFirestore(app);
    return dbInstance;
  } catch (e) {
    console.error("Failed to dynamically load Firebase:", e);
    return null;
  }
}

