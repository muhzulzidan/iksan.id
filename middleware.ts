import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from 'cookie';
// import { parseCookies } from 'nookies';

export default authMiddleware({
    publicRoutes: ["((?!^/api|^/admin|^/profile).*)"],
    async afterAuth(auth, req: NextRequest) {
        // const cookies = parseCookies();

        if (auth.isPublicRoute) {
            return NextResponse.next();
        }

        const url = new URL(req.nextUrl.origin);

        if (!auth.userId) {
            // Store the current URL in a cookie
            const cookie = serialize('redirectURL', req.nextUrl.pathname, { path: '/', httpOnly: true });

            // Redirect to the sign in page
            url.pathname = "/sign-in";
            return NextResponse.redirect(url);
        }

        // Get the stored URL from the cookie
        // This part needs to be handled in your sign in logic
        // const redirectURL = req.cookies.redirectURL;
        // const redirectURL = cookies.redirectURL || '/default-page';
        // NextResponse.redirect(redirectURL);
        // If there's no stored URL, continue as usual
        return NextResponse.next();
    },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};