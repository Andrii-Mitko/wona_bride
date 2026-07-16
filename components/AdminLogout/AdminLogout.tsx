"use client";

import { useRouter } from "next/navigation";
import css from "./AdminLogout.module.css";

export default function AdminLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button className={css.button} onClick={handleLogout}>
      🚪 Вийти з адмінки
    </button>
  );
}
