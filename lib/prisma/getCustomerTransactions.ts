// // lib/getCustomerTransactions.ts
// import prisma from "@/prisma/client";

// export async function getCustomerTransactions(customerId: string) {
//     if (!customerId) {
//         throw new Error('Customer ID is required');
//     }

//     try {
//         const transactions = await prisma.customerOrder.findMany({
//             where: { customerId: parseInt(customerId) },
//             include: {
//                 payments: true,
//                 orderItems: true,
//             },
//         });

//         return transactions;
//     } catch (error) {
//         console.error('Error fetching transactions:', error);
//         throw new Error('Failed to fetch transactions');
//     }
// }


// export async function getAllCustomerTransactions() {
//     try {
//         const transactions = await prisma.customerOrder.findMany({
//             include: {
//                 payments: true,
//                 orderItems: true,
//                 customer: { // Include the related customer information
//                     select: {
//                         id: true,
//                         name: true,
//                         email: true,
//                     },
//                 },
//             },
//         });

//         return transactions;
//     } catch (error) {
//         console.error('Error fetching all transactions:', error);
//         throw new Error('Failed to fetch all transactions');
//     }
// }

import { db } from '@/drizzle/db'; // Import your Drizzle ORM database instance
import { customerOrder, payment, orderItem, customerIksanId } from '@/drizzle/schema'; // Import your Drizzle ORM schema
import { eq } from 'drizzle-orm'; // Import the eq function from Drizzle ORM

export async function getCustomerTransactions(customerId: string) {
    if (!customerId) {
        throw new Error('Customer ID is required');
    }

    try {
        const transactions = await db.select().from(customerOrder)
            .where(eq(customerOrder.customerId, parseInt(customerId)))
            .leftJoin(payment, eq(payment.orderId, customerOrder.id))
            .leftJoin(orderItem, eq(orderItem.orderId, customerOrder.id))
            .execute();

        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw new Error('Failed to fetch transactions');
    }
}

export async function getAllCustomerTransactions() {
    try {
        const transactions = await db.select().from(customerOrder)
            .leftJoin(payment, eq(payment.orderId, customerOrder.id))
            .leftJoin(orderItem, eq(orderItem.orderId, customerOrder.id))
            .leftJoin(customerIksanId, eq(customerIksanId.id, customerOrder.customerId))
            .execute();

        return transactions.map(transaction => ({
            ...transaction,
            customer: {
                id: transaction.CustomerIksanId?.id,
                name: transaction.CustomerIksanId?.name,
                email: transaction.CustomerIksanId?.email,
            },
        }));
    } catch (error) {
        console.error('Error fetching all transactions:', error);
        throw new Error('Failed to fetch all transactions');
    }
}