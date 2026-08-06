"use client";

import { useAdminNotifications } from "@/components/AdminNotificationsProvider/AdminNotificationsProvider";

type Props = {
  type: "orders" | "appointments" | "feedbacks";
};

export default function AdminBadge({ type }: Props) {
  const notifications = useAdminNotifications();

  const count = notifications[type];

  if (!count) {
    return null;
  }

  return <span>{count}</span>;
}
