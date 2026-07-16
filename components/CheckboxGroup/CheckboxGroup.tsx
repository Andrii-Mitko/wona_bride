"use client";

import css from "./CheckboxGroup.module.css";

type Option = {
  value: string;
  label: string;
};

type Props = {
  title: string;
  options: Option[];
  selected: string[];
  onChange: (value: string[]) => void;
};

export default function CheckboxGroup({
  title,
  options,
  selected,
  onChange,
}: Props) {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>{title}</h3>

      <div className={css.list}>
        {options.map((option) => (
          <label key={option.value} className={css.item}>
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => handleToggle(option.value)}
            />

            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
