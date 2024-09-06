import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chat-app-373d5.firebaseapp.com",
  projectId: "chat-app-373d5",
  storageBucket: "chat-app-373d5.appspot.com",
  messagingSenderId: "89143671096",
  appId: "1:89143671096:web:4d38a2a3bf657e7003a9cd",
  measurementId: "G-KWF3V3M5WV",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
