// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "swaad-sutra-accab.firebaseapp.com",
  projectId: "swaad-sutra-accab",
  storageBucket: "swaad-sutra-accab.firebasestorage.app",
  messagingSenderId: "885687500053",
  appId: "1:885687500053:web:c77985cfaca67f85edfd1c",
  measurementId: "G-M43FBY2EHS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
