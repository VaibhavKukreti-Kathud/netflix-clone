import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != 'POST') {
        res.status(405).end();
    }

    try {
        const { email, name, password } = req.body;
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: "",
                emailVerified: new Date(),
            },
        });
        res.status(200).json({ message: 'User created', user });

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}
