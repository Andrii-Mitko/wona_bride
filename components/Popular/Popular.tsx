"use client";

import css from "./Popular.module.css";

import { useDresses } from "@/hooks/useDresses";
import DressGrid from "@/components/DressGrid/DressGrid";

const Popular = () => {
  const { data: dresses = [], isLoading } = useDresses();

  const popularDresses = dresses.filter((dress) => dress.isPopular);

  return (
    <section className={css.sectionPopular} id="popular">
      <div className={css.container}>
        <h2 className={css.popularTitle}>Популярні сукні</h2>

        {isLoading ? (
          <p>Завантаження...</p>
        ) : (
          <DressGrid dresses={popularDresses} />
        )}
      </div>
    </section>
  );
};

export default Popular;
