import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import DressModel from "@/models/DressModel";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    await connectDB();

    const { id } = await params;

    const dress = await DressModel.findById(id).lean();

    if (!dress) {
      return NextResponse.json(
        {
          error: "Сукню не знайдено",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(dress);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Помилка сервера",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(request: Request, { params }: Props) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const dress = await DressModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!dress) {
      return NextResponse.json(
        {
          error: "Сукню не знайдено",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(dress);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Помилка оновлення сукні",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    await connectDB();

    const { id } = await params;

    const dress = await DressModel.findByIdAndDelete(id);

    if (!dress) {
      return NextResponse.json(
        {
          error: "Сукню не знайдено",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Помилка видалення сукні",
      },
      {
        status: 500,
      },
    );
  }
}
