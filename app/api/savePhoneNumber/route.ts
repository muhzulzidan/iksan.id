// import prisma from "@/prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     const { id, phoneNumber } = await req.json();

//     if (!id || !phoneNumber) {
//         return NextResponse.json({ error: 'ID and phone number are required' }, { status: 400 });
//     }

//     try {
//         const customer = await prisma.customerIksanId.findUnique({
//             where: { id: parseInt(id) },
//         });

//         if (!customer) {
//             return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
//         }

//         const updatedCustomer = await prisma.customerIksanId.update({
//             where: { id: customer.id },
//             data: { phoneNumber },
//         });

//         return NextResponse.json({ success: true, customer: updatedCustomer }, { status: 200 });
//     } catch (error) {
//         console.error('Error updating customer phone number:', error);
//         return NextResponse.json({ error: `Failed to update customer phone number: ${error}` }, { status: 500 });
//     }
// }

import { db } from '@/drizzle/db'; // Import your Drizzle ORM database instance
import { customerIksanId } from '@/drizzle/schema'; // Import your Drizzle ORM schema
import { eq } from 'drizzle-orm'; // Import the eq function from Drizzle ORM
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id, phoneNumber } = await req.json();

    if (!id || !phoneNumber) {
        return NextResponse.json({ error: 'ID and phone number are required' }, { status: 400 });
    }

    try {
        const customer = await db.select().from(customerIksanId).where(eq(customerIksanId.id, parseInt(id))).execute();

        if (!customer.length) {
            return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        }

        const updatedCustomer = await db.update(customerIksanId).set({ phoneNumber }).where(eq(customerIksanId.id, customer[0].id)).returning().execute();

        return NextResponse.json({ success: true, customer: updatedCustomer[0] }, { status: 200 });
    } catch (error) {
        console.error('Error updating customer phone number:', error);
        return NextResponse.json({ error: `Failed to update customer phone number: ${error}` }, { status: 500 });
    }
}