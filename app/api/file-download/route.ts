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
    // const userId = searchParams.get('userId')
    const fileName = searchParams.get('fileName')

    console.log(fileName, "fileName");


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

    console.log(fileUrl, "fileUrl");
    
    console.log(fileUrl,'Download recorded');
    return NextResponse.json({ fileUrl: `https://${fileUrl}` });
    // redirect(`https://${fileUrl}`);
}