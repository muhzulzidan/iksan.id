// lib/getUser.ts

import { currentUser } from "@clerk/nextjs/server";
import prisma from '@/prisma/client';

export async function getUser() {
    try {
        const user = await currentUser();
        if (!user) {
            throw new Error('No user found');
        }

        if (user.emailAddresses && user.emailAddresses[0]) {
            let customer = await prisma.customerIksanId.findUnique({
                where: { email: user.emailAddresses[0].emailAddress },
            });

            if (!customer) {
                customer = await prisma.customerIksanId.create({
                    data: {
                        email: user.emailAddresses[0].emailAddress,
                        name: `${user.firstName} ${user.lastName}`,
                        phoneNumber: '', // default value
                    },
                });
            }

            return customer;
        } else {
            throw new Error('User does not have an email address');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}