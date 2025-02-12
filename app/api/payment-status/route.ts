// import prisma from "@/prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest,) {
//     const searchParams = req.nextUrl.searchParams;
//     const id = searchParams.get('id');
//     console.log(id, "id payment-status api");

//     if (!id) {
//         return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
//     }

//     try {
//         const order = await prisma.customerOrder.findUnique({
//             where: { id: parseInt(id) },
//         });

//         if (!order) {
//             return NextResponse.json({ error: 'Order not found' }, { status: 404 });
//         }
//         console.log(order, "order");
//         return NextResponse.json({ order }, { status: 200 });
//     } catch (error) {
//         console.error('An error occurred while fetching the order:', error);
//         return NextResponse.json({ error: `An error occurred while fetching the order: ${error}` }, { status: 500 });
//     }
// }

import { db } from '@/drizzle/db'; // Import your Drizzle ORM database instance
import { customerOrder } from '@/drizzle/schema'; // Import your Drizzle ORM schema
import { eq } from 'drizzle-orm'; // Import the eq function from Drizzle ORM
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    console.log(id, "id payment-status api");

    if (!id) {
        return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }

    try {
        const order = await db.select().from(customerOrder).where(eq(customerOrder.id, parseInt(id))).execute();

        if (!order.length) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        console.log(order[0], "order");
        return NextResponse.json({ order: order[0] }, { status: 200 });
    } catch (error) {
        console.error('An error occurred while fetching the order:', error);
        return NextResponse.json({ error: `An error occurred while fetching the order: ${error}` }, { status: 500 });
    }
}