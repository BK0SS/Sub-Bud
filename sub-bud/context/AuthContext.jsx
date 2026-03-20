"use client";

import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(props) {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setCurrentUser(null);
    setUserData(null);
    return signOut(auth);
  }

  async function saveToFirebase(data) {
    try {
      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(
        docRef,
        {
          subscriptions: data,
        },
        { merge: true },
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  async function addSub(newSub) {
    const currentSubs = userData?.subscriptions || [];

    if (currentSubs.length >= 30) {
      return;
    }

    const subToSave = {
      ...newSub,
      cost: parseFloat(newSub.cost) || 0,
    };

    const newSubs = [...currentSubs, subToSave];

    setUserData({ subscriptions: newSubs });
    await saveToFirebase(newSubs);
  }

  async function updateSub(index, updatedSub) {
    const currentSubs = userData?.subscriptions || [];
    
    const newSubs = [...currentSubs];
    newSubs[index] = {
      ...updatedSub,
      cost: parseFloat(updatedSub.cost) || 0,
    };

    setUserData({ subscriptions: newSubs });
    await saveToFirebase(newSubs);
  }

  async function deleteSub(index) {
    const currentSubs = userData?.subscriptions || [];

    const newSubs = currentSubs.filter((val, valIndex) => {
      return valIndex !== index;
    });

    setUserData({ subscriptions: newSubs });
    await saveToFirebase(newSubs);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setCurrentUser(user);
        if (!user) {
          setLoading(false); 
          setUserData(null);
          return;
        }
        setLoading(true);
        
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        let firebaseData = { subscriptions: [] }; 
        
        if (docSnap.exists()) {
          firebaseData = docSnap.data();
        } 
        
        setUserData(firebaseData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    logout,
    addSub,
    updateSub,
    deleteSub,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}