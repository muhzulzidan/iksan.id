import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
// pages/api/createInvoice.ts

export async function POST(request: Request) {
    const { price, title, userEmail, slug } = await request.json();

    try {
        const response = await axios.post('https://api.xendit.co/v2/invoices', {
            external_id: slug + Date.now(), // This should be a unique id for each invoice
            payer_email: userEmail, // Use the user's email from Clerk
            description: title,
            amount: `${price}000`,
        }, {
            headers: {
                'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`, // Use the XENDIT_SECRET_KEY from the environment variable
            },
        });

        return new Response(JSON.stringify({ invoiceUrl: response.data.invoice_url }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error creating invoice' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}