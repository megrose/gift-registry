import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Add this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXG7zBBaPxHhMIBVwj64rX6r7hn7evjww",
  authDomain: "gift-registry-aa2ed.firebaseapp.com",
  projectId: "gift-registry-aa2ed",
  storageBucket: "gift-registry-aa2ed.firebasestorage.app",
  messagingSenderId: "881822940647",
  appId: "1:881822940647:web:82a3561cdc43006e999142",
  measurementId: "G-0SQV2H0NYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // Add this line
export default app;