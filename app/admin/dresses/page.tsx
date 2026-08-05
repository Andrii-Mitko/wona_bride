import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { connectDB } from "@/lib/mongodb";
import DressModel from "@/models/DressModel";

import type { Dress } from "@/types/dress";

import css from "./dresses.module.css";

export default async function AdminDressesPage() {
  const cookieStore = await cookies();

  const adminAuth = cookieStore.get("admin-auth");

  if (!adminAuth || adminAuth.value !== "true") {
    redirect("/admin/login");
  }

  await connectDB();

  const dresses = (await DressModel.find()
    .sort({
      createdAt: -1,
    })
    .lean()) as Dress[];

  return (
    <main className={css.page}>
      <div className={css.header}>
        <h1>Весільні сукні</h1>

        <Link href="/admin/dresses/new" className={css.button}>
          + Додати сукню
        </Link>
      </div>

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
    </main>
  );
}
