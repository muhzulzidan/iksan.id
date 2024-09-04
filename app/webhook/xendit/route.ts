import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import slugify from "slugify";

export async function POST(req: NextRequest) {
    // Parse the request body
    const body = await req.json();

    // Handle the webhook event
    console.log('Webhook received:', body);

    if (body.status === 'PAID') {
        // Find the customer using the payer's email
        let customer = await prisma.customerIksanId.findUnique({
            where: {
                email: body.payer_email, // use the payer's email from the request body
            },
        });

        if (!customer) {
            console.log(`Customer with email ${body.payer_email} not found. Creating a new one.`);
            customer = await prisma.customerIksanId.create({
                data: {
                    email: body.payer_email,
                    // add other fields here...
                },
            });
            console.log(`New customer created with ID: ${customer.id}`);
        }

        // Convert the order id to an integer
        const orderId = body.id;

        // Find the order using the xenditId from the request body
        let order = await prisma.customerOrder.findUnique({
            where: {
                xenditId: orderId, // use the xenditId from the request body
            },
        });

        if (!order) {
            console.error('Order not found');
            // Optionally, you can return an error response if this is part of an API endpoint
            return NextResponse.json({ status: 404, error: 'Order not found' });
        } else {
            // Update the order
            order = await prisma.customerOrder.update({
                where: {
                    id: order.id, // use the id of the found order
                },
                data: {
                    total: body.amount, // use the amount from the request body
                    status: body.status, // use the status from the request body
                },
            });
        }

        // Create a payment record
        await prisma.payment.create({
            data: {
                amount: body.amount, // use the amount from the request body
                status: body.status, // use the status from the request body
                orderId: order.id, // use the id of the found or created order
            },
        });

        // Create order items
        if (body.items && Array.isArray(body.items)) {
            for (const item of body.items) {
                await prisma.orderItem.create({
                    data: {
                        quantity: item.quantity, // use the item quantity from the request body
                        price: item.price, // use the item price from the request body
                        orderId: order.id, // use the id of the found or created order
                        productSlug: slugify(item.name, { lower: true }), // generate slug from item name
                    },
                });
            }
        }
    }

    // Respond with a 200 status code and the request body
    return NextResponse.json({ status: 'Received', body: body });
}