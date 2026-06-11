import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";
 
// This function can be marked `async` if using `await` inside
export async function proxy(req) {
    const token = await getToken();
//   return NextResponse.redirect(new URL('/home', req.url))
    return NextResponse.next();
}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: '/about/:path*',
}