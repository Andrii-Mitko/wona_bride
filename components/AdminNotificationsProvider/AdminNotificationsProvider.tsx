"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Notifications = {
  orders: number;
  appointments: number;
  feedbacks: number;
};

const NotificationsContext = createContext<Notifications>({
  orders: 0,
  appointments: 0,
  feedbacks: 0,
});

export function AdminNotificationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notifications>({
    orders: 0,
    appointments: 0,
    feedbacks: 0,
  });

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/notifications");

      const data = await res.json();

      setNotifications(data);
    }

    load();
  }, []);

  return (
    <NotificationsContext.Provider value={notifications}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useAdminNotifications() {
  return useContext(NotificationsContext);
}
