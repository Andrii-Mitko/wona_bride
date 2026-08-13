"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import AdminFilterSelect from "@/components/AdminFilterSelect/AdminFilterSelect";
import { dressSizes } from "@/data/sizes";

import css from "./DressFilters.module.css";

const allSizes = [
  ...dressSizes.letter,
  ...dressSizes.women,
  ...dressSizes.kids,
];

const sizeOptions = [
  { value: "", label: "Всі розміри" },
  ...allSizes.map((size) => ({ value: size, label: size })),
];

type Props = {
  initialMinPrice?: string;
  initialMaxPrice?: string;
  activeSize: string;
};

export default function DressFilters({
  initialMinPrice,
  initialMaxPrice,
  activeSize,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(initialMinPrice ?? "");
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice ?? "");

  function applyPriceFilter() {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={css.filters}>
      <div className={css.priceGroup}>
        <input
          type="number"
          min={0}
          placeholder="Ціна від"
          value={minPrice}
          onChange={(event) => setMinPrice(event.target.value)}
          className={css.priceInput}
        />

        <span className={css.priceDivider}>—</span>

        <input
          type="number"
          min={0}
          placeholder="Ціна до"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
          className={css.priceInput}
        />

        <button
          type="button"
          onClick={applyPriceFilter}
          className={css.applyButton}
        >
          Застосувати
        </button>
      </div>

      <AdminFilterSelect name="size" value={activeSize} options={sizeOptions} />
    </div>
  );
}
