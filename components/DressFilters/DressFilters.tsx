"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import AdminFilterSelect from "@/components/AdminFilterSelect/AdminFilterSelect";
import Modal from "@/components/Modal/Modal";
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

  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(initialMinPrice ?? "");
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice ?? "");

  const activeFiltersCount =
    (initialMinPrice ? 1 : 0) +
    (initialMaxPrice ? 1 : 0) +
    (activeSize ? 1 : 0);

  function applyFilters() {
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
    setIsOpen(false);
  }

  function resetFilters() {
    setMinPrice("");
    setMaxPrice("");

    const params = new URLSearchParams(searchParams.toString());

    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("size");
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={css.filterButton}
      >
        Фільтри
        {activeFiltersCount > 0 && (
          <span className={css.badge}>{activeFiltersCount}</span>
        )}
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3 className={css.modalTitle}>Фільтри</h3>

        <div className={css.field}>
          <label className={css.label}>Ціна, грн</label>

          <div className={css.priceGroup}>
            <input
              type="number"
              min={0}
              placeholder="Від"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              className={css.priceInput}
            />

            <span className={css.priceDivider}>—</span>

            <input
              type="number"
              min={0}
              placeholder="До"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className={css.priceInput}
            />
          </div>
        </div>

        <div className={css.field}>
          <label className={css.label}>Розмір</label>

          <AdminFilterSelect
            name="size"
            value={activeSize}
            options={sizeOptions}
          />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            onClick={resetFilters}
            className={css.resetButton}
          >
            Скинути
          </button>

          <button
            type="button"
            onClick={applyFilters}
            className={css.applyButton}
          >
            Застосувати
          </button>
        </div>
      </Modal>
    </>
  );
}
