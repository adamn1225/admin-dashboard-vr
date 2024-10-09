// pages/api/auth/signup.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {
            email,
            name,
            firstName,
            lastName,
            phoneNumber,
            companyName,
            dateEstablished,
            streetAddress,
            zipCode,
            creditScoreRange,
            loanAmount
        } = req.body;

        // Validate required fields
        if (!email || !name) {
            return res.status(400).json({ error: 'Email and name are required' });
        }

        try {
            // Check if the user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Use a static placeholder password
            const placeholderPassword = 'TemporaryPassword123!';
            const hashedPassword = await bcrypt.hash(placeholderPassword, 10);

            // Create the new user
            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    firstName,
                    lastName,
                    phoneNumber,
                    companyName,
                    dateEstablished: new Date(dateEstablished),
                    streetAddress,
                    zipCode,
                    creditScoreRange,
                    loanAmount: parseFloat(loanAmount)
                },
            });

            return res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}