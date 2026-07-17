import css from "./admin.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const cookieStore = await cookies();

  const adminAuth = cookieStore.get("admin-auth");

  if (!adminAuth || adminAuth.value !== "true") {
    redirect("/admin/login");
  }
  return (
    <main className={css.container}>
      <h1 className={css.title}>Адмін панель WONA Bride</h1>

      <p>Виберіть розділ у меню.</p>
    </main>
  );
}
