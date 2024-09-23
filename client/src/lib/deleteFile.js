import { getStorage, ref, deleteObject } from "firebase/storage";
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

const storage = getStorage();

// Create a reference to the file to delete

// Delete the file
export const deleteFile = (imgurl) => {
  return new Promise((resolve, reject) => {
    const desertRef = ref(storage, "/images/" + imgurl + ".jpg");
    deleteObject(desertRef)
      .then(() => {
        resolve("successfully deleted");
      })
      .catch((error) => {
        reject(error);
      });
  });
};
