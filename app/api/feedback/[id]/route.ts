import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

// изменить отзыв
export async function PATCH(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  await connectDB();

  const { id } = await context.params;

  const body = await req.json();

  const feedback = await Feedback.findByIdAndUpdate(
    id,
    {
      ...body,
    },
    {
      new: true,
    },
  );

  if (!feedback) {
    return NextResponse.json(
      {
        message: "Відгук не знайдено",
      },
      {
        status: 404,
      },
    );
  }

  revalidatePath("/");

  return NextResponse.json(feedback);
}

// удалить отзыв
export async function DELETE(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  await connectDB();

  const { id } = await context.params;

  const feedback = await Feedback.findByIdAndDelete(id);

  if (!feedback) {
    return NextResponse.json(
      {
        message: "Відгук не знайдено",
      },
      {
        status: 404,
      },
    );
  }

  revalidatePath("/");

  return NextResponse.json({
    message: "Відгук видалено",
  });
}
