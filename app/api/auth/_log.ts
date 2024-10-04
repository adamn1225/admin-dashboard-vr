"use client";
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { message, level } = req.body;

        // Log the message (you can customize this to log to a file, external service, etc.)
        console.log(`[${level}] ${message}`);

        res.status(200).json({ status: 'ok' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}