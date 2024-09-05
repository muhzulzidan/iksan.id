// lib/customerDownloadLinks.ts
import prisma from "@/prisma/client";

export async function createCustomerDownloadLinks(customerIksanId: number, downloadLinks: string[]) {
    if (!customerIksanId || !downloadLinks) {
        throw new Error('customerIksanId and downloadLinks are required');
    }

    try {
        // Create a new CustomerDownloadLink
        const newCustomerDownloadLink = await prisma.customerDownloadLink.create({
            data: {
                customerIksanId,
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

        return newLinks;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong");
    }
}

export async function getCustomerDownloadLinks(customerId: number) {
    if (!customerId) {
        throw new Error('Missing customer ID');
    }

    try {
        const customerDownloadLinks = await prisma.customerDownloadLink.findMany({
            where: { customerIksanId: customerId },
            include: { DownloadLink: true },
        });

        const downloadLinks = customerDownloadLinks.flatMap((cdl: { DownloadLink: any[]; }) => cdl.DownloadLink.map((dl: string) => dl.link));
        return downloadLinks;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the download links');
    }
}