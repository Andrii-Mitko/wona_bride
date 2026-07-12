import Link from "next/link";

import css from "./Pagination.module.css";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  category?: string;
};

export default function Pagination({
  totalPages,
  currentPage,
  category,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <ul className={css.pagination}>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        const params = new URLSearchParams();

        params.set("page", String(page));

        if (category) {
          params.set("category", category);
        }

        return (
          <li key={page} className={page === currentPage ? css.active : ""}>
            <Link
              href={`/catalog?${params.toString()}`}
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
