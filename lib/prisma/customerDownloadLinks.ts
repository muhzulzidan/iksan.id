// // lib/customerDownloadLinks.ts
// import prisma from "@/prisma/client";

// export async function createCustomerDownloadLinks(customerIksanId: number, downloadLinks: string[]) {
//     if (!customerIksanId || !downloadLinks) {
//         throw new Error('customerIksanId and downloadLinks are required');
//     }

//     try {
//         // Create a new CustomerDownloadLink
//         const newCustomerDownloadLink = await prisma.customerDownloadLink.create({
//             data: {
//                 customerIksanId,
//             },
//         });

//         // Create a new DownloadLink for each download link
//         const newLinks = await Promise.all(downloadLinks.map((link: string) => {
//             return prisma.downloadLink.create({
//                 data: {
//                     link,
//                     customerDownloadLinkId: newCustomerDownloadLink.id,
//                 },
//             });
//         }));

//         return newLinks;
//     } catch (error) {
//         console.error(error);
//         throw new Error("Something went wrong");
//     }
// }

// export async function getCustomerDownloadLinks(customerId: number) {
//     if (!customerId) {
//         throw new Error('Missing customer ID');
//     }

//     try {
//         const customerDownloadLinks = await prisma.customerDownloadLink.findMany({
//             where: { customerIksanId: customerId },
//             include: { DownloadLink: true },
//         });

//         const downloadLinks = customerDownloadLinks.flatMap((cdl: { DownloadLink: any[]; }) => cdl.DownloadLink.map((dl: string) => dl.link));
//         return downloadLinks;
//     } catch (error) {
//         console.error(error);
//         throw new Error('An error occurred while fetching the download links');
//     }
// }


// export async function getAllCustomerDownloadLinks() {
//     try {
//         // Fetch all CustomerDownloadLink records along with their associated DownloadLink records
//         const customerDownloadLinks = await prisma.customerDownloadLink.findMany({
//             include: {
//                 DownloadLink: true,
//             },
//         });

//         // Extract unique customerIksanIds from the fetched records
//         const customerIksanIds = Array.from(new Set(customerDownloadLinks.map((cdl: { customerIksanId: any; }) => cdl.customerIksanId)));

//         // Fetch the corresponding CustomerIksanId records
//         const customers = await prisma.customerIksanId.findMany({
//             where: {
//                 id: {
//                     in: customerIksanIds,
//                 },
//             },
//             select: {
//                 id: true,
//                 name: true,
//                 email: true,
//             },
//         });

//         // Create a map of customerId to customer details
//         const customerMap = new Map<number, { id: number; name: string; email: string }>(customers.map((customer: { id: number; name: string; email: string }) => [customer.id, customer]));

//         // Map the fetched records to include customer details
//         const downloadLinks = customerDownloadLinks.map((cdl: { customerIksanId: unknown; DownloadLink: any[]; }) => ({
//             customerId: cdl.customerIksanId,
//             customerName: customerMap.get(cdl.customerIksanId as number)?.name,
//             customerEmail: customerMap.get(cdl.customerIksanId as number)?.email,
//             links: cdl.DownloadLink.map((dl: string) => dl.link),
//         }));

//         return downloadLinks;
//     } catch (error) {
//         console.error(error);
//         throw new Error('An error occurred while fetching all download links');
//     }
// }
import { db } from '@/drizzle/db'; // Import your Drizzle ORM database instance
import { customerDownloadLink, downloadLink, customerIksanId } from '@/drizzle/schema'; // Import your Drizzle ORM schema
import { eq, inArray } from 'drizzle-orm'; // Import the eq and inArray functions from Drizzle ORM

export async function createCustomerDownloadLinks(customerIksanId: number, downloadLinks: string[]) {
    if (!customerIksanId || !downloadLinks) {
        throw new Error('customerIksanId and downloadLinks are required');
    }

    try {
        // Create a new CustomerDownloadLink
        const newCustomerDownloadLink = await db.insert(customerDownloadLink).values({
            customerIksanId,
        }).returning().execute();

        // Create a new DownloadLink for each download link
        const newLinks = await Promise.all(downloadLinks.map((link: string) => {
            return db.insert(downloadLink).values({
                link,
                customerDownloadLinkId: newCustomerDownloadLink[0].id,
            }).returning().execute();
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
    console.log(customerId, "customerId");
    try {
        const customerDownloadLinks = await db.select().from(customerDownloadLink)
            .where(eq(customerDownloadLink.customerIksanId, customerId))
            .leftJoin(downloadLink, eq(downloadLink.customerDownloadLinkId, customerDownloadLink.id))
            .execute();

        console.log(customerDownloadLinks, "customerDownloadLinks");

        const downloadLinks = customerDownloadLinks.flatMap((cdl: any) => {
            if (cdl.DownloadLink) {
                return [cdl.DownloadLink.link];
            }
            return [];
        });

        console.log(downloadLinks, "downloadLinks");

        return downloadLinks;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the download links');
    }
}


export async function getAllCustomerDownloadLinks() {
    try {
        // Fetch all CustomerDownloadLink records along with their associated DownloadLink records
        const customerDownloadLinks = await db.select().from(customerDownloadLink)
            .leftJoin(downloadLink, eq(downloadLink.customerDownloadLinkId, customerDownloadLink.id))
            .execute();

        console.log(customerDownloadLinks, "customerDownloadLinks");

        // Extract unique customerIksanIds from the fetched records, filtering out undefined values
        const customerIksanIds = Array.from(new Set(customerDownloadLinks.map((cdl: any) => cdl.customerIksanId).filter((id: any) => id !== undefined)));

        console.log(customerIksanIds, "customerIksanIds");

        // Fetch the corresponding CustomerIksanId records
        const customers = await db.select().from(customerIksanId)
            .where(inArray(customerIksanId.id, customerIksanIds))
            .execute();

        console.log(customers, "customers");

        // Create a map of customerId to customer details
        const customerMap = new Map<number, { id: number; name: string; email: string }>(customers.map((customer: any) => [customer.id, customer]));

        console.log(customerMap, "customerMap");

        // Map the fetched records to include customer details
        const downloadLinks = customerDownloadLinks.map((cdl: any) => {
            const customerName = customerMap.get(cdl.customerIksanId)?.name;
            const customerEmail = customerMap.get(cdl.customerIksanId)?.email;
            const links = cdl.DownloadLink ? [cdl.DownloadLink.link] : [];

            console.log({
                customerId: cdl.customerIksanId,
                customerName,
                customerEmail,
                links,
            }, "downloadLinkEntry");

            return {
                customerId: cdl.customerIksanId,
                customerName,
                customerEmail,
                links,
            };
        });

        console.log(downloadLinks, "downloadLinks");

        return downloadLinks;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching all download links');
    }
}