import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;

  const authRoutes = ["/admin-login", "/admin-register"];

  const isAuthRoute = authRoutes.includes(pathname);

  const isProtectedRoute =
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/admin-employees");

  // Logged-in Admin
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // Guest Admin
  if (!token && isProtectedRoute) {
    
    return NextResponse.redirect(new URL("/admin-employees", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-login",
    "/admin-register",
    "/admin-dashboard/:path*",
    "/admin-employees/:path*",
  ],
};