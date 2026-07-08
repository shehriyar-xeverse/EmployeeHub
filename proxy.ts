import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const adminToken = request.cookies.get("adminToken")?.value;
  const employeeToken = request.cookies.get("employeeToken")?.value

  const pathname = request.nextUrl.pathname;
  const authRoutesAdmin = ["/admin-login", "/admin-register"];
  const authRoutesEmployee = ["/login", "/register"];

  const isAuthRouteAdmin = authRoutesAdmin.includes(pathname);
  const isAuthRouteEmployee = authRoutesEmployee.includes(pathname);

  

  const isProtectedRouteAdmin =
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/admin-employees");

 
    const isProtectedRouteEmployee = pathname.startsWith("/employee-dashboard") 


  // Logged-in Admin
  if (adminToken && isAuthRouteAdmin) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }


  // logged-In Employee
   if (employeeToken && isAuthRouteEmployee) {
    return NextResponse.redirect(new URL("/employee-dashboard", request.url));
  }

  // Guest Admin
  if (!adminToken && isProtectedRouteAdmin) {
    
    return NextResponse.redirect(new URL("/admin-employees", request.url));
  }


  /// Guest Employee
  //  if (!employeeToken && isProtectedRouteEmployee) {
  //   return NextResponse.redirect(new URL("/admin-employees", request.url));
  // }



  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-login",
    "/admin-register",
    "/admin-dashboard/:path*",
    "/admin-employees/:path*",
    "/login",
    "/register",
    "/employee-dashboard",
    "/admin-notification"
  ],
};