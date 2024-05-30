import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    const { customerIksanId, downloadLinks } = await req.json()

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