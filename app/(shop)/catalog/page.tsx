import DressCategories from "@/components/DressCategories/DressCategories";
import DressGrid from "@/components/DressGrid/DressGrid";
import type { Metadata } from "next";
import { getDresses } from "@/lib/api/dresses";
import DressFilters from "@/components/DressFilters/DressFilters";
import css from "./catalog.module.css";
import { isDressCategory } from "@/lib/utils/dress";
import { getCategories } from "@/lib/api/categories";
import Pagination from "@/components/Pagination/Pagination";
import AdminFilterSelect from "@/components/AdminFilterSelect/AdminFilterSelect";

type Props = {
  searchParams: Promise<{
    category?: string;
    page?: string;
    query?: string;
    minPrice?: string;
    maxPrice?: string;
    size?: string;
    sort?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;

  const category =
    params.category && isDressCategory(params.category)
      ? params.category
      : undefined;

  const query = params.query?.trim();

  const page = Number(params.page) || 1;

  const url = new URL("https://wona-bride.com.ua/catalog");

  if (category) {
    url.searchParams.set("category", category);
  }

  if (query) {
    url.searchParams.set("query", query);
  }

  if (page > 1) {
    url.searchParams.set("page", String(page));
  }

  const seo = {
    all: {
      title: "Каталог суконь — WONA Bride",
      description:
        "Каталог весільних, вечірніх, випускних та дитячих суконь WONA Bride.",
    },

    wedding: {
      title: "Весільні сукні — WONA Bride",
      description:
        "Весільні сукні WONA Bride. Великий вибір моделей, різні розміри та примірка у салоні.",
    },

    evening: {
      title: "Вечірні сукні — WONA Bride",
      description: "Елегантні вечірні сукні WONA Bride для особливих подій.",
    },

    cocktail: {
      title: "Коктейльні сукні — WONA Bride",
      description: "Стильні коктейльні сукні для святкових заходів.",
    },

    holiday: {
      title: "Святкові сукні — WONA Bride",
      description: "Святкові сукні для будь-яких урочистих подій.",
    },

    graduation: {
      title: "Випускні сукні — WONA Bride",
      description: "Випускні сукні WONA Bride для незабутнього вечора.",
    },

    kids: {
      title: "Дитячі сукні — WONA Bride",
      description: "Дитячі святкові сукні для маленьких принцес.",
    },
  };

  const meta = seo[category ?? "all"];

  return {
    title: meta.title,
    description: meta.description,

    alternates: {
      canonical: url.toString(),
    },

    openGraph: {
      title: meta.title,
      description: meta.description,
      url: url.toString(),
    },
  };
}

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;

  const searchQuery = params.query?.trim();

  const activeCategory =
    params.category && isDressCategory(params.category)
      ? params.category
      : undefined;
  const currentPage = Number(params.page) || 1;

  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const activeSize = params.size?.trim() || undefined;

  const [categories, dressesResponse] = await Promise.all([
    getCategories(),
    getDresses({
      category: activeCategory,
      page: currentPage,
      query: searchQuery,
      minPrice,
      maxPrice,
      size: activeSize,
      sort: params.sort,
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Головна",
        item: "https://wona-bride.com.ua",
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "Каталог",
        item: "https://wona-bride.com.ua/catalog",
      },

      ...(activeCategory
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: title,
              item: `https://wona-bride.com.ua/catalog?category=${activeCategory}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <section className={css.section}>
        <div className={css.container}>
          <h1 className={css.title}>{title}</h1>

          <DressCategories
            categories={categories}
            activeCategory={activeCategory ?? "all"}
          />

          <div className={css.toolbar}>
            <DressFilters
              initialMinPrice={params.minPrice}
              initialMaxPrice={params.maxPrice}
              activeSize={params.size ?? ""}
            />

            <AdminFilterSelect
              name="sort"
              value={params.sort ?? "newest"}
              options={[
                { value: "newest", label: "Спочатку нові" },
                { value: "popular", label: "Спочатку популярні" },
                { value: "price_asc", label: "Дешевші спочатку" },
                { value: "price_desc", label: "Дорожчі спочатку" },
              ]}
            />
          </div>

          <DressGrid dresses={dresses} activeCategory={activeCategory} />

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            pathname="/catalog"
            query={{
              category: activeCategory,
              query: searchQuery,
              minPrice: params.minPrice,
              maxPrice: params.maxPrice,
              size: params.size,
              sort: params.sort,
            }}
          />
        </div>
      </section>
    </>
  );
}
