"use client";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function AuthError() {
    const router = useRouter();
    const { error } = router.query;

    const errorMessage = () => {
        switch (error) {
            case 'OAuthAccountNotLinked':
                return 'To confirm your identity, sign in with the same account you used originally.';
            case 'EmailSignin':
                return 'Check your email for a sign-in link.';
            case 'CredentialsSignin':
                return 'Sign in failed. Check the details you provided are correct.';
            default:
                return 'An unknown error occurred.';
        }
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                Authentication Error
            </Typography>
            <Typography variant="body1" gutterBottom>
                {errorMessage()}
            </Typography>
            <Button variant="contained" color="primary" component={Link} href="/auth/signin">
                Go to Sign In
            </Button>
        </Container>
    );
}