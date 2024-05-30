import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req: NextRequest, res: NextResponse) {
    const { customerData, cart } = await req.json();

    // Validate customerData and cart
    if (!customerData || !cart) {
        return new Response('Missing customer data or cart items', {
            status: 500,
        })
    }

    console.log(customerData, "customerData checkout api");

    // Process the checkout
    try {
        // Calculate total price
        const totalPrice = cart.reduce((total: any, item: any) => total + item.price * item.quantity, 0);

        // // Create customer in your database
        // let dbCustomer = await prisma.customerIksanId.findUnique({
        //     where: {
        //         email: customerData.email,
        //     },
        // });

        // // If customer does not exist, create a new one
        // if (!dbCustomer) {
        //     dbCustomer = await prisma.customerIksanId.create({
        //         data: customerData,
        //     });
        // }
        // else if (!dbCustomer.phoneNumber) {
        //     dbCustomer = await prisma.customerIksanId.update({
        //         where: { email: dbCustomer.email },
        //         data: { phoneNumber: customerData.phoneNumber },
        //     });
        // }
        // // Create order

        // console.log('Order: ', order);


        const response = await axios({
            method: 'post',
            url: 'https://api.xendit.co/v2/invoices',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`,
            },
            data: {
                external_id: `order_${customerData.id}`,
                payer_email: customerData.email,
                description: 'Order payment',
                amount: Math.round(totalPrice * 1000), // Convert total to cents
            },
        });

        // console.log('Response checkout: ', response);
        console.log('Response checkout: ', response.data);

        // let order;
        // try {
        //     order = await prisma.customerOrder.create({ // Changed from prisma.order.create
        //         data: {
        //             customer: {
        //                 connect: {
        //                     id: response.data.id, // Assuming dbCustomer has an id field
        //                 },
        //             },
        //             total: totalPrice,
        //             status: 'pending',
        //         },
        //     });
        // } catch (error) {
        //     console.error('Error creating order:', error);
        //     return NextResponse.json({ error: `An error occurred while creating the order: ${error}` }, { status: 500 });
        // }



        // let customer;
        // const customerResponse = await fetch(`https://api.xendit.co/v2/customers/${customerData.id}`, {
        //     headers: {
        //         'Authorization': `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ':').toString('base64')}`,
        //     },
        // });

       

      
        // let data;
        // if (dbCustomer) {
        //     data = dbCustomer;
        //     console.log(data, "data checkout json")
        // } else {
        //     console.log("dbCustomer is undefined");
        // }
        // return NextResponse.json({ data });

        let data = response.data;
        // if (dbCustomer.headers.get('content-type')?.includes('application/json')) {
        //     data = await dbCustomer.json();
        //     console.log(data, "data checkout json")
        // } else {
        //     data = await dbCustomer.text();
        //     console.log(data, "data checkout text")
        // }
        return NextResponse.json({ data });
    } catch (error) {
        console.log('An error occurred while checkout', error);
        return NextResponse.json({ error: `An error occurred while checkout ${error}` }, { status: 500 });
    }
}