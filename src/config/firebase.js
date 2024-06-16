// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjFQRYtcqQqerBsLylqT7OkwHHkLa5f7eg",
  authDomain: "order-menu-1c524.firebaseapp.com",
  databaseURL: "https://order-menu-1c524.firebaseio.com",
  projectId: "order-menu-1c524",
  storageBucket: "order-menu-1c524.appspot.com",
  messagingSenderId: "835924421918",
  appId: "1:835924421918:web:4174aa0c1f85e128836d0f",
  measurementId: "G-XK6B5DM9C8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Data = getFirestore(app);

export { app, Data };
