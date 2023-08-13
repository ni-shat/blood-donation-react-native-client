// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
// import {getAnalytics} from 'firebase/analytics';
// import Constants from 'expo-constants'


const firebaseConfig = {
  apiKey: "AIzaSyDIU6xhviK_mm05hOy1ZGdYoRpBOIVrkxk",
  authDomain: "tutor-finding-auth.firebaseapp.com",
  projectId: "tutor-finding-auth",
  storageBucket: "tutor-finding-auth.appspot.com",
  messagingSenderId: "999774288892",
  appId: "1:999774288892:web:875b463127b3ed67bf5079"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);