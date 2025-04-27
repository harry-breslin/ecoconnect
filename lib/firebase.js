import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();

// point frontend at emulators
if (process.env.NODE_ENV !== "production") {
  auth.useEmulator("http://localhost:9099/");
  db.useEmulator("localhost", 8080);
  db.settings({
    host: "localhost:8080",
    ssl: false,
  });
  functions.useEmulator("localhost", 5001);
}

export default firebase;
