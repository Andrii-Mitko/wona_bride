// components\Modal\Modal.tsx

"use client";

import { ReactNode, useEffect } from "react";
import css from "./Modal.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.close} onClick={onClose} aria-label="Закрити">
          <svg
            width="20"
            height="20"
            aria-hidden="true"
            className={css.closeIcon}
          >
            <use href="/icons/icons.svg#icon-x" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
}
