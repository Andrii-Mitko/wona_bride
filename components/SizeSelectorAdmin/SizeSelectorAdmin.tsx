"use client";

import css from "./SizeSelectorAdmin.module.css";

type Props = {
  sizes: string[];
  selectedSizes: string[];
  onChange: (sizes: string[]) => void;
};

export default function SizeSelectorAdmin({
  sizes,
  selectedSizes,
  onChange,
}: Props) {
  const handleChange = (size: string) => {
    if (selectedSizes.includes(size)) {
      onChange(selectedSizes.filter((item) => item !== size));
    } else {
      onChange([...selectedSizes, size]);
    }
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Доступні розміри</h3>

      <div className={css.list}>
        {sizes.map((size) => (
          <label key={size} className={css.item}>
            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={() => handleChange(size)}
            />

            {size}
          </label>
        ))}
      </div>
    </div>
  );
}
