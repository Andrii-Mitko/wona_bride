import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/mongodb";

import DressModel from "@/models/DressModel";
import Order from "@/models/Order";
import Appointment from "@/models/Appointment";
import Feedback from "@/models/Feedback";

import css from "./admin.module.css";

export default async function AdminPage() {
  const cookieStore = await cookies();

  const adminAuth = cookieStore.get("admin-auth");

  if (!adminAuth || adminAuth.value !== "true") {
    redirect("/admin/login");
  }

  await connectDB();

  const [dressesCount, newOrdersCount, newAppointmentsCount, feedbackCount] =
    await Promise.all([
      DressModel.countDocuments(),

      Order.countDocuments({
        status: "new",
      }),

      Appointment.countDocuments({
        status: "new",
      }),

      Feedback.countDocuments({
        status: "new",
      }),
    ]);

  return (
    <main className={css.dashboard}>
      <h1 className={css.title}>Адмін панель WONA Bride</h1>

      <p className={css.subtitle}>Керування магазином весільних суконь</p>

      <section className={css.stats}>
        <article className={css.card}>
          <span>👗</span>

          <h2>Всього суконь</h2>

          <strong>{dressesCount}</strong>
        </article>

        <article className={css.card}>
          <span>🛒</span>

          <h2>Нові замовлення</h2>

          <strong>{newOrdersCount}</strong>
        </article>

        <article className={css.card}>
          <span>👰</span>

          <h2>Нові примірки</h2>

          <strong>{newAppointmentsCount}</strong>
        </article>

        <article className={css.card}>
          <span>⭐</span>

          <h2>Нові відгуки</h2>

          <strong>{feedbackCount}</strong>
        </article>
      </section>
    </main>
  );
}
