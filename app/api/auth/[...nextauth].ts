import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    console.error('Missing email or password');
                    return null;
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    });

                    if (user && await bcrypt.compare(credentials.password, user.password)) {
                        return {
                            ...user,
                            id: user.id.toString(), // Convert id to string
                        };
                    } else {
                        console.error('Invalid email or password');
                        return null;
                    }
                } catch (error) {
                    console.error('Error during authentication', error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin', // Custom sign-in page
        error: '/auth/error', // Error page
    },
    // Additional NextAuth configuration options
});