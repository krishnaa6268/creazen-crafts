// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Firebase config
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

// Handle login
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login successful!");
      console.log("Logged in user:", userCredential.user);
      // Redirect to dashboard or another page
       window.location.href = "home.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
      console.error("Error Code:", error.code);
    });
});
