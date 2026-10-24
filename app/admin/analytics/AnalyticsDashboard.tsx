"use client";

import { useEffect, useState } from "react";
import type { AnalyticsData, AnalyticsPeriod } from "@/lib/ga4";
import css from "./analytics.module.css";

const PERIODS: { value: AnalyticsPeriod; label: string }[] = [
  { value: 7, label: "7 днів" },
  { value: 30, label: "30 днів" },
  { value: 90, label: "90 днів" },
];

function formatNumber(value: number): string {
  return new Intl.NumberFormat("uk-UA", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes} хв ${String(remainingSeconds).padStart(2, "0")} с`;
}

function formatDate(date: string): string {
  if (!date) return "";

  return new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(`${date}T12:00:00`));
}

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState<AnalyticsPeriod>(30);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadAnalytics() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/admin/analytics?period=${period}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        const result = (await response.json()) as
          | AnalyticsData
          | { error?: string };

        if (!response.ok) {
          throw new Error(
            "error" in result
              ? result.error
              : "Не вдалося завантажити аналітику",
          );
        }

        setData(result as AnalyticsData);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Не вдалося завантажити аналітику",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadAnalytics();

    return () => controller.abort();
  }, [period]);

  const daily = data?.daily ?? [];
  const maxViews = Math.max(1, ...daily.map((item) => item.pageViews));
  const chartPoints = daily
    .map((item, index) => {
      const x =
        daily.length > 1 ? 24 + (index / (daily.length - 1)) * 652 : 350;

      const y = 180 - (item.pageViews / maxViews) * 155;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className={css.dashboard}>
      <div className={css.header}>
        <div>
          <h1 className={css.title}>Аналітика WONA Bride</h1>
          <p className={css.subtitle}>
            Відвідуваність і поведінка користувачів на сайті
          </p>
        </div>

        <div className={css.periods} aria-label="Період аналітики">
          {PERIODS.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`${css.periodButton} ${
                period === item.value ? css.periodButtonActive : ""
              }`}
              aria-pressed={period === item.value}
              onClick={() => setPeriod(item.value)}
              disabled={loading && period === item.value}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className={css.message}>Завантаження аналітики…</p>}

      {!loading && error && (
        <div className={css.error} role="alert">
          <p>{error}</p>
          <button
            type="button"
            className={css.retryButton}
            onClick={() => setPeriod((current) => current)}
          >
            Спробувати ще раз
          </button>
        </div>
      )}

      {data && !error && (
        <>
          <div className={css.stats}>
            <article className={css.statCard}>
              <span className={css.statLabel}>Активні користувачі</span>
              <strong className={css.statValue}>
                {formatNumber(data.summary.activeUsers)}
              </strong>
            </article>

            <article className={css.statCard}>
              <span className={css.statLabel}>Перегляди сторінок</span>
              <strong className={css.statValue}>
                {formatNumber(data.summary.screenPageViews)}
              </strong>
            </article>

            <article className={css.statCard}>
              <span className={css.statLabel}>Сеанси</span>
              <strong className={css.statValue}>
                {formatNumber(data.summary.sessions)}
              </strong>
            </article>

            <article className={css.statCard}>
              <span className={css.statLabel}>Середня тривалість сеансу</span>
              <strong className={css.statValue}>
                {formatDuration(data.summary.averageSessionDuration)}
              </strong>
            </article>
          </div>

          <section className={css.panel}>
            <h2 className={css.panelTitle}>Перегляди за днями</h2>

            {daily.length > 0 ? (
              <>
                <div className={css.chart}>
                  <svg
                    viewBox="0 0 700 205"
                    role="img"
                    aria-label="Графік переглядів сторінок за днями"
                  >
                    {[25, 65, 105, 145, 180].map((y) => (
                      <line
                        key={y}
                        x1="24"
                        y1={y}
                        x2="676"
                        y2={y}
                        className={css.gridLine}
                      />
                    ))}

                    <polyline points={chartPoints} className={css.chartLine} />

                    {daily.map((item, index) => {
                      const x =
                        daily.length > 1
                          ? 24 + (index / (daily.length - 1)) * 652
                          : 350;

                      const y = 180 - (item.pageViews / maxViews) * 155;

                      return (
                        <circle
                          key={item.date}
                          cx={x}
                          cy={y}
                          r={daily.length <= 14 ? 3 : 1.8}
                          className={css.chartPoint}
                        >
                          <title>
                            {formatDate(item.date)}: {item.pageViews} переглядів
                          </title>
                        </circle>
                      );
                    })}
                  </svg>
                </div>

                <div className={css.chartLabels}>
                  <span>{formatDate(daily[0].date)}</span>
                  <span>{formatDate(daily[daily.length - 1].date)}</span>
                </div>
              </>
            ) : (
              <p className={css.empty}>За цей період даних ще немає.</p>
            )}
          </section>

          <div className={css.tables}>
            <section className={css.panel}>
              <h2 className={css.panelTitle}>Джерела трафіку</h2>

              {data.sources.length > 0 ? (
                <ul className={css.list}>
                  {data.sources.map((item) => (
                    <li key={item.source} className={css.listItem}>
                      <span>{item.source}</span>
                      <strong>{formatNumber(item.sessions)}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={css.empty}>Даних поки немає.</p>
              )}

              <p className={css.hint}>Кількість сеансів</p>
            </section>

            <section className={css.panel}>
              <h2 className={css.panelTitle}>Популярні сторінки</h2>

              {data.pages.length > 0 ? (
                <ul className={css.list}>
                  {data.pages.map((item) => (
                    <li key={item.path} className={css.listItem}>
                      <span className={css.path}>{item.path}</span>
                      <strong>{formatNumber(item.views)}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={css.empty}>Даних поки немає.</p>
              )}

              <p className={css.hint}>Кількість переглядів</p>
            </section>

            <section className={css.panel}>
              <h2 className={css.panelTitle}>Пристрої</h2>

              {data.devices.length > 0 ? (
                <ul className={css.list}>
                  {data.devices.map((item) => (
                    <li key={item.device} className={css.listItem}>
                      <span>{item.device}</span>
                      <strong>{formatNumber(item.sessions)}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={css.empty}>Даних поки немає.</p>
              )}

              <p className={css.hint}>Кількість сеансів</p>
            </section>
          </div>
        </>
      )}
    </section>
  );
}
