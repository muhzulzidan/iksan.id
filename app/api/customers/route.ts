import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // const { id } = await req.json();
    const searchParams = req.nextUrl.searchParams
    // const userId = searchParams.get('userId')
    const id = searchParams.get('id')
    console.log(id, "id customers api")
    if (!id) {
        return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }

    try {
        const order = await prisma.customerOrder.findUnique({
            where: { xenditId: (id) },
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        console.log(order, "order")
        return NextResponse.json({order}, { status: 200 });
    } catch (error) {
        console.error('An error occurred while fetching the order:', error);
        return NextResponse.json({ error: `An error occurred while fetching the order: ${error}` }, { status: 500 });
    }
}