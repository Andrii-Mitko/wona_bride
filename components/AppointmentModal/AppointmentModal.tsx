"use client";

import { useState } from "react";

import Modal from "@/components/Modal/Modal";
import AppointmentForm from "@/components/AppointmentForm/AppointmentForm";

import css from "./AppointmentModal.module.css";

type Props = {
  dressName: string;
};

export default function AppointmentModal({ dressName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={css.button} onClick={() => setIsOpen(true)}>
        Записатися на примірку
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AppointmentForm dressName={dressName} />
      </Modal>
    </>
  );
}
