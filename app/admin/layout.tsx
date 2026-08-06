import AdminHeader from "@/components/AdminHeader/AdminHeader";
import css from "./admin.module.css";
import { AdminNotificationsProvider } from "@/components/AdminNotificationsProvider/AdminNotificationsProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminNotificationsProvider>
      <AdminHeader />

      <main className={css.container}>{children}</main>
    </AdminNotificationsProvider>
  );
}
