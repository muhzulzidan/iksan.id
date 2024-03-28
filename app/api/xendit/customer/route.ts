// api/xendit/costumer/route.ts

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams
    const reference_id = searchParams.get('reference_id')

    try {
        const response = await axios.get(`https://api.xendit.co/customers?reference_id=${reference_id}`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`, // Use the XENDIT_SECRET_KEY from the environment variable
            },
        });

        return NextResponse.json({ data: response.data }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: `Error retrieving customer ${error}` }, { status: 500 })
       
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    const { name, email, phoneNumber, id } = body;


    try {
        const response = await axios.post('https://api.xendit.co/customers', {
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


        return NextResponse.json({ data: response.data }, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: `Error creating customer ${error}` }, { status: 500 })
       
    }
}