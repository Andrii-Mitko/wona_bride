import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import DressModel from "@/models/DressModel";

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
    await connectDB();

    const body = await request.json();

    const dress = await DressModel.create(body);

    return NextResponse.json(dress, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Не вдалося створити сукню",
      },
      {
        status: 500,
      },
    );
  }
}
