import { NextApiRequest, NextApiResponse } from 'next';
import { sessions } from '@clerk/nextjs/api';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

    
    try {
        const session = sessions
        res.status(200).json(session);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sessions' });
    }
}