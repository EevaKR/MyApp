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
  apiKey: "AIzaSyClPvQxDQXt2XKDcaJp4F5YOgOIq_ekaAQ",
  authDomain: "sovellus-c0986.firebaseapp.com",
  projectId: "sovellus-c0986",
  storageBucket: "sovellus-c0986.appspot.com",
  messagingSenderId: "731794033893",
  appId: "1:731794033893:web:0526924379af7d9d54580c"
};

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