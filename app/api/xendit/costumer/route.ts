import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextApiResponse) {
    const searchParams = req.nextUrl.searchParams
    const reference_id = searchParams.get('reference_id')

    try {
        const response = await axios.get(`https://api.xendit.co/v2/customers/${reference_id}`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`, // Use the XENDIT_SECRET_KEY from the environment variable
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving customer' });
    }
}

export async function POST(req: NextRequest, res: NextApiResponse) {
    const body = await req.json();
    const { name, email, phoneNumber, id } = body;


    try {
        const response = await axios.post('https://api.xendit.co/v2/customers', {
            "reference_id": id, 
            "given_names": name,
            "email": email,
            "mobile_number": phoneNumber,
            "description": "Customer from my iksan id"
        }, {
            headers: {
                'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`, // Use the XENDIT_SECRET_KEY from the environment variable
            },
        });

        res.status(200).json({ customer: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating customer' });
    }
}