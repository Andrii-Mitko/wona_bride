import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
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

      <section className={css.card}>
        <Link
          href="/admin/dresses"
          className={`${css.card} ${css.cardDresses}`}
        >
          <span>👗</span>
          <h2>Всього суконь</h2>
          <strong>{dressesCount}</strong>
        </Link>

        <Link href="/admin/orders" className={`${css.card} ${css.cardOrders}`}>
          <span>🛒</span>
          <h2>Нові замовлення</h2>
          <strong>{newOrdersCount}</strong>
        </Link>

        <Link
          href="/admin/appointments?status=new"
          className={`${css.card} ${css.cardAppointments}`}
        >
          <span>👰</span>
          <h2>Нові примірки</h2>
          <strong>{newAppointmentsCount}</strong>
        </Link>

        <Link
          href="/admin/feedback?status=new"
          className={`${css.card} ${css.cardFeedback}`}
        >
          <span>⭐</span>
          <h2>Нові відгуки</h2>
          <strong>{feedbackCount}</strong>
        </Link>
      </section>
    </main>
  );
}
