"use client";

import { useEffect, useState } from "react";

type Props = {
  type: "orders" | "appointments" | "feedbacks";
};

export default function AdminBadge({ type }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/admin/notifications");

      const data = await res.json();

      setCount(data[type]);
    };

    load();

    const interval = setInterval(load, 30000);

    return () => clearInterval(interval);
  }, [type]);

  if (!count) return null;

  return <span>{count}</span>;
}
