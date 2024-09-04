import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDAWR4lWo6LSKjordCq7HrgrGZKSSG0BAs",
  authDomain: "pwr-study-6e3e8.firebaseapp.com",
  projectId: "pwr-study-6e3e8",
  storageBucket: "pwr-study-6e3e8.appspot.com",
  messagingSenderId: "485315858881",
  appId: "1:485315858881:web:2663df43dfd3f9e978df40",
  measurementId: "G-752T2MCPMT",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle the signup form submission
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create a new user with Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Save additional user details in Firestore
        return setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          createdAt: new Date(),
        });
      })
      .then(() => {
        // Redirect to the dashboard (or any other page)
        window.location.href = "/index.html";
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        alert(error.message);
      });
  });
