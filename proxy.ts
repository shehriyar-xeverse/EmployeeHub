import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  const isDashboard = pathname.startsWith("/dashboard");
  const isHome = pathname === "/";

  if (token) {
    if (isLoginPage || isRegisterPage || isHome) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    if (isDashboard || isHome) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
