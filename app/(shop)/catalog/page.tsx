import DressCategories from "@/components/DressCategories/DressCategories";
import DressGrid from "@/components/DressGrid/DressGrid";

import { getDresses } from "@/lib/api/dresses";

import css from "./catalog.module.css";
import { isDressCategory } from "@/lib/utils/dress";
import { getCategories } from "@/lib/api/categories";
import Pagination from "@/components/Pagination/Pagination";

type Props = {
  searchParams: Promise<{
    category?: string;
    page?: string;
    query?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;

  const searchQuery = params.query?.trim();

  const activeCategory =
    params.category && isDressCategory(params.category)
      ? params.category
      : undefined;
  const currentPage = Number(params.page) || 1;

  const [categories, dressesResponse] = await Promise.all([
    getCategories(),
    getDresses({
      category: activeCategory,
      page: currentPage,
      query: searchQuery,
    }),
  ]);

  const { dresses, totalPages, page } = dressesResponse;

  const titles = {
    all: "Наші сукні",
    wedding: "Весільні сукні",
    evening: "Вечірні сукні",
    cocktail: "Коктейльні сукні",
    holiday: "Святкові сукні",
    graduation: "Випускні сукні",
    kids: "Дитячі сукні",
  };

  const title = titles[activeCategory ?? "all"];

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>{title}</h1>

        <DressCategories
          categories={categories}
          activeCategory={activeCategory ?? "all"}
        />

        <DressGrid dresses={dresses} />
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          category={activeCategory}
        />
      </div>
    </section>
  );
}
