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

  const searchParamsString = searchParams.toString();

  const [value, setValue] = useState(() => defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParamsString);

      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

      const next = params.toString();

      if (next === searchParamsString) {
        return;
      }

      router.replace(`${pathname}?${next}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, pathname, router, searchParamsString]);

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
