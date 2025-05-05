// Import Firebase core and Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK5-oXB1EhbQU33vl57YUTrBWuGw5DoJc",
  authDomain: "fir-240fc.firebaseapp.com",
  projectId: "fir-240fc",
  storageBucket: "fir-240fc.appspot.com", // ✅ fixed typo: ".app" → ".appspot.com"
  messagingSenderId: "593184966420",
  appId: "1:593184966420:web:69f1334e3b51dab454e401",
  measurementId: "G-ELTMS7PENW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional

// ✅ Correctly initialize and export Firestore
export const db = getFirestore(app);
