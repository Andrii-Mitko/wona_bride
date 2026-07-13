export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("Нова заявка:", data);

    const message = `
🕊 Нова заявка WONA Bride

👗 Сукня:
${data.dressName}

📏 Розмір:
${data.sizes.join(", ")}

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
