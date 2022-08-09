// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyLzv93R2ElLC2pcoz6U58ltmaC3wuY7s",
  authDomain: "biz-club-edf15.firebaseapp.com",
  projectId: "biz-club-edf15",
  storageBucket: "biz-club-edf15.appspot.com",
  messagingSenderId: "444938755813",
  appId: "1:444938755813:web:0187464e9873d850d57e0c",
  measurementId: "G-8MM66XBX9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
