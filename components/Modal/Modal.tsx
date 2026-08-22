"use client";

import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import css from "./Modal.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const emptySubscribe = () => () => {};

export default function Modal({ isOpen, onClose, children }: Props) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !isMounted) {
    return null;
  }

  return createPortal(
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className={css.close}
          onClick={onClose}
          aria-label="Закрити"
        >
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
    </div>,
    document.body,
  );
}
