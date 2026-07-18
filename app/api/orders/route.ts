import { NextResponse } from "next/server";
import { sendTelegram } from "@/lib/telegram";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

type OrderItem = {
  name: string;
  size: string;
  price: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await connectDB();

    const order = await Order.create({
      ...body,
      status: "new",
    });

    const items = body.items
      .map(
        (item: OrderItem) =>
          `👗 ${item.name}
📏 Розмір: ${item.size}
💰 ${item.price} ₴`,
      )
      .join("\n\n");

    const message = `
🛒 Нове замовлення на ПОКУПКУ
👤 Клієнт:
${body.customer.name}
📞 Телефон:
${body.customer.phone}
📧 Email:
${body.customer.email}
${items}
💰 Разом:
${body.total} ₴
💬 Коментар:
${body.customer.comment || "-"}
🆕 Статус:
Нове замовлення
`;
    await sendTelegram(message);

    return NextResponse.json(
      {
        success: true,
        order,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Помилка створення замовлення",
      },
      {
        status: 500,
      },
    );
  }
}
