'use client'

import { useState } from "react"

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isRegistration, setIsregistretion] = useState('')

    return (
        <div className="login">
            <h2>{isRegistration ? 'Register':'Login'}</h2>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" type="email"/>
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" type="password"/>
            <button>Submit</button>
            <div className="full-line"/>
            <div>
                <p>{isRegistration ? 'Have an account?':'Dont have an account?'}</p>
                <button onClick={()=>{
                    setIsregistretion(!isRegistration)
                }}>{isRegistration ? 'Log in':'Sign up'}</button>
            </div>
        </div>
    )
}