// lib/getCustomerByEmail.ts
import prisma from "@/prisma/client";

export async function getCustomerByEmail(email: string) {
    try {
        const customer = await prisma.customerIksanId.findUnique({
            where: { email },
        });

        if (!customer) {
            return null;
        }

        return customer;
    } catch (error) {
        console.error(error);
        return null;
    }
}