import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where, addDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyABwhg9mYTl5O177eIYsXYKU8jmPsCTO6s",
    authDomain: "my-blog-lol.firebaseapp.com",
    projectId: "my-blog-lol",
    storageBucket: "my-blog-lol.appspot.com",
    messagingSenderId: "503051123538",
    appId: "1:503051123538:web:8b8a5b213d5ff18f02588b"
  };

// lấy trong firebase fr
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

