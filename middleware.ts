import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";
import { serialize } from 'cookie';
const protectedRoutes = ['/my-account(.*)', '/admin(.*)'];

const isProtectedRoute = createRouteMatcher(protectedRoutes);

export default clerkMiddleware(async (auth, req: NextRequest) => {
    console.log('Middleware invoked');

    const { userId, redirectToSignIn } = await auth();
    console.log('User ID:', userId);

    if (!userId && isProtectedRoute(req)) {
        console.log('User not authenticated, redirecting to sign-in');
        // Add custom logic to run before redirecting
        return redirectToSignIn();
    }

    console.log('User authenticated, proceeding to next middleware');

    // If there's no stored URL, continue as usual
    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};