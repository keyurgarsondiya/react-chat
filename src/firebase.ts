// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAqOWi8UJ69PebNxiarpX7sVk543FZaJps',
  authDomain: 'react-chat-3e492.firebaseapp.com',
  projectId: 'react-chat-3e492',
  storageBucket: 'react-chat-3e492.firebasestorage.app',
  messagingSenderId: '1031585893952',
  appId: '1:1031585893952:web:ace4c8902ff6801cd319a5',
  measurementId: 'G-2ZSRGBY24X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
