import Link from "next/link";

import DressGrid from "@/components/DressGrid/DressGrid";
import { dresses } from "@/data/dresses";

import css from "./Dresses.module.css";

const Dresses = () => {
  const popularDresses = dresses.slice(0, 4);

  return (
    <section className={css.section} id="dresses">
      <div className={css.container}>
        <div className={css.head}>
          <h2 className={css.title}>Наші сукні</h2>

          <p className={css.subtitle}>
            Обирайте весільні, вечірні та святкові сукні, створені для особливих
            моментів вашого життя.
          </p>
        </div>

        <div className={css.categories}>
          <button className={css.categoryActive}>Всі сукні</button>

          <button className={css.category}>Весільні</button>

          <button className={css.category}>Вечірні</button>

          <button className={css.category}>Святкові</button>
        </div>

        <DressGrid dresses={popularDresses} />

        <div className={css.actions}>
          <Link href="/catalog" className={css.button}>
            Переглянути всі сукні
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dresses;
