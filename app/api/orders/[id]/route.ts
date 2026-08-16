import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { isAdminAuthenticated } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ message: "Немає доступу" }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const { status } = await req.json();

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    return Response.json(order);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Помилка оновлення",
      },
      {
        status: 500,
      },
    );
  }
}
