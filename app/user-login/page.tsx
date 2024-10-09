// app/user-login/page.tsx
"use client";
import * as React from 'react';
import { useSearchParams } from 'next/navigation'; // Use next/navigation instead of next/router
import SignIn from '../auth/Signin';
import SignUp from '../auth/Signup';
import SuspenseWrapper from '../components/SuspenseWrapper'; // Adjust the import path as needed

const UserLoginPage = () => {
    const searchParams = useSearchParams();
    const mode = searchParams?.get('mode') || 'signin'; // Provide a default value

    return (
        <div>
            {mode === 'signup' ? <SignUp /> : <SignIn />}
        </div>
    );
};

const UserLoginPageWithSuspense = () => (
    <SuspenseWrapper>
        <UserLoginPage />
    </SuspenseWrapper>
);

export default UserLoginPageWithSuspense;