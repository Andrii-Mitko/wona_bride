import DressGrid from "@/components/DressGrid/DressGrid";
import { getDresses } from "@/lib/api/dresses";

import css from "./catalog.module.css";

export default async function CatalogPage() {
  const dresses = await getDresses();

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Колекція весільних суконь</h1>

        <DressGrid dresses={dresses} />
      </div>
    </section>
  );
}
