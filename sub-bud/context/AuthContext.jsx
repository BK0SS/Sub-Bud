'use client'

import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

//any compomenet use that returns a global state to get info from it 
const AuthContext = createContext();
export function useAuth(){
    return useContext(AuthContext)
}



//fuck useEffect


export default function AuthProvider(props) {
    //wrapper for all at all time
    const {children} = props;
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true)
    const calue = {currentUser, userData, loading}

    useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async user =>{
        try {
            setLoading(true);
            setCurrentUser(user);
            if(!user)
            {
                return
            }

            //user there
            const docRef = doc(db,'users', user.uid);
            const docSnap = await getDoc(docRef);
            console.log('going');

            let firebaseData = {subscriptions:[]} //de
            if(docSnap.exists()){
                console.log('exists')
                firebaseData=docSnap.data();
            }
            else{
                console.log('not exists')
            }
            setUserData(firebaseData);
            setLoading(false);
            
        } catch (err) {
            console.log(err.message)
            
        }
    })
    return unsubscribe
}, [])

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
