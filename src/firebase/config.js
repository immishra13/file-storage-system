import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD4M9x9ztQS_BYz9U6qysaNs7BssBQ8HNE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cloud-mini-project-10b6f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cloud-mini-project-10b6f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cloud-mini-project-10b6f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1079090725301",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1079090725301:web:4e467082d4cdc3ddabd9fc",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-N49C3Y04JH"
};

if (!firebaseConfig.apiKey) {
  console.error("Firebase API Key is missing! Check your environment variables.");
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
