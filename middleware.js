import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;

  console.log("Path:", pathname);
  console.log("Token:", token);

  // Allow login and API routes
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      console.log("No token found → redirecting to login");
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // TEMPORARY: skip JWT verification
    console.log("Token exists → allowing access (verification skipped)");
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };