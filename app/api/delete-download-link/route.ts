// app/api/deleteDownloadLink/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ message: 'Download link ID is required' }, { status: 400 });
        }

        // Delete the download link
        await prisma.downloadLink.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Download link deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting download link:', error);
        return NextResponse.json({ message: 'An error occurred while deleting the download link' }, { status: 500 });
    }
}