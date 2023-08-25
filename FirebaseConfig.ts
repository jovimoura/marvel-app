import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFMEqcHcBUV_Ox4WqYTJf62IGEjatsM1c",
  authDomain: "marvel-33fd2.firebaseapp.com",
  projectId: "marvel-33fd2",
  storageBucket: "marvel-33fd2.appspot.com",
  messagingSenderId: "655349146543",
  appId: "1:655349146543:web:9065b63ee8d0f55317055a",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);