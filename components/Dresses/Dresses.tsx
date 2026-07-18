import Link from "next/link";

import DressGrid from "@/components/DressGrid/DressGrid";
import { getDresses } from "@/lib/api/dresses";

import css from "./Dresses.module.css";

const Dresses = async () => {
  const { dresses } = await getDresses({
    limit: 8,
  });

  return (
    <section className={css.section} id="dresses">
      <div className={css.container}>
        <div className={css.head}>
          <h2 className={css.title}>Колекція суконь</h2>

          <p className={css.subtitle}>
            Вишукані сукні для наречених та особливих подій. Оберіть свій стиль,
            фасон і створіть образ, який запам`ятається назавжди.
          </p>
        </div>

        <div className={css.categories}>
          <Link href="/catalog" className={css.categoryActive}>
            Всі
          </Link>

          <Link href="/catalog?category=wedding" className={css.category}>
            Весільні
          </Link>

          <Link href="/catalog?category=evening" className={css.category}>
            Вечірні
          </Link>

          <Link href="/catalog?category=cocktail" className={css.category}>
            Коктейльні
          </Link>

          <Link href="/catalog?category=holiday" className={css.category}>
            Святкові
          </Link>
        </div>

        <DressGrid dresses={dresses} />

        <div className={css.actions}>
          <Link href="/catalog" className={css.button}>
            Переглянути всю колекцію
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dresses;
