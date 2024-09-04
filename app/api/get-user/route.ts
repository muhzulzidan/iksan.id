// app/api/get-user/route.ts

import { NextResponse } from 'next/server';
import { getUser } from '@/lib/getUser';

export async function GET() {
    try {
        const user = await getUser();
        if (user) {
            return NextResponse.json(user, { status: 200 });
        } else {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Internal Server Error', error: 'Unknown error' }, { status: 500 });
        }
    }
}