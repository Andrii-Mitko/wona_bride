"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import Modal from "@/components/Modal/Modal";
import AppointmentForm from "@/components/AppointmentForm/AppointmentForm";

import css from "./AppointmentModal.module.css";

type Props = {
  dressName: string;
  sizes: string[];
  sizeType: "letter" | "women" | "kids";
};

export default function AppointmentModal({
  dressName,
  sizes,
  sizeType,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);

    toast.success("Дякуємо! Ми зв'яжемося з вами.");
  };

  return (
    <>
      <button className={css.button} onClick={() => setIsOpen(true)}>
        Записатися на примірку
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AppointmentForm
          dressName={dressName}
          sizes={sizes}
          sizeType={sizeType}
          onSuccess={handleSuccess}
        />
      </Modal>
    </>
  );
}
