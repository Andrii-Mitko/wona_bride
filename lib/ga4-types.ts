// lib/ga4-types.ts
export type AnalyticsPeriod = 7 | 30 | 90;

export type AnalyticsData = {
  period: AnalyticsPeriod;
  summary: {
    activeUsers: number;
    screenPageViews: number;
    sessions: number;
    averageSessionDuration: number;
  };
  daily: {
    date: string;
    activeUsers: number;
    pageViews: number;
  }[];
  sources: {
    source: string;
    sessions: number;
  }[];
  pages: {
    path: string;
    views: number;
  }[];
  devices: {
    device: string;
    sessions: number;
  }[];
};
