"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

import css from "./Pagination.module.css";

type Props = {
  page: number;
  totalPages: number;
};

export default function Pagination({ page, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handlePageChange(selected: number) {
    const params = new URLSearchParams(searchParams);

    if (selected === 1) {
      params.delete("page");
    } else {
      params.set("page", selected.toString());
    }

    const query = params.toString();

    router.push(`/catalog${query ? `?${query}` : ""}`);
  }

  return (
    <ReactPaginate
      className={css.pagination}
      breakLabel="..."
      previousLabel="‹"
      nextLabel="›"
      pageCount={totalPages}
      forcePage={page - 1}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={(event) => handlePageChange(event.selected + 1)}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
    />
  );
}
