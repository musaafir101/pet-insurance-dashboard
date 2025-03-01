// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9vLNxvr5CKDFHzZ4oQ1foav2VRimTb0o",
  authDomain: "pet-insurance-chat.firebaseapp.com",
  projectId: "pet-insurance-chat",
  storageBucket: "pet-insurance-chat.firebasestorage.app",
  messagingSenderId: "870781456657",
  appId: "1:870781456657:web:fd9b70352bc91d099abcb0",
  measurementId: "G-RDCV4MRRHD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
