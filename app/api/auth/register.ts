import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const saltRounds = 10;

async function registerUser(email: string, plainPassword: string, name?: string) {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
    return user;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        try {
            const user = await registerUser(email, password, name);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}