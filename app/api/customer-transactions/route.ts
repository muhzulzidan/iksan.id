import { NextResponse } from 'next/server';
import prisma  from '@/prisma/client'; // Adjust the import based on your project structure

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');

    if (!customerId) {
        return NextResponse.json({ error: 'Customer ID is required' }, { status: 400 });
    }

    try {
        const transactions = await prisma.customerOrder.findMany({
            where: { customerId: parseInt(customerId) },
            include: {
                payments: true,
                orderItems: true,
            },
        });

        return NextResponse.json({ transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }
}