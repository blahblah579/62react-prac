// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

// 4.1 Provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Signup & login methods
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);     // :contentReference[oaicite:4]{index=4}

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);         // :contentReference[oaicite:5]{index=5}

  return (
    <AuthContext.Provider value={{ currentUser, signup, login }}>
      {/* Render children only after we know loading is false */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 4.2 Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
