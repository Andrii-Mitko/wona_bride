import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

type OrderItem = {
  name: string;
  size: string;
  price: number;
  quantity: number;
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
💰 ${item.price} ₴
Кількість: ${item.quantity}`,
      )
      .join("\n\n");

    const message = `
🛒 НОВЕ ЗАМОВЛЕННЯ WONA Bride

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

    await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
        }),
      },
    );

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
