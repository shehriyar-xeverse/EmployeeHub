import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;

  const authRoutes = ["/login", "/register"];

  const isAuthRoute = authRoutes.includes(pathname);

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/employees");

  // Logged-in user
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Guest user
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/employees/:path*",
  ],
};