import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    const { customerIksanId, downloadLinks } = await req.json()
    console.log(customerIksanId, downloadLinks, "customer-download-link");
    if (!customerIksanId || !downloadLinks) {
        return NextResponse.json({ error: 'customerIksanId and downloadLinks are required' }, { status: 404 });
    }

    try {
        // Create a new CustomerDownloadLink
        const newCustomerDownloadLink = await prisma.customerDownloadLink.create({
            data: {
                customerIksanId: Number(customerIksanId),
            },
        });

        // Create a new DownloadLink for each download link
        const newLinks = await Promise.all(downloadLinks.map((link: string) => {
            return prisma.downloadLink.create({
                data: {
                    link,
                    customerDownloadLinkId: newCustomerDownloadLink.id,
                },
            });
        }));

        return NextResponse.json({ newLinks }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}


export async function GET(req: NextRequest, res: NextResponse) {
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