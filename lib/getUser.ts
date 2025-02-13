// lib/getUser.ts

// import { currentUser } from "@clerk/nextjs/server";
// import prisma from '@/prisma/client';

// export async function getUser() {
//     try {
//         const user = await currentUser();
//         if (!user) {
//             throw new Error('No user found');
//         }

//         if (user.emailAddresses && user.emailAddresses[0]) {
//             let customer = await prisma.customerIksanId.findUnique({
//                 where: { email: user.emailAddresses[0].emailAddress },
//             });

//             if (!customer) {
//                 customer = await prisma.customerIksanId.create({
//                     data: {
//                         email: user.emailAddresses[0].emailAddress,
//                         name: `${user.firstName} ${user.lastName}`,
//                         phoneNumber: '', // default value
//                     },
//                 });
//             }

//             return customer;
//         } else {
//             throw new Error('User does not have an email address');
//         }
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         throw error;
//     }
// }

// lib/getUser.ts
import { currentUser } from "@clerk/nextjs/server";
import { db } from '@/drizzle/db'; // Import your Drizzle ORM database instance
import { eq } from 'drizzle-orm'; // Import the eq function from Drizzle ORM
import { customerIksanId } from '@/drizzle/schema'; // Import your Drizzle ORM schema

export async function getUser() {
    try {
        const user = await currentUser();
        // console.log('get-user Current user:', user);

        if (!user) {
            throw new Error('No user found');
        }

        if (user.emailAddresses && user.emailAddresses[0]) {
            const email = user.emailAddresses[0].emailAddress;
            console.log('get-user  User email:', email);

            let customer = await db.select().from(customerIksanId).where(eq(customerIksanId.email, email)).execute();
            console.log('get-user Customer found:', customer);

            if (!customer.length) {
                customer = await db.insert(customerIksanId).values({
                    email: email,
                    name: `${user.firstName} ${user.lastName}`,
                    phoneNumber: '', // default value
                }).returning().execute();
                console.log('get-user New customer created:', customer);
            }

            return customer[0];
        } else {
            throw new Error('User does not have an email address');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}