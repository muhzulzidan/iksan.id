// // lib/getCustomerByEmail.ts
// import prisma from "@/prisma/client";

// export async function getCustomerByEmail(email: string) {
//     try {
//         const customer = await prisma.customerIksanId.findUnique({
//             where: { email },
//         });

//         if (!customer) {
//             return null;
//         }

//         return customer;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }


import { db } from '@/drizzle/db'; // Import your Drizzle ORM database instance
import { eq } from 'drizzle-orm'; // Import the eq function from Drizzle ORM
import { customerIksanId } from '@/drizzle/schema'; // Import your Drizzle ORM schema

export async function getCustomerByEmail(email: string) {
    try {
        const customer = await db.select().from(customerIksanId).where(eq(customerIksanId.email, email)).execute();

        if (!customer.length) {
            return null;
        }

        return customer;
    } catch (error) {
        console.error('Error fetching customer by email:', error);
        return null;
    }
}