import { getStorage, ref, deleteObject } from "firebase/storage";
import { initializeApp } from "firebase/app";

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

const storage = getStorage();

// Create a reference to the file to delete

// Delete the file
export const deleteFile = (imgurl) => {
  return new Promise((resolve, reject) => {
    const desertRef = ref(storage, "/images/" + imgurl +'.jpg');
    deleteObject(desertRef)
      .then(() => {
        resolve("successfully deleted");
      })
      .catch((error) => {
        reject(error);
      });
  });
};
