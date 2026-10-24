import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
} from "@/lib/auth";

export const runtime = "nodejs";

function safeEqual(value: string, expected: string): boolean {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  return (
    valueBuffer.length === expectedBuffer.length &&
    timingSafeEqual(valueBuffer, expectedBuffer)
  );
}

export async function POST(request: Request) {
  try {
    const adminLogin = process.env.ADMIN_LOGIN;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminLogin || !adminPassword) {
      console.error("Admin credentials are not configured");

      return NextResponse.json(
        { success: false, message: "Помилка конфігурації сервера" },
        { status: 500 },
      );
    }

    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("login" in body) ||
      !("password" in body) ||
      typeof body.login !== "string" ||
      typeof body.password !== "string" ||
      body.login.length > 200 ||
      body.password.length > 200
    ) {
      return NextResponse.json(
        { success: false, message: "Невірний логін або пароль" },
        { status: 401 },
      );
    }

    if (
      !safeEqual(body.login, adminLogin) ||
      !safeEqual(body.password, adminPassword)
    ) {
      return NextResponse.json(
        { success: false, message: "Невірний логін або пароль" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ADMIN_SESSION_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { success: false, message: "Помилка сервера" },
      { status: 500 },
    );
  }
}
