// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration from console
const firebaseConfig = {
    apiKey: "AIzaSyA09okBtQ39qUSSx3go6SaUcl3ndXxCQPc",
  authDomain: "assesment-c988c.firebaseapp.com",
  projectId: "assesment-c988c",
  storageBucket: "assesment-c988c.firebasestorage.app",
  messagingSenderId: "12827696600",
  appId: "1:12827696600:web:c3c731d90d8e1a8e2b66ad",
  measurementId: "G-G0TN8RRS1N",
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
