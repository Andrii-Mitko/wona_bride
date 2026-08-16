import { NextResponse } from "next/server";
import { sendTelegram } from "@/lib/telegram";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { createOrderSchema } from "@/lib/validation/order";

type OrderItem = {
  name: string;
  size: string;
  price: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = createOrderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Некоректні дані замовлення",
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const data = result.data;

    await connectDB();

    const order = await Order.create({
      ...data,
      status: "new",
    });

    const items = data.items
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
${data.customer.name}
📞 Телефон:
${data.customer.phone}
📧 Email:
${data.customer.email}
${items}
💰 Разом:
${data.total} ₴
💬 Коментар:
${data.customer.comment || "-"}
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
