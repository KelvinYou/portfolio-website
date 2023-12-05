// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getMessaging } from "firebase/messaging";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { 
  getStorage,
  ref
 } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3i-JH5CEcf-JPah5js0DtwyT7Rghg3Jw",
  authDomain: "portfolio-c77c3.firebaseapp.com",
  projectId: "portfolio-c77c3",
  storageBucket: "portfolio-c77c3.appspot.com",
  messagingSenderId: "903048618894",
  appId: "1:903048618894:web:c9fe12e6f877ae78337adf",
  measurementId: "G-8MF0WJ8KWV"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(Firebase);
export const auth = getAuth();
export const Providers = { google: new GoogleAuthProvider() };
export const db = getFirestore(Firebase);
export const storage = getStorage(Firebase);

// const messaging = getMessaging(Firebase);