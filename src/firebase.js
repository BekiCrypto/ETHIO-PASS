// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

// Your web app's Firebase configuration is read from environment variables.
// See DOCUMENTATION.md for instructions on how to set this up.
const firebaseConfig = {
  apiKey: "AIzaSyC6HsAT9a7Pv-EXNKm22I88wPEFwSfdOy4",
  authDomain: "aman-id-jrp0c.firebaseapp.com",
  projectId: "aman-id-jrp0c",
  storageBucket: "aman-id-jrp0c.firebasestorage.app",
  messagingSenderId: "1076701868214",
  appId: "1:1076701868214:web:276c44fab593a156feb617"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
