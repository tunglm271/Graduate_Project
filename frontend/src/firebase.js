import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDVltaAHqQkufYGI0rCTm2Gvf6mElEaC1I",
    authDomain: "docify-9b17f.firebaseapp.com",
    projectId: "docify-9b17f",
    storageBucket: "docify-9b17f.firebasestorage.app",
    messagingSenderId: "1005909776248",
    appId: "1:1005909776248:web:e7afc30beee40a33bc1a8d",
    measurementId: "G-WVZ5P9ZT0F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
