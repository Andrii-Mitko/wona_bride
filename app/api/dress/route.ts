import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import DressModel from "@/models/DressModel";
import { dressSchema } from "@/lib/validation/dress";

export async function GET() {
  try {
    await connectDB();

    const dresses = await DressModel.find().sort({ createdAt: -1 });

    return NextResponse.json(dresses);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Не вдалося отримати сукні" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Немає доступу" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();

    const result = dressSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Некоректні дані",
          errors: result.error.flatten(),
        },
        { status: 400 },
      );
    }

    const dress = await DressModel.create({
      ...result.data,
      slug: body.slug,
    });

    return NextResponse.json(dress, {
      status: 201,
    });
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
        error: "Помилка створення сукні",
      },
      {
        status: 500,
      },
    );
  }
}
