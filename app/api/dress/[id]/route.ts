// app\api\dress\[id]\route.ts

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

    delete body.slug;

    const dress = await DressModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(dress);
  } catch (error: unknown) {
    console.error(error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      const mongoError = error as {
        keyPattern?: Record<string, unknown>;
      };

      const duplicateField = mongoError.keyPattern
        ? Object.keys(mongoError.keyPattern)[0]
        : "полем";

      const fieldNames: Record<string, string> = {
        slug: "назвою",
        article: "артикулом",
      };

      return NextResponse.json(
        {
          error: `Сукня з таким ${fieldNames[duplicateField] ?? duplicateField} вже існує.`,
        },
        {
          status: 409,
        },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        },
      );
    }

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
