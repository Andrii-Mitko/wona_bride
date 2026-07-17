"use client";

import { useState } from "react";
import css from "./OrderStatus.module.css";

type Props = {
  id: string;
  status: string;
};

const statuses = [
  {
    value: "new",
    label: "🟡 Нове",
  },
  {
    value: "confirmed",
    label: "🔵 Підтверджене",
  },
  {
    value: "completed",
    label: "🟢 Виконане",
  },
  {
    value: "cancelled",
    label: "🔴 Скасоване",
  },
];

export default function OrderStatus({ id, status }: Props) {
  const [currentStatus, setCurrentStatus] = useState(status);

  const [loading, setLoading] = useState(false);

  async function changeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;

    setLoading(true);

    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status: newStatus,
      }),
    });

    if (response.ok) {
      setCurrentStatus(newStatus);
    } else {
      alert("Не вдалося змінити статус");
    }

    setLoading(false);
  }

  return (
    <>
      <select
        className={css.select}
        disabled={loading}
        value={currentStatus}
        onChange={changeStatus}
      >
        {statuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>

      {loading && <span className={css.loading}>Збереження...</span>}
    </>
  );
}
