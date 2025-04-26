import { useState, useEffect } from "react";
import {
  signInWithEmail,
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
} from "../lib/auth";
import {
  createUserProfile,
  getUserProfile,
  createListing,
  getListings,
  updateListing,
  deleteListing,
  getTopUsers,
  getOrCreateChat,
  sendMessage,
  subscribeToMessages,
} from "../lib/db";

export default function TestIntegration() {
  const [log, setLog] = useState([]);
  const [user, setUser] = useState(null);
  const [chatId, setChatId] = useState("");

  // helper to append to log
  const write = (msg) =>
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

  // subscribe to auth state
  useEffect(() => {
    const unsub = onAuthStateChanged((u) => {
      setUser(u);
      write(u ? `Signed in as ${u.uid}` : "Signed out");
    });
    return unsub;
  }, []);

  // button handlers
  const handleEmailSignIn = async () => {
    const email = prompt("Enter email:", "test@example.com");
    const password = prompt("Enter password:", "password123");
    try {
      await signInWithEmail(email, password);
      write(`Email sign-in triggered for ${email}`);
    } catch (e) {
      write("Email sign-in error: " + e.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      write("Google sign-in triggered");
    } catch (e) {
      write("Google sign-in error: " + e.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    write("Signed out");
  };

  const handleCreateProfile = async () => {
    if (!user) return write("Not signed in");
    await createUserProfile({
      uid: user.uid,
      displayName: user.displayName || "Tester",
      email: user.email,
    });
    write("createUserProfile() done");
  };

  const handleGetProfile = async () => {
    if (!user) return write("Not signed in");
    const snap = await getUserProfile(user.uid);
    write("Profile: " + JSON.stringify(snap.data()));
  };

  const handleCreateListing = async () => {
    if (!user) return write("Not signed in");
    const ref = await createListing({
      ownerId: user.uid,
      title: "Test Item",
      description: "Just for testing",
    });
    write("Listing created: " + ref.id);
  };

  const handleGetListings = async () => {
    const snap = await getListings();
    write(
      "Listings: " +
        JSON.stringify(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  };

  const handleCompleteListing = async () => {
    if (!user) return write("Not signed in");
    const listingId = prompt("Enter listing ID to complete:");
    const otherUserId = prompt("Enter swappedWith UID:");
    await updateListing(listingId, {
      status: "completed",
      swappedWith: otherUserId,
    });
    write(`Listing ${listingId} marked completed`);
  };

  const handleLeaderboard = async () => {
    const snap = await getTopUsers(5);
    write(
      "Top users: " +
        JSON.stringify(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  };

  const handleChat = async () => {
    if (!user) return write("Not signed in");
    // example: chat between current user and "otherUserId"
    const other = prompt("Enter other user UID:");
    const id = await getOrCreateChat([user.uid, other]);
    setChatId(id);
    write("Chat ID: " + id);
    // subscribe to messages
    subscribeToMessages(id, (msgs) => {
      write("Messages in chat: " + JSON.stringify(msgs));
    });
  };

  const handleSendMessage = async () => {
    if (!user || !chatId) return write("No chat or not signed in");
    const text = prompt("Message text:");
    await sendMessage(chatId, { senderId: user.uid, text });
    write("Sent message: " + text);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Test Integration Page</h1>
      <p>Current user: {user ? user.uid : "none"}</p>
      <button onClick={handleEmailSignIn}>
        Sign in (custom email/password)
      </button>{" "}
      <button onClick={handleGoogleSignIn}>Sign in (Google)</button>{" "}
      <button onClick={handleSignOut}>Sign out</button>{" "}
      <button onClick={handleCreateProfile}>createUserProfile()</button>{" "}
      <button onClick={handleGetProfile}>getUserProfile()</button>
      <br />
      <br />
      <button onClick={handleCreateListing}>createListing()</button>{" "}
      <button onClick={handleGetListings}>getListings()</button>{" "}
      <button onClick={handleCompleteListing}>
        completeListing(listingId, otherUserId)
      </button>{" "}
      <button onClick={handleLeaderboard}>getTopUsers()</button>
      <br />
      <br />
      <button onClick={handleChat}>getOrCreateChat() + subscribe</button>{" "}
      <button onClick={handleSendMessage}>sendMessage()</button>
      <h2>Log</h2>
      <div
        style={{
          background: "#f5f5f5",
          padding: 10,
          //   height: 200,
          //   overflowY: "scroll",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
        }}
      >
        {log.toReversed().join("\n")}
      </div>
    </div>
  );
}
