import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req: NextRequest, res: NextResponse) {
    const { customerData, cart } = await req.json();

    // Validate customerData and cart
    if (!customerData || !cart) {
        return new Response('Missing customer data or cart items', {
            status: 500,
        });
    }

    console.log(customerData, "customerData checkout api");
    console.log(cart, "cart checkout api");

    // Validate cart items
    for (const item of cart) {
        if (!item.id) {
            return new Response('Missing id in cart item', {
                status: 500,
            });
        }
    }

    // Process the checkout
    try {
        // Calculate total price
        const totalPrice = cart.reduce((total: any, item: any) => total + item.price * item.quantity, 0);

        // Create customer in your database
        let dbCustomer = await prisma.customerIksanId.findUnique({
            where: {
                email: customerData.email,
            },
        });

        // If customer does not exist, create a new one
        if (!dbCustomer) {
            dbCustomer = await prisma.customerIksanId.create({
                data: customerData,
            });
        } else if (!dbCustomer.phoneNumber) {
            dbCustomer = await prisma.customerIksanId.update({
                where: { email: dbCustomer.email },
                data: { phoneNumber: customerData.phoneNumber },
            });
        }

        // Create order
        const order = await prisma.customerOrder.create({
            data: {
                customer: {
                    connect: {
                        id: dbCustomer.id,
                    },
                },
                total: totalPrice,
                status: 'paid', // Directly mark the order as paid
            },
        });

        // Create order items
        const orderItems = cart.map((item: any) => ({
            quantity: item.quantity,
            price: item.price,
            productSlug: item.id, // Use id as productSlug
            orderId: order.id,
        }));

        await prisma.orderItem.createMany({
            data: orderItems,
        });

        return NextResponse.json({ message: 'Order processed successfully for free items', orderId: order.id });
    } catch (error) {
        console.log('An error occurred while processing the order', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: `An error occurred while processing the order: ${error.message}` }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred while processing the order' }, { status: 500 });
        }
    }
}