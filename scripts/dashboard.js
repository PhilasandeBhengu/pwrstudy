// dashboard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
  const welcomeMessageElement = document.getElementById("welcome-message");
  const studyHoursElement = document.getElementById("study-hours");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const username = userData.username || "User";
          const studyHours = userData.studyHours || 0;

          // Update welcome message
          welcomeMessageElement.textContent = `Welcome, ${username}`;

          // Update study hours
          studyHoursElement.textContent = `${studyHours.toFixed(2)} hours`;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      // No user is signed in
      welcomeMessageElement.textContent = "Welcome, Guest";
    }
  });

  // Example for initializing a Chart.js chart
  const ctx = document
    .getElementById("subject-performance-chart")
    .getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Math", "Science", "History", "English"],
      datasets: [
        {
          label: "Scores",
          data: [75, 80, 90, 70],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
