import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const { reference_id } = req.query;

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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, phoneNumber, id } = req.body;

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