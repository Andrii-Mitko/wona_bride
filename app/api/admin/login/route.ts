import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { login, password } = await req.json();

  if (
    login !== process.env.ADMIN_LOGIN ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Невірний логін або пароль",
      },
      {
        status: 401,
      },
    );
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("admin-auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
