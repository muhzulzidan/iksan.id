import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const isValidLink = (link: string) => {
    // Add your validation logic here
    // For example, you can check if the link starts with "https://assets.ctfassets.net/"
    return link.startsWith('https://assets.ctfassets.net/');
};

export async function POST(req: NextRequest) {
    const { customerIksanId, downloadLinks } = await req.json();
    console.log(customerIksanId, downloadLinks, "customer-download-link");
    if (!customerIksanId || !downloadLinks) {
        return NextResponse.json({ error: 'customerIksanId and downloadLinks are required' }, { status: 404 });
    }

    // Validate download links
    const invalidLinks = downloadLinks.filter((link: string) => !isValidLink(link));
    if (invalidLinks.length > 0) {
        return NextResponse.json({ error: 'Invalid download links provided' }, { status: 400 });
    }

    try {
        // Create a new CustomerDownloadLink
        const newCustomerDownloadLink = await prisma.customerDownloadLink.create({
            data: {
                customerIksanId: Number(customerIksanId),
            },
        });

        // Create or associate DownloadLink for each download link
        const newLinks = await Promise.all(downloadLinks.map(async (link: string) => {
            let existingLink = await prisma.downloadLink.findUnique({
                where: { link },
            });

            if (!existingLink) {
                existingLink = await prisma.downloadLink.create({
                    data: {
                        link,
                        customerDownloadLinkId: newCustomerDownloadLink.id,
                    },
                });
            } else {
                // Associate the existing link with the new CustomerDownloadLink
                await prisma.customerDownloadLink.update({
                    where: { id: newCustomerDownloadLink.id },
                    data: {
                        DownloadLink: {
                            connect: { id: existingLink.id },
                        },
                    },
                });
            }

            return existingLink;
        }));

        return NextResponse.json({ newLinks }, { status: 200 });
    } catch (error) {
        console.error('Error:', error); // Log the error details
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const customerId = searchParams.get('customerId')

    console.log(customerId, "customerId customer-download-link")

    if (!customerId) {
        return NextResponse.json({ error: 'Missing customer ID' }, { status: 400 });
    }

    try {
        const customerDownloadLinks = await prisma.customerDownloadLink.findMany({
            where: { customerIksanId: Number(customerId) },
            include: { DownloadLink: true },
        });

        const downloadLinks = customerDownloadLinks.flatMap(cdl => cdl.DownloadLink.map(dl => dl.link));
        console.log(downloadLinks, "downloadLinks customer-download-link")
        return NextResponse.json({ downloadLinks }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while fetching the download links' }, { status: 500 });
    }
}