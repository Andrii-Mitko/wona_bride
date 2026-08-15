// components\Popular\Popular.tsx

import DressGrid from "@/components/DressGrid/DressGrid";
import { getDresses } from "@/lib/api/dresses";

import css from "./Popular.module.css";

export default async function Popular() {
  const { dresses: popularDresses } = await getDresses({
    isPopular: true,
    limit: 8,
  });

  return (
    <section className={css.section} id="popular">
      <div className={css.container}>
        <div className={css.header}>
          <p className={css.label}>Обрані моделі</p>

          <hr className="section-divider" />

          <h2 className={css.title}>Популярні сукні</h2>

          <p className={css.subtitle}>
            Найулюбленіші моделі наших клієнток. Витончені фасони для особливих
            моментів.
          </p>
        </div>

        <DressGrid dresses={popularDresses} />
      </div>
    </section>
  );
}
