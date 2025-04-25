import { auth } from "./firebase.js";
import { GoogleAuthProvider } from "firebase/auth";

export function signInWithGoogle() {
  return auth.signInWithPopup(new GoogleAuthProvider());
}
export function signInWithEmail(email, pw) {
  return auth.signInWithEmailAndPassword(email, pw);
}
export function signOut() {
  return auth.signOut();
}
export function onAuthStateChanged(cb) {
  return auth.onAuthStateChanged(cb);
}
export function getCurrentUser() {
  return auth.currentUser;
}
