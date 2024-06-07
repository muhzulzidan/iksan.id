// app/template/[slug]/page.tsx

import { getBusinessInfo, getMetaDefault, getTemplates } from '@/lib/contentful';
import { ParsedUrlQuery } from 'querystring';
import Checkout from './checkoutClient';
import { Metadata } from 'next';
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import prisma from '@/prisma/client';
import { auth, currentUser } from "@clerk/nextjs/server";

async function getUser() {
    const user = await currentUser();
    // console.log(user, "user checkout currentUser ");
    if (user && user.emailAddresses && user.emailAddresses[0]) {
        let customer;
        customer = await prisma.customerIksanId.findUnique({
            where: { email: user.emailAddresses[0].emailAddress },
        });

        // console.log(customer, "customer");

        if (!customer) {
            customer = await prisma.customerIksanId.create({
                data: {
                    email: user.emailAddresses[0].emailAddress,
                    name: `${user.firstName} ${user.lastName}`,
                    phoneNumber: '', // default value
                },
            });
        }

        return customer
    }
}

async function checkoutPage() {
    const user = await getUser()

    // console.log(user, "user check out page");

    return <Checkout userData={user} />;
}

export default checkoutPage;

