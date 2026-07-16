import Link from "next/link";
import css from "./success.module.css";

export default function SuccessPage() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Дякуємо за ваше замовлення ❤️</h1>

        <p className={css.text}>
          Ваше замовлення прийнято. Ми зв’яжемося з вами найближчим часом для
          підтвердження деталей.
        </p>

        <Link href="/catalog" className={css.button}>
          Повернутися до каталогу
        </Link>
      </div>
    </section>
  );
}
