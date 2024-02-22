// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { View, Text } from 'react-native'
import React from 'react'
import { orderBy, getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


////MUISTA TEHDÄ DOTENV-TIEDOSTO!!!!!!!!!!!!!!!!!!!!!!!!!!

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID
  
  }
// const firebaseConfig = {
//   apiKey: "AIzaSyClPvQxDQXt2XKDcaJp4F5YOgOIq_ekaAQ",
//   authDomain: "sovellus-c0986.firebaseapp.com",
//   projectId: "sovellus-c0986",
//   storageBucket: "sovellus-c0986.appspot.com",
//   messagingSenderId: "731794033893",
//   appId: "1:731794033893:web:0526924379af7d9d54580c"
// };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firestore = getFirestore();
//const firestore = getFirestore(app);


//initializeApp(firebaseConfig);

//const firestore = getFirestore();
const MESSAGES = 'messages';

export {
  firestore,
  app,
  collection,
  addDoc,
  MESSAGES,
  serverTimestamp,
  query,
  onSnapshot,
  getFirestore,
  orderBy,
  signInWithEmailAndPassword,
  getAuth,
}