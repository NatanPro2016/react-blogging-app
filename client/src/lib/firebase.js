import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbn2nfbjqWCQOLRmrJh5BqaOn0X49ddHk",
  authDomain: "the-socal-vibe.firebaseapp.com",
  projectId: "the-socal-vibe",
  storageBucket: "the-socal-vibe.appspot.com",
  messagingSenderId: "361371583429",
  appId: "1:361371583429:web:01ccf5d540ecfcf09d81ac",
  measurementId: "G-XE4D2Z2WEB"
};



const app = initializeApp(firebaseConfig);
export const storage = getStorage();
