// lib/getCustomerTransactions.ts
import prisma from "@/prisma/client";

export async function getCustomerTransactions(customerId: string) {
    if (!customerId) {
        throw new Error('Customer ID is required');
    }

    try {
        const transactions = await prisma.customerOrder.findMany({
            where: { customerId: parseInt(customerId) },
            include: {
                payments: true,
                orderItems: true,
            },
        });

        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw new Error('Failed to fetch transactions');
    }
}


export async function getAllCustomerTransactions() {
    try {
        const transactions = await prisma.customerOrder.findMany({
            include: {
                payments: true,
                orderItems: true,
                customer: { // Include the related customer information
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return transactions;
    } catch (error) {
        console.error('Error fetching all transactions:', error);
        throw new Error('Failed to fetch all transactions');
    }
}