"use client"
import React from 'react';

const SignIn = () => {

    const handleLogin = () => {
        console.log('login')
    }
    return (
        <div>
            <h1>Sign In</h1>
            {/*    google provider*/}
            <button onClick={handleLogin}>Sign In with Google</button>
            {/*    github provider*/}
            <button onClick={handleLogin}>Sign In with Github</button>
            {/*    facebook provider*/}
            <button onClick={handleLogin}>Sign In with Facebook</button>

        </div>
    );
};

export default SignIn;