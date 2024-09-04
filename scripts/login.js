// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  doc,
  getDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { initializeFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAWR4lWo6LSKjordCq7HrgrGZKSSG0BAs",
  authDomain: "pwr-study-6e3e8.firebaseapp.com",
  projectId: "pwr-study-6e3e8",
  storageBucket: "pwr-study-6e3e8.appspot.com",
  messagingSenderId: "485315858881",
  appId: "1:485315858881:web:2663df43dfd3f9e978df40",
  measurementId: "G-752T2MCPMT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true, // Use this to dynamically handle network conditions
});

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (!loginForm) {
    console.error("Login form not found");
    return;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Debugging: Log email and password
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if user details exist in the Firestore database
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        // User details exist, redirect to dashboard
        console.log(
          "User authenticated and details found. Redirecting to dashboard..."
        );
        window.location.href = "http://127.0.0.1:5500/dashboard.html";
      } else {
        // Handle case where user details do not exist
        console.warn("User details not found in the database.");
        alert("User details not found in the database.");
      }
    } catch (error) {
      // Improved error handling
      console.error("Error signing in:", error.message);
      if (error.code === "auth/user-not-found") {
        alert("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format. Please enter a valid email address.");
      } else {
        alert(
          "Failed to sign in. Please check your credentials and try again."
        );
      }
    }
  });
});
