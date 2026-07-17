"use client";

import { useRouter } from "next/navigation";
import css from "./AdminLogout.module.css";

export default function AdminLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/admin/logout", {
      method: "POST",
    });

    if (response.ok) {
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <button className={css.button} onClick={handleLogout}>
      🚪 Вийти з адмінки
    </button>
  );
}
