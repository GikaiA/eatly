/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYisIdx2U-x6f5hl16Nfqpx0Dd4UVURBg",
  authDomain: "eatly-5a571.firebaseapp.com",
  projectId: "eatly-5a571",
  storageBucket: "eatly-5a571.firebasestorage.app",
  messagingSenderId: "304652301963",
  appId: "1:304652301963:web:e4502d6fa7829bc85cc68e",
  measurementId: "G-KSWVJKFB9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);