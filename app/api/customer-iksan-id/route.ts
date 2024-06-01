import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest, res: NextResponse) {
    // const { email } = req.query;
    const searchParams = req.nextUrl.searchParams
    // const userId = searchParams.get('userId')
    const email = searchParams.get('email')
    console.log(email, "email customer-iksan-id")
    if (!email) {
        return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    try {
        const customer = await prisma.customerIksanId.findUnique({
            where: { email: String(email) },
        });

        if (!customer) {
            return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        }

        console.log(customer, "customer-iksan-id")
        return NextResponse.json({ customer }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while fetching the customer' }, { status: 500 });
    }
}