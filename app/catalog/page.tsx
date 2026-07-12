import DressCategories from "@/components/DressCategories/DressCategories";
import DressGrid from "@/components/DressGrid/DressGrid";

import { getCategories } from "@/lib/api/categories";
import { getDresses } from "@/lib/api/dresses";

import css from "./catalog.module.css";
import { isDressCategory } from "@/lib/utils/dress";

type Props = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;

  const activeCategory =
    params.category && isDressCategory(params.category)
      ? params.category
      : undefined;

  const [categories, dresses] = await Promise.all([
    getCategories(),
    getDresses({
      category: activeCategory,
    }),
  ]);

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Колекція весільних суконь</h1>

        <DressCategories
          categories={categories}
          activeCategory={activeCategory ?? "all"}
        />

        <DressGrid dresses={dresses} />
      </div>
    </section>
  );
}
