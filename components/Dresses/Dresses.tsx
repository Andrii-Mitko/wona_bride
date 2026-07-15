import Link from "next/link";

import DressGrid from "@/components/DressGrid/DressGrid";
import { getDresses } from "@/lib/api/dresses";

import css from "./Dresses.module.css";

const Dresses = async () => {
  const { dresses } = await getDresses({
    limit: 4,
  });

  const popularDresses = dresses.filter((dress) => dress.isPopular);

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
          <Link href="/catalog" className={css.categoryActive}>
            Всі сукні
          </Link>

          <Link href="/catalog?category=wedding" className={css.category}>
            Весільні
          </Link>

          <Link href="/catalog?category=evening" className={css.category}>
            Вечірні
          </Link>

          <Link href="/catalog?category=holiday" className={css.category}>
            Святкові
          </Link>
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
