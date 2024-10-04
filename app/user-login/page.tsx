"use client";
import * as React from 'react';
import { useSearchParams } from 'next/navigation'; // Use next/navigation instead of next/router
import SignIn from '../auth/Signin';
import SignUp from '../auth/Signup';

const UserLoginPage = () => {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');

    return (
        <div>
            {mode === 'signup' ? <SignUp /> : <SignIn />}
        </div>
    );
};

export default UserLoginPage;