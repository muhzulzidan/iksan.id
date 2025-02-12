// import prisma from "@/prisma/client";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, ) {
//     const searchParams = req.nextUrl.searchParams
//     const email = searchParams.get('email')
//     if (!email) {
//         return NextResponse.json({ error: 'Missing email' }, { status: 400 });
//     }

//     try {
//         const customer = await prisma.customerIksanId.findUnique({
//             where: { email: email },
//         });

//         if (!customer) {
//             return  NextResponse.json({ error: 'Customer not found' }, { status: 404 });
//         }
//         return  NextResponse.json({ customer }, { status: 200 });
//     } catch (error) {
//         console.error('An error occurred while fetching the customer:', error);
//         return  NextResponse.json({ error: `An error occurred while fetching the customer: ${error}` }, { status: 500 });
//     }
// }

import { db } from '@/drizzle/db'; // Import your Drizzle ORM database instance
import { customerIksanId } from '@/drizzle/schema'; // Import your Drizzle ORM schema
import { eq } from 'drizzle-orm'; // Import the eq function from Drizzle ORM
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get('email');
    if (!email) {
        return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    try {
        const customer = await db.select().from(customerIksanId).where(eq(customerIksanId.email, email)).execute();

        if (!customer.length) {
            return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        }
        return NextResponse.json({ customer: customer[0] }, { status: 200 });
    } catch (error) {
        console.error('An error occurred while fetching the customer:', error);
        return NextResponse.json({ error: `An error occurred while fetching the customer: ${error}` }, { status: 500 });
    }
}