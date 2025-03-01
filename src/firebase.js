// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAJ047tp775JpRRZ8kS6LPqJ7UM1Ubj0M",
  authDomain: "job-board-app-d5c69.firebaseapp.com",
  projectId: "job-board-app-d5c69",
  storageBucket: "job-board-app-d5c69.firebasestorage.app",
  messagingSenderId: "456797519574",
  appId: "1:456797519574:web:fcb690bce0baa096a3d377",
  measurementId: "G-Z1W4CDJQFH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
