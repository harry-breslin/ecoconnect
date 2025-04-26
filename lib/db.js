import firebase from "firebase/compat/app";
import { db } from "./firebase.js";

// ————— USERS —————
/*
{
  displayName: string,
  email:       string,
  createdAt:   Timestamp,
  points:      number
}
 */

export function createUserProfile({ uid, displayName, email }) {
  return db.doc(`users/${uid}`).set({
    displayName,
    email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    points: 0,
  });
}

export function getUserProfile(uid) {
  return db.doc(`users/${uid}`).get();
}

export function updateUserPoints(uid, delta) {
  return db.doc(`users/${uid}`).update({
    points: firebase.firestore.FieldValue.increment(delta),
  });
}

export function getTopUsers(limit = 10) {
  return db.collection("users").orderBy("points", "desc").limit(limit).get();
}

// ————— LISTINGS —————
/*
{
  title:       string,           // title of the listing
  price:       string,           // description of what the user wants in exchange
  image:       string,           // URL of the listing image
  tags:        string[],         // list of tags describing the listing
  createdAt:   Timestamp,        // timestamp when the listing was created
  ownerId:     string,           // uid of the poster
  swappedWith: string?,          // uid of the swap partner, once completed
  status:      "open" | "completed" // status of the listing
}
*/

export function createListing(data) {
  return db.collection("listings").add({
    ...data,
    status: "open",
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

export function getListings() {
  return db
    .collection("listings")
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
}

export function updateListing(listingId, updates) {
  return db.doc(`listings/${listingId}`).update(updates);
}

export function deleteListing(listingId) {
  return db.doc(`listings/${listingId}`).delete();
}

// ————— CHAT —————
/*
{
  participants: string[],        // [uid1, uid2]
  lastUpdated:  Timestamp
}
*/

// Find or create a chat between two users
export async function getOrCreateChat(participantIds) {
  const q = await db
    .collection("chats")
    .where("participants", "array-contains", participantIds[0])
    .get();

  // find if a chat already has exactly those two participants
  const existing = q.docs.find((doc) => {
    const p = doc.data().participants;
    return (
      p.length === 2 &&
      p.includes(participantIds[0]) &&
      p.includes(participantIds[1])
    );
  });

  if (existing) return existing.id;

  const newChat = await db.collection("chats").add({
    participants: participantIds,
    lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  return newChat.id;
}

/*
{
  senderId:  string,    // uid
  text:      string,
  createdAt: Timestamp
}
*/

// Subscribe to chat messages in real time
export function subscribeToMessages(chatId, onUpdate) {
  return db
    .doc(`chats/${chatId}`)
    .collection("messages")
    .orderBy("createdAt")
    .onSnapshot((snapshot) => {
      const msgs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onUpdate(msgs);
    });
}

export function sendMessage(chatId, { senderId, text }) {
  return db
    .doc(`chats/${chatId}`)
    .collection("messages")
    .add({
      senderId,
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() =>
      db.doc(`chats/${chatId}`).update({
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
}
