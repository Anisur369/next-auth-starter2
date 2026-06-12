import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";
const privateRoutes = ["/private", "/private/:path*"];
 
// This function can be marked `async` if using `await` inside
export async function proxy(req) {
    const token = await getToken({ req });
    const isAuthenticated = Boolean(token);
    const isUser = token?.role === "editor";
    if (isAuthenticated && !isUser) {
        return NextResponse.redirect(new URL('/home', req.url));
    }
    const { pathname } = req.nextUrl;
    
    const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

    if (isPrivateRoute && !isAuthenticated) {
        const loginUrl = new URL('/api/auth/signin', req.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }
//   return NextResponse.redirect(new URL('/home', req.url))
    return NextResponse.next();
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ["/private", "/private/:path*"],
}