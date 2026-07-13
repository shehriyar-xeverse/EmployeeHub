import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const adminToken = request.cookies.get("adminToken")?.value;
  const employeeToken = request.cookies.get("employeeToken")?.value;
  const pathname = request.nextUrl.pathname;

  const authRoutesAdmin = ["/admin-login", "/admin-register"];
  const authRoutesEmployee = ["/login", "/register"];


  const isAuthRouteAdmin = authRoutesAdmin.includes(pathname);
  const isAuthRouteEmployee = authRoutesEmployee.includes(pathname);

  const isProtectedRouteAdmin =pathname.startsWith("/admin-dashboard") ||pathname.startsWith("/admin-employees") ||
    pathname.startsWith("/admin-notification");

  const isProtectedRouteEmployee =
   pathname.startsWith("/employee-dashboard");

  if (adminToken && isAuthRouteAdmin) {
    return NextResponse.redirect(
      new URL("/admin-dashboard", request.url)
    );
  }

  if (employeeToken && isAuthRouteEmployee) {
    return NextResponse.redirect(
      new URL("/employee-dashboard", request.url)
    );
  }
  if (employeeToken && isProtectedRouteAdmin) {
    return NextResponse.redirect(
      new URL("/employee-dashboard", request.url)
    );
  }

  if (adminToken && isProtectedRouteEmployee) {
    return NextResponse.redirect(
      new URL("/admin-dashboard", request.url)
    );
  }
  if (!adminToken && !employeeToken && isProtectedRouteAdmin) {
    return NextResponse.redirect(
      new URL("/admin-login", request.url)
    );
  }

  if (!adminToken && !employeeToken && isProtectedRouteEmployee) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // admin Auth
    "/admin-login",
    "/admin-register",

    // amin Protected
    "/admin-dashboard/:path*",
    "/admin-employees/:path*",
    "/admin-notification/:path*",

    // employee Auth
    "/login",
    "/register",

    // employee Protected
    "/employee-dashboard/:path*",
  ],
};