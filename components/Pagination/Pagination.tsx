import Link from "next/link";

import css from "./Pagination.module.css";

type PageItem = number | "...";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  pathname: string;
  query?: Record<string, string | number | boolean | undefined>;
};

// Перша, остання, поточна та сусідні сторінки; пропуски замінюємо на "..."
const getPages = (current: number, total: number): PageItem[] => {
  const numbers = [...new Set([1, current - 1, current, current + 1, total])]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);

  return numbers.reduce<PageItem[]>((acc, n, i) => {
    if (i > 0 && n - numbers[i - 1] > 1) acc.push("...");
    acc.push(n);
    return acc;
  }, []);
};

export default function Pagination({
  totalPages,
  currentPage,
  pathname,
  query,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const baseParams = new URLSearchParams();

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      baseParams.set(key, String(value));
    }
  });

  const getHref = (page: number) => {
    const params = new URLSearchParams(baseParams);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav aria-label="Пагінація">
      <ul className={css.pagination}>
        <li className={isFirst ? css.disabled : ""}>
          {isFirst ? (
            <span className={css.pageLink} aria-disabled="true">
              ‹
            </span>
          ) : (
            <Link
              href={getHref(currentPage - 1)}
              className={css.pageLink}
              aria-label="Попередня сторінка"
            >
              ‹
            </Link>
          )}
        </li>

        {getPages(currentPage, totalPages).map((item, index) =>
          item === "..." ? (
            <li key={`dots-${index}`} className={css.dots} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item} className={item === currentPage ? css.active : ""}>
              <Link
                href={getHref(item)}
                className={css.pageLink}
                aria-current={item === currentPage ? "page" : undefined}
                aria-label={`Сторінка ${item}`}
              >
                {item}
              </Link>
            </li>
          ),
        )}

        <li className={isLast ? css.disabled : ""}>
          {isLast ? (
            <span className={css.pageLink} aria-disabled="true">
              ›
            </span>
          ) : (
            <Link
              href={getHref(currentPage + 1)}
              className={css.pageLink}
              aria-label="Наступна сторінка"
            >
              ›
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
