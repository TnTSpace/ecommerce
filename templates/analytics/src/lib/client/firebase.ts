import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyAuDUeMHl7uOx_f0WLDjLJUIaIspE0IvkY",
  authDomain: "jumia-traffic-ops.firebaseapp.com",
  projectId: "jumia-traffic-ops",
  storageBucket: "jumia-traffic-ops.firebasestorage.app",
  messagingSenderId: "480612824840",
  appId: "1:480612824840:web:731ccaa3fbd20205d7debd",
  measurementId: "G-LNB3H836SQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);