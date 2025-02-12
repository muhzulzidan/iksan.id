// import { NextRequest, NextResponse } from "next/server";
// import axios from 'axios';
// import prisma from "@/prisma/client";

// export async function POST(req: NextRequest) {
//     // Parse the request body
//     const body = await req.json();

//     // Handle the webhook event
//     console.log('Webhook received:', body);

//     if (body.status === 'PAID') {
//         // Find the customer using the payer's email
//         const customer = await prisma.customerIksanId.findUnique({
//             where: {
//                 email: body.payer_email, // use the payer's email from the request body
//             },
//         });

//         if (customer) {
//             // Find the order using the xenditId from the request body
//             const order = await prisma.customerOrder.findUnique({
//                 where: {
//                     xenditId: body.id, // use the id from the request body
//                 },
//             });

//             if (order) {
//                 // Update the order
//                 await prisma.customerOrder.update({
//                     where: {
//                         id: order.id, // use the id of the found order
//                     },
//                     data: {
//                         total: body.amount, // use the amount from the request body
//                         status: body.status, // use the status from the request body
//                     },
//                 });
//             } else {
//                 // Create the order
//                 await prisma.customerOrder.create({
//                     data: {
//                         total: body.amount, // use the amount from the request body
//                         status: body.status, // use the status from the request body
//                         xenditId: body.id, // use the id from the request body
//                         customerId: customer.id, // use the id of the found customer
//                     },
//                 });
//             }
//         } else {
//             console.log(`Customer with email ${body.payer_email} not found. Creating a new one.`);
//             const newCustomer = await prisma.customerIksanId.create({
//                 data: {
//                     email: body.payer_email,
//                     // add other fields here...
//                 },
//             });
//             console.log(`New customer created with ID: ${newCustomer.id}`);
//         }
//     }

//     // Respond with a 200 status code and the request body
//     return NextResponse.json({ status: 'Received', body: body });
// }

import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db'; // Import your Drizzle ORM database instance
import { customerIksanId, customerOrder } from '@/drizzle/schema'; // Import your Drizzle ORM schema
import { eq } from 'drizzle-orm'; // Import the eq function from Drizzle ORM

export async function POST(req: NextRequest) {
    // Parse the request body
    const body = await req.json();

    // Handle the webhook event
    console.log('Webhook received:', body);

    if (body.status === 'PAID') {
        // Find the customer using the payer's email
        let customer = await db.select().from(customerIksanId).where(eq(customerIksanId.email, body.payer_email)).execute();

        if (customer.length) {
            customer = customer;

            // Find the order using the xenditId from the request body
            let order = await db.select().from(customerOrder).where(eq(customerOrder.xenditId, body.id)).execute();

            if (order.length) {
                order = order;

                // Update the order
                await db.update(customerOrder).set({
                    total: body.amount, // use the amount from the request body
                    status: body.status, // use the status from the request body
                }).where(eq(customerOrder.id, order[0].id)).execute();
            } else {
                // Create the order
                await db.insert(customerOrder).values({
                    total: body.amount, // use the amount from the request body
                    status: body.status, // use the status from the request body
                    xenditId: body.id, // use the id from the request body
                    customerId: customer[0].id, // use the id of the found customer
                }).execute();
            }
        } else {
            console.log(`Customer with email ${body.payer_email} not found. Creating a new one.`);
            const newCustomer = await db.insert(customerIksanId).values({
                name: 'Unknown', // or any default name
                email: body.payer_email,
                // add other fields here...
            }).returning().execute();
            console.log(`New customer created with ID: ${newCustomer[0].id}`);
        }
    }

    // Respond with a 200 status code and the request body
    return NextResponse.json({ status: 'Received', body: body });
}