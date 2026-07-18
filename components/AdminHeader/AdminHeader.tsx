import Link from "next/link";
import css from "./AdminHeader.module.css";
import AdminLogout from "@/components/AdminLogout/AdminLogout";
import AdminBadge from "@/components/AdminBadge/AdminBadge";

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

          <Link href="/admin/orders">
            Замовлення 🛒 <AdminBadge type="orders" />
          </Link>

          <Link href="/admin/appointments">
            Примірки 👰 <AdminBadge type="appointments" />
          </Link>
          <Link href="/admin/feedback">
            Відгуки ⭐ <AdminBadge type="feedbacks" />
          </Link>
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
