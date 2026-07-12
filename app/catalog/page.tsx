import DressCategories from "@/components/DressCategories/DressCategories";
import DressGrid from "@/components/DressGrid/DressGrid";
import Pagination from "@/components/Pagination/Pagination";

import { getCategories } from "@/lib/api/categories";
import { getDresses } from "@/lib/api/dresses";

import { isDressCategory } from "@/lib/utils/dress";

import css from "./catalog.module.css";

type Props = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;

  const activeCategory =
    params.category && isDressCategory(params.category)
      ? params.category
      : undefined;

  const page = Number(params.page) || 1;

  const [categories, dressesResponse] = await Promise.all([
    getCategories(),

    getDresses({
      category: activeCategory,
      page,
      limit: 8,
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

        <DressGrid dresses={dressesResponse.dresses} />

        {dressesResponse.totalPages > 1 && (
          <Pagination
            page={dressesResponse.page}
            totalPages={dressesResponse.totalPages}
          />
        )}
      </div>
    </section>
  );
}
