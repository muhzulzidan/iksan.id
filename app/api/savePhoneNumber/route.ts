import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const { id, phoneNumber } = await req.json();

    if (!id || !phoneNumber) {
        return NextResponse.json({ error: 'ID and phone number are required' }, { status: 400 });
    }

    try {
        const customer = await prisma.customerIksanId.findUnique({
            where: { id: parseInt(id) },
        });

        if (!customer) {
            return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        }

        const updatedCustomer = await prisma.customerIksanId.update({
            where: { id: customer.id },
            data: { phoneNumber },
        });

        return NextResponse.json({ success: true, customer: updatedCustomer }, { status: 200 });
    } catch (error) {
        console.error('Error updating customer phone number:', error);
        return NextResponse.json({ error: `Failed to update customer phone number: ${error}` }, { status: 500 });
    }
}