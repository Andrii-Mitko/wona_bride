import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

import { feedbackSchema } from "@/lib/validation/feedback";

// получить отзывы
export async function GET() {
  await connectDB();

  const feedbacks = await Feedback.find({
    approved: true,
  }).sort({
    createdAt: -1,
  });

  return NextResponse.json(feedbacks);
}

// добавить отзыв
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const result = feedbackSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Некоректні дані",
          errors: result.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const feedback = await Feedback.create({
      name: result.data.name,
      text: result.data.text,
      rating: result.data.rating,
    });

    return NextResponse.json(feedback, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Помилка сервера",
      },
      {
        status: 500,
      },
    );
  }
}
