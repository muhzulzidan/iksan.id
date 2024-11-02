import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const xenditId = searchParams.get('xenditId');
    console.log(xenditId, "xenditId payment-status api");

    if (!xenditId) {
        return NextResponse.json({ error: 'Missing xendit ID' }, { status: 400 });
    }

    try {
        const order = await prisma.customerOrder.findUnique({
            where: { xenditId },
        });

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        console.log(order, "order");
        return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
        console.error('An error occurred while fetching the order:', error);
        return NextResponse.json({ error: `An error occurred while fetching the order: ${error}` }, { status: 500 });
    }
}