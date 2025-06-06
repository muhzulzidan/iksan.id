// import prisma from "@/prisma/client";
// import { NextRequest, NextResponse } from "next/server";
// import axios from 'axios';
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export async function POST(req: NextRequest) {
//     const { customerData, cart } = await req.json();

//     // Validate customerData and cart
//     if (!customerData || !cart) {
//         return NextResponse.json({ error: 'Missing customer data or cart items' }, { status: 500 });
//     }

//     console.log(customerData, "customerData checkout api");
//     console.log(cart, "cart checkout api");

//     // Validate cart items
//     for (const item of cart) {
//         if (!item.id) {
//             return NextResponse.json({ error: 'Missing id in cart item' }, { status: 500 });
//         }
//     }

//     // Process the checkout
//     try {
//         // Calculate total price
//         const totalPrice = cart.reduce((total: any, item: any) => total + item.price * item.quantity, 0);

//         // Create customer in your database
//         let dbCustomer = await prisma.customerIksanId.findUnique({
//             where: {
//                 email: customerData.email,
//             },
//         });

//         // If customer does not exist, create a new one
//         if (!dbCustomer) {
//             dbCustomer = await prisma.customerIksanId.create({
//                 data: customerData,
//             });
//         } else if (!dbCustomer.phoneNumber) {
//             dbCustomer = await prisma.customerIksanId.update({
//                 where: { email: dbCustomer.email },
//                 data: { phoneNumber: customerData.phoneNumber },
//             });
//         }

//         // Create order
//         const order = await prisma.customerOrder.create({
//             data: {
//                 customer: {
//                     connect: {
//                         id: dbCustomer.id,
//                     },
//                 },
//                 total: totalPrice,
//                 status: 'pending',
//             },
//         });

//         // Create order items
//         const orderItems = cart.map((item: any) => ({
//             quantity: item.quantity,
//             price: item.price,
//             productSlug: item.id, // Use id as productSlug
//             orderId: order.id,
//         }));

//         await prisma.orderItem.createMany({
//             data: orderItems,
//         });

//         const itemNames = cart.map((item: any) => item.name).join(', ');

//         // Proceed with the checkout process
//         const response = await axios({
//             method: 'post',
//             url: 'https://api.xendit.co/v2/invoices',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`,
//             },
//             data: {
//                 external_id: `order_${order.id}`,
//                 payer_email: customerData.email,
//                 description: `Order payment for ${customerData.name} (${customerData.email}), Items: ${itemNames}`,
//                 amount: Math.round(totalPrice * 1000),
//                 items: cart.map((item: { name: any; quantity: any; price: any; category: any; url: any; slug: any; id: any }) => ({
//                     name: item.name,
//                     quantity: item.quantity,
//                     price: item.price,
//                     category: item.category,
//                     url: item.url,
//                     slug: item.id
//                 })),
//                 invoice_duration: 86400, // 24 hours in seconds
//                 success_redirect_url: `${baseUrl}/my-account/payment-status?paymentId=${order.id}`,
//                 created: new Date().toISOString(), // Add the current date
//                 customer: {
//                     given_names: customerData.name,
//                     email: customerData.email,
//                     mobile_number: customerData.phoneNumber,
//                 }
//             }
//         });

//         console.log('Response checkout: ', response.data);

//         let data = response.data;

//         // Update order with xenditId
//         await prisma.customerOrder.update({
//             where: { id: order.id },
//             data: { xenditId: data.id },
//         });

//         return NextResponse.json({ data });
//     } catch (error) {
//         console.log('An error occurred while checkout', error);
//         if (error instanceof Error) {
//             return NextResponse.json({ error: `An error occurred while checkout: ${error.message}` }, { status: 500 });
//         } else {
//             return NextResponse.json({ error: 'An unknown error occurred while checkout' }, { status: 500 });
//         }
//     }
// }

import { db } from '@/drizzle/db'; // Import your Drizzle ORM database instance
import { customerIksanId, customerOrder, orderItem } from '@/drizzle/schema'; // Import your Drizzle ORM schema
import { eq } from 'drizzle-orm'; // Import the eq function from Drizzle ORM
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest) {
    const { customerData, cart } = await req.json();

    // Validate customerData and cart
    if (!customerData || !cart) {
        return NextResponse.json({ error: 'Missing customer data or cart items' }, { status: 500 });
    }

    console.log(customerData, "customerData checkout api");
    console.log(cart, "cart checkout api");

    // Validate cart items
    for (const item of cart) {
        if (!item.id) {
            return NextResponse.json({ error: 'Missing id in cart item' }, { status: 500 });
        }
    }

    // Process the checkout
    try {
        // Calculate total price
        const totalPrice = cart.reduce((total: any, item: any) => total + item.price * item.quantity, 0);

        // Create customer in your database
        let dbCustomer = await db.select().from(customerIksanId).where(eq(customerIksanId.email, customerData.email)).execute();

        // If customer does not exist, create a new one
        if (!dbCustomer.length) {
            dbCustomer = await db.insert(customerIksanId).values(customerData).returning().execute();
        } else if (!dbCustomer[0].phoneNumber) {
            dbCustomer = await db.update(customerIksanId).set({ phoneNumber: customerData.phoneNumber }).where(eq(customerIksanId.email, dbCustomer[0].email)).returning().execute();
        }

        // Create order
        const order = await db.insert(customerOrder).values({
            customerId: dbCustomer[0].id,
            total: totalPrice,
            status: 'pending',
        }).returning().execute();

        // Create order items
        const orderItems = cart.map((item: any) => ({
            quantity: item.quantity,
            price: item.price,
            productSlug: item.id, // Use id as productSlug
            orderId: order[0].id,
        }));

        await db.insert(orderItem).values(orderItems).execute();

        const itemNames = cart.map((item: any) => item.name).join(', ');

        // Proceed with the checkout process
        const response = await axios({
            method: 'post',
            url: 'https://api.xendit.co/v2/invoices',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`,
            },
            data: {
                external_id: `order_${order[0].id}`,
                payer_email: customerData.email,
                description: `Order payment for ${customerData.name} (${customerData.email}), Items: ${itemNames}`,
                amount: Math.round(totalPrice * 1000),
                items: cart.map((item: { name: any; quantity: any; price: any; category: any; url: any; slug: any; id: any }) => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    category: item.category,
                    url: item.url,
                    slug: item.id
                })),
                invoice_duration: 86400, // 24 hours in seconds
                success_redirect_url: `${baseUrl}/my-account/payment-status?paymentId=${order[0].id}`,
                created: new Date().toISOString(), // Add the current date
                customer: {
                    given_names: customerData.name,
                    email: customerData.email,
                    mobile_number: customerData.phoneNumber,
                }
            }
        });

        console.log('Response checkout: ', response.data);

        let data = response.data;

        // Update order with xenditId
        await db.update(customerOrder).set({ xenditId: data.id }).where(eq(customerOrder.id, order[0].id)).execute();

        return NextResponse.json({ data });
    } catch (error) {
        console.log('An error occurred while checkout', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: `An error occurred while checkout: ${error.message}` }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred while checkout' }, { status: 500 });
        }
    }
}