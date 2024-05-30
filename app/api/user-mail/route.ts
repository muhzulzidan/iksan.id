import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get('email')
    if (!email) {
        return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    try {
        const customer = await prisma.customerIksanId.findUnique({
            where: { email: email },
        });

        if (!customer) {
            return  NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        }
        return  NextResponse.json({ customer }, { status: 200 });
    } catch (error) {
        console.error('An error occurred while fetching the customer:', error);
        return  NextResponse.json({ error: `An error occurred while fetching the customer: ${error}` }, { status: 500 });
    }
}