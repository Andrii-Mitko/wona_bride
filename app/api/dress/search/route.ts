import { NextRequest, NextResponse } from "next/server";
import { getDresses } from "@/lib/api/dresses";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("query")?.trim();

    if (!query || query.length < 2) {
      return NextResponse.json({ dresses: [] });
    }

    const { dresses } = await getDresses({
      query,
      limit: 5,
    });

    return NextResponse.json({ dresses });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Помилка пошуку" }, { status: 500 });
  }
}
