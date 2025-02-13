// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/prisma/client";
// import slugify from "slugify";

// export async function POST(req: NextRequest) {
//     // Parse the request body
//     const body = await req.json();

//     // Handle the webhook event
//     console.log('Webhook received:', body);

//     if (body.status === 'PAID') {
//         // Find the customer using the payer's email
//         let customer = await prisma.customerIksanId.findUnique({
//             where: {
//                 email: body.payer_email, // use the payer's email from the request body
//             },
//         });

//         if (!customer) {
//             console.log(`Customer with email ${body.payer_email} not found. Creating a new one.`);
//             customer = await prisma.customerIksanId.create({
//                 data: {
//                     email: body.payer_email,
//                     // add other fields here...
//                 },
//             });
//             console.log(`New customer created with ID: ${customer.id}`);
//         }

//         // Convert the order id to an integer
//         const orderId = body.id;

//         // Find the order using the xenditId from the request body
//         let order = await prisma.customerOrder.findUnique({
//             where: {
//                 xenditId: orderId, // use the xenditId from the request body
//             },
//         });

//         if (!order) {
//             console.error('Order not found');
//             // Optionally, you can return an error response if this is part of an API endpoint
//             return NextResponse.json({ status: 404, error: 'Order not found' });
//         } else {
//             // Update the order
//             order = await prisma.customerOrder.update({
//                 where: {
//                     id: order.id, // use the id of the found order
//                 },
//                 data: {
//                     total: body.amount, // use the amount from the request body
//                     status: body.status, // use the status from the request body
//                 },
//             });
//         }

//         // Create a payment record
//         await prisma.payment.create({
//             data: {
//                 amount: body.amount, // use the amount from the request body
//                 status: body.status, // use the status from the request body
//                 orderId: order.id, // use the id of the found or created order
//             },
//         });

//         // Create order items
//         if (body.items && Array.isArray(body.items)) {
//             for (const item of body.items) {
//                 await prisma.orderItem.create({
//                     data: {
//                         quantity: item.quantity, // use the item quantity from the request body
//                         price: item.price, // use the item price from the request body
//                         orderId: order.id, // use the id of the found or created order
//                         productSlug: slugify(item.name, { lower: true }), // generate slug from item name
//                     },
//                 });
//             }
//         }
//     }

//     // Respond with a 200 status code and the request body
//     return NextResponse.json({ status: 'Received', body: body });
// }

import { NextRequest, NextResponse } from "next/server";
import { db } from '@/drizzle/db'; // Import your Drizzle ORM database instance
import { customerIksanId, customerOrder, payment, orderItem } from '@/drizzle/schema'; // Import your Drizzle ORM schema
import { eq, and } from 'drizzle-orm'; // Import the eq and and functions from Drizzle ORM
import slugify from "slugify";

export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        console.log('Webhook received:', body);

        if (body.status === 'PAID') {
            // Find the customer using the payer's email
            let customer = await db.select().from(customerIksanId).where(eq(customerIksanId.email, body.payer_email)).execute();
            console.log('Customer found:', customer);

            if (!customer.length) {
                console.log(`Customer with email ${body.payer_email} not found. Creating a new one.`);
                customer = await db.insert(customerIksanId).values({
                    name: body.payer_name, // use the payer's name from the request body
                    email: body.payer_email,
                    phoneNumber: body.payer_phone || null,
                }).returning().execute();
                console.log(`New customer created with ID: ${customer[0].id}`);
            }

            // Convert the order id to an integer
            const orderId = body.id;

            // Find the order using the xenditId from the request body
            let order = await db.select().from(customerOrder).where(eq(customerOrder.xenditId, orderId)).execute();
            console.log('Order found:', order);

            if (!order.length) {
                console.error('Order not found');
                // Optionally, you can return an error response if this is part of an API endpoint
                return NextResponse.json({ status: 404, error: 'Order not found' });
            } else {
                // Update the order
                order = await db.update(customerOrder).set({
                    total: body.amount, // use the amount from the request body
                    status: body.status, // use the status from the request body
                }).where(eq(customerOrder.id, order[0].id)).returning().execute();
                console.log('Order updated:', order);
            }

            // Check if the payment record already exists
            const existingPayment = await db.select().from(payment).where(eq(payment.orderId, order[0].id)).execute();
            if (existingPayment.length) {
                console.log(`Payment record for orderId ${order[0].id} already exists. Updating the existing payment record.`);
                await db.update(payment).set({
                    amount: body.amount, // use the amount from the request body
                    status: body.status, // use the status from the request body
                }).where(eq(payment.orderId, order[0].id)).execute();
                console.log('Payment record updated:', existingPayment);
            } else {
                // Create a payment record
                const paymentRecord = await db.insert(payment).values({
                    amount: body.amount, // use the amount from the request body
                    status: body.status, // use the status from the request body
                    orderId: order[0].id, // use the id of the found or created order
                }).returning().execute();
                console.log('Payment record created:', paymentRecord);
            }

            // Create order items
            if (body.items && Array.isArray(body.items)) {
                for (const item of body.items) {
                    const productSlug = slugify(item.name, { lower: true });
                    const existingOrderItem = await db.select().from(orderItem).where(and(eq(orderItem.orderId, order[0].id), eq(orderItem.productSlug, productSlug))).execute();

                    if (existingOrderItem.length) {
                        console.log(`Order item with orderId ${order[0].id} and productSlug ${productSlug} already exists. Updating the existing order item.`);
                        await db.update(orderItem).set({
                            quantity: item.quantity, // use the item quantity from the request body
                            price: item.price, // use the item price from the request body
                        }).where(and(eq(orderItem.orderId, order[0].id), eq(orderItem.productSlug, productSlug))).execute();
                        console.log('Order item updated:', existingOrderItem);
                    } else {
                        const orderItemRecord = await db.insert(orderItem).values({
                            quantity: item.quantity, // use the item quantity from the request body
                            price: item.price, // use the item price from the request body
                            orderId: order[0].id, // use the id of the found or created order
                            productSlug: productSlug, // generate slug from item name
                        }).returning().execute();
                        console.log('Order item created:', orderItemRecord);
                    }
                }
            }
        }

        // Respond with a 200 status code and the request body
        return NextResponse.json({ status: 'Received', body: body });
    } catch (error) {
        console.error('Error handling webhook:', error);
        return NextResponse.json({ status: 500, error: 'Internal Server Error' });
    }
}