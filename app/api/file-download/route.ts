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
        // Use 'any' and add a type guard for 'fields'
        const fileObj = template.file.find(
            (f: any) =>
                typeof f === 'object' &&
                f !== null &&
                'fields' in f &&
                f.fields &&
                f.fields.file &&
                f.fields.file.url
        );
        console.log('Selected file object:', fileObj);

        if (
            fileObj &&
            typeof fileObj === 'object' &&
            'fields' in fileObj &&
            fileObj.fields &&
            typeof fileObj.fields === 'object' &&
            'file' in fileObj.fields &&
            fileObj.fields.file &&
            typeof fileObj.fields.file === 'object' &&
            'url' in fileObj.fields.file &&
            fileObj.fields.file.url
        ) {
            if (typeof fileObj.fields.file.url === 'string') {
                fileUrl = fileObj.fields.file.url.startsWith('//')
                    ? fileObj.fields.file.url.substring(2)
                    : fileObj.fields.file.url;
            } else {
                console.log('fileObj.fields.file.url is not a string:', fileObj.fields.file.url);
                return NextResponse.json({ error: 'File URL is not a string' }, { status: 404 });
            }
        } else {
            console.log('No valid file object with fields.file.url found:', template.file);
            return NextResponse.json({ error: 'File fields not found' }, { status: 404 });
        }
    } else {
        console.log('template.file is not an array or is missing:', template.file);
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    console.log('fileUrl:', fileUrl);

    return NextResponse.json({ fileUrl: `https://${fileUrl}` });
}