import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        // Add more providers here
    ],
    // Optional: Add custom pages
    pages: {
        signIn: '/user-login',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: undefined // If set, new users will be directed here on first sign in
    },
    // Optional: Add callbacks
    callbacks: {
        async session({ session, token, user }) {
            if (session.user) {
                session.user.id = token.sub as string; // Use type assertion to ensure id is a string
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string; // Use type assertion to ensure id is a string
            }
            return token;
        },
        async signIn({ account, profile }) {
            if (account?.provider === "google" && profile?.email_verified && profile.email) {
                return profile.email.endsWith("@example.com");
            }
            return true; // Do different verification for other providers that don't have `email_verified`
        },
    },
});