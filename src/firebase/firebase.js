
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtiWWVocGTcfntCFoxB-bih9EYdv_J8N0",
  authDomain: "admin-panel-5cd6f.firebaseapp.com",
  projectId: "admin-panel-5cd6f",
  storageBucket: "admin-panel-5cd6f.firebasestorage.app",
  messagingSenderId: "237518877683",
  appId: "1:237518877683:web:658867662ec7cc50c51886",
  measurementId: "G-3XG59VVZ8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};