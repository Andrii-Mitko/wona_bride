import AdminHeader from "@/components/AdminHeader/AdminHeader";
import css from "./admin.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />

      <main className={css.container}>{children}</main>
    </>
  );
}
