'use client'

import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const params = useSearchParams()
    const isReg = params.get('register')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistration, setIsRegistration] = useState(isReg); 
    const [error, setError] = useState(null);
    const [authenticating, setAuthenticating] = useState(false); 
    const { signup, login } = useAuth();

    async function handleAuth() {

        if (!email || !email.includes('@') || authenticating || !password || password.length < 6) {
            setError("Please enter a valid email and a password of at least 6 characters."); // Optional: give user feedback
            return;
        }
        
        setError(null);
        setAuthenticating(true);
        
        try {
            if (isRegistration) {
                await signup(email, password);
            } else {
                await login(email, password);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        } finally {
            setAuthenticating(false);
        }
    }

    return (
        <div className="login">
            <h2>{isRegistration ? 'Register' : 'Login'}</h2>
            
            {error && (
                <div className="card">
                    <p>{error}</p>
                </div>
            )}
            
            <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                type="email" 
            />
            <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                type="password" 
            />
            

            <button onClick={handleAuth} disabled={authenticating}>
                {authenticating ? 'Submitting...' : 'Submit'}
            </button>
            
            <div className="full-line" />
            
            <div>
                <p>{isRegistration ? 'Have an account?' : 'Dont have an account?'}</p>
                <button onClick={() => setIsRegistration(!isRegistration)}>
                    {isRegistration ? 'Log in' : 'Sign up'}
                </button>
            </div>
        </div>
    );
}