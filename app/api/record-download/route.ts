import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";
export async function GET(req: NextRequest,) {
    const downloads = await prisma.downloadIksanId.findMany();


    //return response JSON
    return NextResponse.json(
        {
            sucess: true,
            message: "List Data downloads",
            data: downloads,
        },
        {
            status: 200,
        }
    );
}


export async function POST(request: NextRequest) {
    const { userId, fileName } = await request.json();

    // const { userId, fileName } = JSON.parse(res);
    // Check if the user is logged in
    const user = await currentUser();


    if (!user) {
        return redirect('/sign-in');
    } 

    if (!userId || !fileName) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    try {
        
        const downloadRecord = await prisma.downloadIksanId.create({
            data: {
                userId,
                fileName: String(fileName),
                downloadDate: new Date(),
                fullname: user.firstName + ' ' + user.lastName,
                email: user.emailAddresses[0].emailAddress,
            },
        });

        return NextResponse.json({ message: 'Download recorded', downloadRecord });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while recording the download' }, { status: 500 });
    }
}