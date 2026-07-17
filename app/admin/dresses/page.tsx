import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import DressModel from "@/models/DressModel";
import Link from "next/link";

import css from "./dresses.module.css";
import type { Dress } from "@/types/dress";
import Image from "next/image";

export default async function AdminDressesPage() {
  const cookieStore = await cookies();

  const adminAuth = cookieStore.get("admin-auth");

  if (!adminAuth || adminAuth.value !== "true") {
    redirect("/admin/login");
  }

  await connectDB();

  const dresses = (await DressModel.find()
    .sort({ createdAt: -1 })
    .lean()) as Dress[];

  return (
    <main className={css.page}>
      <div className={css.header}>
        <h1>Весільні сукні</h1>

        <Link href="/admin/dresses/new" className={css.button}>
          + Додати сукню
        </Link>
      </div>

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
                {dress.images?.[0] ? (
                  <Image
                    width={100}
                    height={100}
                    src={dress.images[0]}
                    alt={dress.name}
                    className={css.image}
                  />
                ) : (
                  "—"
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
    </main>
  );
}
