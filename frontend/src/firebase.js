import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUx9dt1net66Eif6l3uQFKgZfJkHRCqmE",
    authDomain: "mini-ecomm-website.firebaseapp.com",
    projectId: "mini-ecomm-website",
    storageBucket: "mini-ecomm-website.firebasestorage.app",
    messagingSenderId: "767987913481",
    appId: "1:767987913481:web:a23e562e555e8fffc0b9d8",
    measurementId: "G-FVD5SWCX7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export default app;
