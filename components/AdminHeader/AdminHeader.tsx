"use client";

import { useState } from "react";
import Link from "next/link";

import css from "./AdminHeader.module.css";
import AdminLogout from "@/components/AdminLogout/AdminLogout";
import AdminBadge from "@/components/AdminBadge/AdminBadge";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/admin" className={css.logo}>
          WONA ADMIN
        </Link>

        <button
          className={css.menuButton}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Відкрити меню"
        >
          ☰
        </button>

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

      {open && (
        <>
          <div className={css.overlay} onClick={() => setOpen(false)} />

          <aside className={css.mobileMenu}>
            <button
              className={css.closeButton}
              type="button"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <Link href="/admin" onClick={() => setOpen(false)}>
              Головна
            </Link>

            <Link href="/admin/dresses" onClick={() => setOpen(false)}>
              Сукні
            </Link>

            <Link href="/admin/orders" onClick={() => setOpen(false)}>
              Замовлення 🛒 <AdminBadge type="orders" />
            </Link>

            <Link href="/admin/appointments" onClick={() => setOpen(false)}>
              Примірки 👰 <AdminBadge type="appointments" />
            </Link>

            <Link href="/admin/feedback" onClick={() => setOpen(false)}>
              Відгуки ⭐ <AdminBadge type="feedbacks" />
            </Link>

            <Link href="/" onClick={() => setOpen(false)}>
              🌐 Магазин
            </Link>

            <AdminLogout />
          </aside>
        </>
      )}
    </header>
  );
}
