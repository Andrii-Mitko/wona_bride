import { NextRequest } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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
