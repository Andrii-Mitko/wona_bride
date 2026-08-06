import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/Pagination/Pagination";
import { connectDB } from "@/lib/mongodb";
import DressModel from "@/models/DressModel";
import { getCategories } from "@/lib/api/categories";
import type { Dress } from "@/types/dress";
import AdminDressSearch from "@/components/AdminDressSearch/AdminDressSearch";
import css from "./dresses.module.css";
import AdminFilterSelect from "@/components/AdminFilterSelect/AdminFilterSelect";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    popular?: string;
    availability?: string;
    sort?: string;
  }>;
};

export default async function AdminDressesPage({ searchParams }: Props) {
  const cookieStore = await cookies();

  const adminAuth = cookieStore.get("admin-auth");

  if (!adminAuth || adminAuth.value !== "true") {
    redirect("/admin/login");
  }

  await connectDB();

  const params = await searchParams;

  const currentPage = Number(params.page) || 1;

  const search = params.search?.trim() ?? "";

  const category = params.category ?? "";

  const popular = params.popular ?? "";
  const availability = params.availability ?? "";
  const sort = params.sort ?? "newest";
  const limit = 20;

  const skip = (currentPage - 1) * limit;

  const filter = {
    ...(search && {
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          article: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    }),

    ...(category && {
      category,
    }),

    ...(availability && {
      availability,
    }),

    ...(popular === "true" && {
      isPopular: true,
    }),
    ...(popular === "false" && {
      isPopular: false,
    }),
  };

  const sortOptions = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    priceAsc: { price: 1 },
    priceDesc: { price: -1 },
    nameAsc: { name: 1 },
    nameDesc: { name: -1 },
  } as const;

  const sortBy =
    sortOptions[sort as keyof typeof sortOptions] ?? sortOptions.newest;

  const [categories, totalDresses, dressesResult] = await Promise.all([
    getCategories(),

    DressModel.countDocuments(filter),

    DressModel.find(filter).sort(sortBy).skip(skip).limit(limit).lean(),
  ]);

  const dresses = dressesResult as Dress[];

  const totalPages = Math.ceil(totalDresses / limit);

  return (
    <main className={css.page}>
      <div className={css.header}>
        <h1>Усі сукні</h1>

        <Link href="/admin/dresses/new" className={css.button}>
          + Додати сукню
        </Link>
      </div>
      <form method="GET" className={css.searchForm}>
        <AdminDressSearch defaultValue={search} />

        <div className={css.toolbar}>
          <div className={css.filters}>
            <h3 className={css.groupTitle}>Фільтри</h3>

            <AdminFilterSelect
              name="category"
              value={category}
              options={[
                { value: "", label: "Усі категорії" },
                ...categories.map((item) => ({
                  value: item.slug,
                  label: item.name,
                })),
              ]}
            />

            <AdminFilterSelect
              name="availability"
              value={availability}
              options={[
                { value: "", label: "Уся наявність" },
                { value: "available", label: "В наявності" },
                { value: "order", label: "Під замовлення" },
                { value: "waiting", label: "Очікується" },
              ]}
            />

            <AdminFilterSelect
              name="popular"
              value={popular}
              options={[
                { value: "", label: "Усі по популярності" },
                { value: "true", label: "Популярні" },
                { value: "false", label: "Не популярні" },
              ]}
            />

            <Link href="/admin/dresses" className={css.resetButton}>
              Скинути
            </Link>
          </div>

          <div className={css.sort}>
            <h3 className={css.groupTitle}>Сортування</h3>

            <AdminFilterSelect
              name="sort"
              value={sort}
              options={[
                { value: "newest", label: "Нові спочатку" },
                { value: "oldest", label: "Старі спочатку" },
                { value: "priceAsc", label: "Ціна ↑" },
                { value: "priceDesc", label: "Ціна ↓" },
                { value: "nameAsc", label: "Назва А-Я" },
                { value: "nameDesc", label: "Назва Я-А" },
              ]}
            />
          </div>
        </div>
      </form>

      {/* MOBILE */}

      <div className={css.mobileCards}>
        {dresses.map((dress) => (
          <article key={dress._id.toString()} className={css.card}>
            {dress.images?.[0] && (
              <Image
                width={120}
                height={160}
                src={dress.images[0]}
                alt={dress.name}
                className={css.cardImage}
              />
            )}

            <h2>{dress.name}</h2>
            <p>
              <strong>Артикул:</strong> {dress.article}
            </p>
            <p>
              <strong>Категорія:</strong> {dress.category?.join(", ")}
            </p>

            <p>
              <strong>Розміри:</strong> {dress.sizes?.join(", ")}
            </p>

            <p>
              <strong>Ціна:</strong> {dress.price} грн
            </p>

            <p>{dress.isPopular ? "⭐ Популярне" : ""}</p>

            <Link
              href={`/admin/dresses/${dress._id}`}
              className={css.viewButton}
            >
              Переглянути
            </Link>
          </article>
        ))}
      </div>

      {/* DESKTOP */}

      <div className={css.desktopTable}>
        <table className={css.table}>
          <thead>
            <tr>
              <th>Фото</th>
              <th>Артикул</th>
              <th>Назва</th>
              <th>Категорія</th>

              <th>Розміри</th>

              <th>Ціна</th>

              <th>Популярне</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {dresses.map((dress) => (
              <tr key={dress._id.toString()}>
                <td>
                  {dress.images?.[0] && (
                    <Image
                      width={70}
                      height={90}
                      src={dress.images[0]}
                      alt={dress.name}
                      className={css.image}
                    />
                  )}
                </td>

                <td>{dress.article}</td>

                <td>{dress.name}</td>

                <td>{dress.category?.join(", ")}</td>

                <td>{dress.sizes?.join(", ")}</td>

                <td>{dress.price} грн</td>

                <td>{dress.isPopular ? "✅" : "—"}</td>

                <td>
                  <Link
                    href={`/admin/dresses/${dress._id}`}
                    className={css.viewButton}
                  >
                    Переглянути
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        pathname="/admin/dresses"
        query={{
          search,
          category,
          availability,
          popular,
          sort,
        }}
      />
    </main>
  );
}
