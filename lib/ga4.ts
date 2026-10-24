import "server-only";

import { BetaAnalyticsDataClient } from "@google-analytics/data";
import type { AnalyticsData, AnalyticsPeriod } from "@/lib/ga4-types";

export type { AnalyticsData, AnalyticsPeriod } from "@/lib/ga4-types";

type MetricRow =
  | {
      metricValues?: ({ value?: string | null } | null)[] | null;
    }
  | null
  | undefined;

function getMetricValue(row: MetricRow, index: number): number {
  return Number(row?.metricValues?.[index]?.value ?? 0);
}

export async function getGA4Analytics(
  period: AnalyticsPeriod,
): Promise<AnalyticsData> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!propertyId || !clientEmail || !privateKey) {
    throw new Error("GA4_CONFIGURATION_MISSING");
  }

  const client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  });

  const dateRange = {
    startDate: `${period - 1}daysAgo`,
    endDate: "today",
  };

  const [
    overviewReport,
    dailyReport,
    sourcesReport,
    pagesReport,
    devicesReport,
  ] = await Promise.all([
    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [dateRange],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
        { name: "averageSessionDuration" },
      ],
    }),

    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [dateRange],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),

    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [dateRange],
      dimensions: [{ name: "sessionSourceMedium" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 10,
    }),

    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [dateRange],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    }),

    client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [dateRange],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    }),
  ]);

  const overview = overviewReport[0];
  const daily = dailyReport[0];
  const sources = sourcesReport[0];
  const pages = pagesReport[0];
  const devices = devicesReport[0];

  const summaryRow = overview.rows?.[0];

  return {
    period,

    summary: {
      activeUsers: getMetricValue(summaryRow, 0),
      screenPageViews: getMetricValue(summaryRow, 1),
      sessions: getMetricValue(summaryRow, 2),
      averageSessionDuration: getMetricValue(summaryRow, 3),
    },

    daily: (daily.rows ?? []).map((row) => {
      const date = row.dimensionValues?.[0]?.value ?? "";

      return {
        date: date
          ? `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`
          : "",
        activeUsers: getMetricValue(row, 0),
        pageViews: getMetricValue(row, 1),
      };
    }),

    sources: (sources.rows ?? []).map((row) => ({
      source: row.dimensionValues?.[0]?.value ?? "Unknown",
      sessions: getMetricValue(row, 0),
    })),

    pages: (pages.rows ?? []).map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? "/",
      views: getMetricValue(row, 0),
    })),

    devices: (devices.rows ?? []).map((row) => ({
      device: row.dimensionValues?.[0]?.value ?? "unknown",
      sessions: getMetricValue(row, 0),
    })),
  };
}
