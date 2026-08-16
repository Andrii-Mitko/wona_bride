import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // страницу входа не защищаем
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const isAdminAuthenticated =
    request.cookies.get("admin-auth")?.value === "true";

  if (!isAdminAuthenticated && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
