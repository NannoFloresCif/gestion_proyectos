import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSwyJCv8gxwhm5f5aGgl7T1fGxh7xgRNQ",
  authDomain: "gestordeprotectos.firebaseapp.com",
  projectId: "gestordeprotectos",
  storageBucket: "gestordeprotectos.firebasestorage.app",
  messagingSenderId: "1006685811861",
  appId: "1:1006685811861:web:8f161adfaf1269214ad79c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const functions = getFunctions(app);