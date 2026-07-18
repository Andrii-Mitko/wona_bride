import Link from "next/link";
import css from "./AdminHeader.module.css";
import AdminLogout from "@/components/AdminLogout/AdminLogout";

export default function AdminHeader() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/admin" className={css.logo}>
          WONA ADMIN
        </Link>

        <nav className={css.nav}>
          <Link href="/admin">Головна</Link>

          <Link href="/admin/dresses">Сукні</Link>

          <Link href="/admin/orders">Замовлення</Link>

          <Link href="/admin/appointments">Примірки</Link>
          <Link href="/admin/feedback">Відгуки</Link>
        </nav>

        <div className={css.actions}>
          <Link href="/" className={css.siteLink}>
            🌐 Перейти до магазину
          </Link>

          <AdminLogout />
        </div>
      </div>
    </header>
  );
}
