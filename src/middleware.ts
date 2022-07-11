import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET! });

  const url = req.nextUrl.clone();

  if(token && url.pathname === '/login') {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if(!token && (url.pathname === '/' || url.pathname.includes('/event'))) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}