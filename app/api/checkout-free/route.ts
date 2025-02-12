// import prisma from "@/prisma/client";
// import { NextRequest, NextResponse } from "next/server";

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
//                 status: 'paid', // Directly mark the order as paid
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

//         return NextResponse.json({ message: 'Order processed successfully for free items', orderId: order.id });
//     } catch (error) {
//         console.log('An error occurred while processing the order', error);
//         if (error instanceof Error) {
//             return NextResponse.json({ error: `An error occurred while processing the order: ${error.message}` }, { status: 500 });
//         } else {
//             return NextResponse.json({ error: 'An unknown error occurred while processing the order' }, { status: 500 });
//         }
//     }
// }

import { db } from '@/drizzle/db'; // Import your Drizzle ORM database instance
import { customerIksanId, customerOrder, orderItem } from '@/drizzle/schema'; // Import your Drizzle ORM schema
import { eq } from 'drizzle-orm'; // Import the eq function from Drizzle ORM
import { NextRequest, NextResponse } from "next/server";

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
            status: 'paid', // Directly mark the order as paid
        }).returning().execute();

        // Create order items
        const orderItems = cart.map((item: any) => ({
            quantity: item.quantity,
            price: item.price,
            productSlug: item.id, // Use id as productSlug
            orderId: order[0].id,
        }));

        await db.insert(orderItem).values(orderItems).execute();

        return NextResponse.json({ message: 'Order processed successfully for free items', orderId: order[0].id });
    } catch (error) {
        console.log('An error occurred while processing the order', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: `An error occurred while processing the order: ${error.message}` }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred while processing the order' }, { status: 500 });
        }
    }
}