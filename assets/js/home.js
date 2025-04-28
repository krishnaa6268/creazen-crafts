// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Firebase configuration (same as before)
const firebaseConfig = {
  apiKey: "AIzaSyA5YL7LktgQdo3uh3m3t2M9BWtsOfbBxtM",
  authDomain: "reazen-login.firebaseapp.com",
  projectId: "reazen-login",
  storageBucket: "reazen-login.firebasestorage.app",
  messagingSenderId: "202636759634",
  appId: "1:202636759634:web:99da0ab205e2d1420b458b",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      // Optional: Redirect to login page after logout
      window.location.href = "login.html"; 
    })
    .catch((error) => {
      alert("Logout failed: " + error.message);
    });
});
