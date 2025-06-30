// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

// Your web app's Firebase configuration is read from environment variables.
// See DOCUMENTATION.md for instructions on how to set this up.
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
=======
  apiKey: "AIzaSyC6HsAT9a7Pv-EXNKm22I88wPEFwSfdOy4",
  authDomain: "aman-id-jrp0c.firebaseapp.com",
  projectId: "aman-id-jrp0c",
  storageBucket: "aman-id-jrp0c.firebasestorage.app",
  messagingSenderId: "1076701868214",
  appId: "1:1076701868214:web:276c44fab593a156feb617"
>>>>>>> b1de4720895e1fe19e129547465a8dee099d7641
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
