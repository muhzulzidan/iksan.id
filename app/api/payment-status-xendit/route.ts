// import prisma from "@/prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//     const searchParams = req.nextUrl.searchParams;
//     const xenditId = searchParams.get('xenditId');
//     console.log(xenditId, "xenditId payment-status api");

//     if (!xenditId) {
//         return NextResponse.json({ error: 'Missing xendit ID' }, { status: 400 });
//     }

//     try {
//         const order = await prisma.customerOrder.findUnique({
//             where: { xenditId },
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
    const xenditId = searchParams.get('xenditId');
    console.log(xenditId, "xenditId payment-status api");

    if (!xenditId) {
        return NextResponse.json({ error: 'Missing xendit ID' }, { status: 400 });
    }

    try {
        const order = await db.select().from(customerOrder).where(eq(customerOrder.xenditId, xenditId)).execute();

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