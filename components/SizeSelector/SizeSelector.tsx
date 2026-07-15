"use client";

import { useState } from "react";
import css from "./SizeSelector.module.css";

type Props = {
  sizes: string[];
  onSelect: (size: string) => void;
};

export default function SizeSelector({ sizes, onSelect }: Props) {
  const [selected, setSelected] = useState<string>("");

  const handleClick = (size: string) => {
    setSelected(size);
    onSelect(size);
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Оберіть розмір</h3>

      <div className={css.list}>
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => handleClick(size)}
            className={`${css.item} ${selected === size ? css.active : ""}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
