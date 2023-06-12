import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRm1BQWOdnx6_F1iq39_QPm354BP4-SB0",
  authDomain: "rn-instagram-clone-by-john.firebaseapp.com",
  projectId: "rn-instagram-clone-by-john",
  storageBucket: "rn-instagram-clone-by-john.appspot.com",
  messagingSenderId: "601385022227",
  appId: "1:601385022227:web:2cc5ea3d7d9ebf00fb20e6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app);