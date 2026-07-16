import Link from "next/link";
import css from "./appointment-success.module.css";

export default function AppointmentSuccessPage() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Дякуємо за запис ❤️</h1>

        <p className={css.text}>
          Вашу заявку на примірку отримано. Найближчим часом ми зв`яжемося з
          вами для підтвердження дати та часу.
        </p>

        <Link href="/" className={css.button}>
          Повернутися на головну
        </Link>
      </div>
    </section>
  );
}
