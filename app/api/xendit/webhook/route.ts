import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
    // Parse the request body
    const body = await req.json();

    // Handle the webhook event
    console.log('Webhook received:', body);

    if (body.status === 'PAID') {
        // Find the customer using the payer's email
        const customer = await prisma.customerIksanId.findUnique({
            where: {
                email: body.payer_email, // use the payer's email from the request body
            },
        });

        if (customer) {
            // Find the order using the xenditId from the request body
            const order = await prisma.customerOrder.findUnique({
                where: {
                    xenditId: body.id, // use the id from the request body
                },
            });

            if (order) {
                // Update the order
                await prisma.customerOrder.update({
                    where: {
                        id: order.id, // use the id of the found order
                    },
                    data: {
                        total: body.amount, // use the amount from the request body
                        status: body.status, // use the status from the request body
                    },
                });
            } else {
                // Create the order
                await prisma.customerOrder.create({
                    data: {
                        total: body.amount, // use the amount from the request body
                        status: body.status, // use the status from the request body
                        xenditId: body.id, // use the id from the request body
                        customerId: customer.id, // use the id of the found customer
                    },
                });
            }
        } else {
            console.log(`Customer with email ${body.payer_email} not found. Creating a new one.`);
            const newCustomer = await prisma.customerIksanId.create({
                data: {
                    email: body.payer_email,
                    // add other fields here...
                },
            });
            console.log(`New customer created with ID: ${newCustomer.id}`);
        }
    }

    // Respond with a 200 status code and the request body
    return NextResponse.json({ status: 'Received', body: body });
}