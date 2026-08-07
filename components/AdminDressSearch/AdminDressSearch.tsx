"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import css from "./AdminDressSearch.module.css";

type Props = {
  defaultValue: string;
};

export default function AdminDressSearch({ defaultValue }: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (value === currentSearch) {
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

      router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, currentSearch, pathname, router, searchParams]);

  return (
    <input
      type="search"
      value={value}
      placeholder="Пошук за артикулом або назвою..."
      onChange={(event) => setValue(event.target.value)}
      className={css.input}
    />
  );
}
