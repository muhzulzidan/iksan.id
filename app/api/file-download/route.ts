// import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server'
// import { AxiosError } from 'axios';

// import axios from 'axios';
// import { PrismaClient } from '@prisma/client';
// import { currentUser } from '@clerk/nextjs';
import { getTemplates } from '@/lib/contentful';
// import { redirect } from 'next/navigation';

// const prisma = new PrismaClient();

export async function GET(req: NextRequest,) {
    const searchParams = req.nextUrl.searchParams
    const fileName = searchParams.get('fileName')

    console.log('Requested fileName:', fileName);

    // Ignore filenames that do not start with "template"
    if (fileName && !fileName.startsWith('template')) {
        console.log('Ignored filename:', fileName);
        return NextResponse.json({ message: 'Ignored filename not starting with "template"' }, { status: 200 });
    }

    // Fetch templates from Contentful
    const templates = await getTemplates();
    console.log('Fetched templates:', templates);

    // Find the requested template
    const template = templates.find((template) => template.slug === fileName);
    console.log('Matched template:', template);

    if (!template) {
        console.log('Template not found for slug:', fileName);
        return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    console.log('template.file:', template.file);

    let fileUrl;
    if (template.file && Array.isArray(template.file)) {
        const file = template.file[0] as unknown as File;
        console.log('First file object:', file);
        if (file && file.fields && file.fields.file && file.fields.file.url) {
            fileUrl = file.fields.file.url.substring(2);
        } else {
            console.log('File fields structure:', file);
            return NextResponse.json({ error: 'File fields not found' }, { status: 404 });
        }
    } else {
        console.log('template.file is not an array or is missing:', template.file);
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    console.log('fileUrl:', fileUrl);

    console.log('Download recorded for fileUrl:', fileUrl);
    return NextResponse.json({ fileUrl: `https://${fileUrl}` });
    // redirect(`https://${fileUrl}`);
}