// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
// import {getAnalytics} from 'firebase/analytics';
// import Constants from 'expo-constants'


const firebaseConfig = {
  apiKey: "AIzaSyDG_XwR5ca2ztiVB3NYTL6BbaTZDN80YNE",
  authDomain: "blood-donation-auth.firebaseapp.com",
  projectId: "blood-donation-auth",
  storageBucket: "blood-donation-auth.appspot.com",
  messagingSenderId: "279780151710",
  appId: "1:279780151710:web:228f70f14f6348d5f8068f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);