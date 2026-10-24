import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getGA4Analytics, type AnalyticsPeriod } from "@/lib/ga4";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_PERIODS = new Set<number>([7, 30, 90]);

export async function GET(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Немає доступу" }, { status: 401 });
    }

    const url = new URL(request.url);
    const periodParam = Number(url.searchParams.get("period") ?? "30");

    if (!ALLOWED_PERIODS.has(periodParam)) {
      return NextResponse.json(
        { error: "Непідтримуваний період аналітики" },
        { status: 400 },
      );
    }

    const data = await getGA4Analytics(periodParam as AnalyticsPeriod);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("GA4 analytics error:", error);

    if (
      error instanceof Error &&
      error.message === "GA4_CONFIGURATION_MISSING"
    ) {
      return NextResponse.json(
        { error: "Аналітика GA4 не налаштована на сервері" },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Не вдалося отримати аналітику GA4" },
      { status: 502 },
    );
  }
}
