import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { appointmentSchema } from "@/lib/validation/appointment";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = appointmentSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const data = result.data;

    await connectDB();

    await Appointment.create({
      ...data,
      status: "new",
    });
    const message = `
🔔 Нова заявка на ПРИМІРКУ
👗 Сукня:
${data.dressName}
📏 Розмір:
${data.sizes && data.sizes.length > 0 ? data.sizes.join(", ") : "не вказано"}
👤 Ім'я:
${data.name}
📞 Телефон:
${data.phone}
📅 Дата:
${data.date || "-"}
⏰ Час:
${data.time || "-"}
💬 Повідомлення:
${data.message || "-"}
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

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
