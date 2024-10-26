// middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  //   if (
  //     pathname.startsWith("/_next") ||
  //     pathname.startsWith("/api") ||
  //     pathname === "/favicon.ico"
  //   ) {
  //     return NextResponse.next();
  //   }

  //   // Retrieve 'isAuthenticated' cookie
  //   const isAuthenticated = request.cookies.get("isAuthenticated");

  //   // If not authenticated and not on the landing page, redirect to '/'
  //   if (isAuthenticated !== "true" && pathname !== "/") {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  return NextResponse.next();
}
