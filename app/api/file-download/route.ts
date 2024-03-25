import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server'
import { AxiosError } from 'axios';

import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { currentUser } from '@clerk/nextjs';
import { getTemplates } from '@/lib/contentful';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function GET(req: NextRequest,) {
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const fileName = searchParams.get('fileName')

    // Check if the user is logged in
    const user = await currentUser();


    if (!user) {
        return NextResponse.redirect('/login');
    } 

    // Check if the customer exists in Xendit
    try {
        await axios.post('https://api.xendit.co/customers', {
            reference_id: userId,
            mobile_number: '+' + user?.username?.replace('number_', ''),
            email: user?.emailAddresses[0].emailAddress,
            type: "INDIVIDUAL",
            individual_detail: {
                given_names: `${user?.firstName} ${user?.lastName}`,
            }

        }, {
            headers: {
                'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`, // Use the XENDIT_SECRET_KEY from the environment variable
            },
        });
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 409) {
            // If the customer already exists, return a success response
            console.log('Customer already exists');
        } else {
            console.error('Error Message:', axiosError.message);
            console.error('Response:', axiosError.response?.data);
            console.error('Status:', axiosError.response?.status);
            console.error('Headers:', axiosError.response?.headers);
            return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
        }
    }

    // Fetch templates from Contentful
    const templates = await getTemplates();
    // Find the requested template
    const template = templates.find((template) => template.slug === fileName);

    if (!template) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    let fileUrl;
    if (template.file && Array.isArray(template.file)) {
        const file = template.file[0] as unknown as File;
        fileUrl = file.fields.file.url.substring(2);
    } else {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }


    // Ensure userId is defined and is not null
    if (userId === undefined || userId === null) {
        return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Record the download in your database
    await prisma.downloadIksanId.create({
        data: {
            userId,
            fileName: String(fileName),
            downloadDate: new Date(),
        },
    });

    console.log(fileUrl,'Download recorded');
    return NextResponse.json({ fileUrl: `https://${fileUrl}` });
    // redirect(`https://${fileUrl}`);
}