"use client";

import { useState } from "react";

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

  async function changeStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;

    setCurrentStatus(newStatus);

    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });
  }

  return (
    <select value={currentStatus} onChange={changeStatus}>
      {statuses.map((status) => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
