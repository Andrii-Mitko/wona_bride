"use client";

import { useRouter } from "next/navigation";
import css from "./BackButton.module.css";

export default function BackButton() {
  const router = useRouter();

  return (
    <button type="button" className={css.button} onClick={() => router.back()}>
      ← Назад
    </button>
  );
}
