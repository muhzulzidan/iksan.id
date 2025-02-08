import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";
import { serialize } from 'cookie';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])


export default clerkMiddleware(async (auth, req: NextRequest) => {
    console.log('Middleware invoked');
    const { userId, redirectToSignIn } = await auth()
    
    if (!isPublicRoute(req)) {
        console.log('Public route accessed');
        await auth.protect()
    }

    const url = new URL(req.nextUrl.origin);

    if (!userId) {
        console.log('User not authenticated, redirecting to sign-in');

        // Store the current URL in a cookie
        const cookie = serialize('redirectURL', req.nextUrl.pathname, { path: '/', httpOnly: true });
        const response = NextResponse.redirect(url);
        response.headers.set('Set-Cookie', cookie);

        // Redirect to the sign in page
        url.pathname = "/sign-in";
        return response;
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