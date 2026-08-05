import Link from "next/link";

import css from "./Pagination.module.css";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  pathname: string;
  query?: Record<string, string | number | undefined>;
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

  return (
    <ul className={css.pagination}>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        const params = new URLSearchParams();

        Object.entries(query ?? {}).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            params.set(key, String(value));
          }
        });

        params.set("page", String(page));

        return (
          <li key={page} className={page === currentPage ? css.active : ""}>
            <Link
              href={`${pathname}?${params.toString()}`}
              className={css.pageLink}
            >
              {page}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
