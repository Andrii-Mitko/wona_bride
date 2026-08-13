// components\AdminFilterSelect\AdminFilterSelect.tsx

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import css from "./AdminFilterSelect.module.css";

type Option = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  value: string;
  options: Option[];
};

export default function AdminFilterSelect({ name, value, options }: Props) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  function handleChange(nextValue: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextValue) {
      params.set(name, nextValue);
    } else {
      params.delete(name);
    }

    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={value}
      onChange={(event) => handleChange(event.target.value)}
      className={css.select}
    >
      {options.map((option, index) => (
        <option key={`${name}-${index}-${option.value}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
