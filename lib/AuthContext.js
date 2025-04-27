import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "./auth";
import { createUserProfile, getUserProfile } from "./db";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        // Check if the user profile exists in Firestore
        const profileSnap = await getUserProfile(currentUser.uid);
        if (!profileSnap.exists) {
          // Create a new user profile if it doesn't exist
          await createUserProfile({
            uid: currentUser.uid,
            displayName: currentUser.displayName || "Anonymous",
            email: currentUser.email,
          });
        }
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false); // Authentication status has been determined
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
