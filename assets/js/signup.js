// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5YL7LktgQdo3uh3m3t2M9BWtsOfbBxtM",
  authDomain: "reazen-login.firebaseapp.com",
  projectId: "reazen-login",
  storageBucket: "reazen-login.firebasestorage.app",
  messagingSenderId: "202636759634",
  appId: "1:202636759634:web:99da0ab205e2d1420b458b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup form event
document.getElementById("signup-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Account created successfully!");
      console.log("User:", userCredential.user);
    })
    .catch((error) => {
      alert("Error: " + error.message);
      console.error("Error Code:", error.code);
    });
});
