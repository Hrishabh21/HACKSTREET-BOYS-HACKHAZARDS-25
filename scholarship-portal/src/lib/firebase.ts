import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  enableIndexedDbPersistence,
  Firestore
} from "firebase/firestore";

const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  console.warn(
    "[Firebase Config] Missing environment variables:",
    missingEnvVars.join(", ")
  );
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth instance
export const auth = getAuth(app);

// Firestore instance with single initialization guard
let db: Firestore;
try {
  db = getFirestore(app); // safer than initializeFirestore if already called
} catch (error) {
  // fallback in case getFirestore fails (unlikely)
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
    experimentalForceLongPolling: true,
  });
}

// Optional: Try to enable IndexedDB for offline support
enableIndexedDbPersistence(db).catch((err) => {
  console.warn("IndexedDB persistence could not be enabled:", err.code);
});

export { db };
export default app;
export const firebaseApp = app; // Export the initialized app for other uses
export const firebaseAuth = auth; // Export the auth instance for other uses
