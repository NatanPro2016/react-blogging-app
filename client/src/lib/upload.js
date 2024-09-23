import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCbn2nfbjqWCQOLRmrJh5BqaOn0X49ddHk",
  authDomain: "the-socal-vibe.firebaseapp.com",
  projectId: "the-socal-vibe",
  storageBucket: "the-socal-vibe.appspot.com",
  messagingSenderId: "361371583429",
  appId: "1:361371583429:web:01ccf5d540ecfcf09d81ac",
  measurementId: "G-XE4D2Z2WEB",
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
