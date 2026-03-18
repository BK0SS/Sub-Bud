"use client";

import { auth, db } from "@/firebase";
import { subscriptions } from "@/utils";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

//any compomenet use that returns a global state to get info from it
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

//fuck useEffect

export default function AuthProvider(props) {
  //wrapper for all at all time
  const { children } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const value = {currentUser, userData, loading}

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
      const res = await setDoc(
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
        setLoading(true);
        //user there
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("going");
        // let firebaseData = {subscriptions}
        let firebaseData = { subscriptions: [] }; //de
        if (docSnap.exists()) {
          console.log("exists");
          firebaseData = docSnap.data();
        } else {
          console.log("not exists");
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
    deleteSub,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
