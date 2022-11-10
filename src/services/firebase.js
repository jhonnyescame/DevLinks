// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDA2dms8iK6fQEDj0o4HB35YWtvusvMQ4k",
  authDomain: "devlinks-24f7d.firebaseapp.com",
  projectId: "devlinks-24f7d",
  storageBucket: "devlinks-24f7d.appspot.com",
  messagingSenderId: "823172313925",
  appId: "1:823172313925:web:28fc47b05b10352d00442c",
  measurementId: "G-3QHNNR93TW"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

export { db, auth};