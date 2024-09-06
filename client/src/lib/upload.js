import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
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

const upload = (file) => {
  if (file) {
    const storage = getStorage();
    const rename = crypto.randomUUID();
    const storageRef = ref(storage, `images/${rename}.jpg`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({ downloadURL, rename });
          });
        }
      );
    });
  }
};
export default upload;
