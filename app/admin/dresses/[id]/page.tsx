import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import DressModel from "@/models/DressModel";

import css from "./page.module.css";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DressPage({ params }: Props) {
  await connectDB();

  const { id } = await params;

  const dress = await DressModel.findById(id).lean();

  if (!dress) {
    notFound();
  }

  return (
    <main className={css.page}>
      <h1>{dress.name}</h1>

      <div className={css.actions}>
        <Link href="/admin/dresses" className={css.backButton}>
          ← До списку
        </Link>

        <Link
          href={`/admin/dresses/${dress._id}/edit`}
          className={css.editButton}
        >
          ✏️ Редагувати
        </Link>
      </div>

      <div className={css.grid}>
        <div>
          {dress.images?.length ? (
            <Image
              src={dress.images[0]}
              alt={dress.name}
              width={400}
              height={520}
              className={css.image}
            />
          ) : (
            <div className={css.placeholder}>Немає фото</div>
          )}
        </div>

        <div className={css.info}>
          <p>
            <strong>Артикул:</strong> {dress.article}
          </p>

          <p>
            <strong>Колір:</strong> {dress.color}
          </p>

          <p>
            <strong>Ціна:</strong> {dress.price} грн
          </p>

          <p>
            <strong>Категорія:</strong> {dress.category.join(", ")}
          </p>

          <p>
            <strong>Стиль:</strong> {dress.style.join(", ")}
          </p>

          <p>
            <strong>Матеріал:</strong> {dress.fabric.join(", ")}
          </p>

          <p>
            <strong>Розміри:</strong> {dress.sizes.join(", ")}
          </p>

          <p>
            <strong>Тип розміру:</strong> {dress.sizeType}
          </p>

          <p>
            <strong>Популярна:</strong> {dress.isPopular ? "Так" : "Ні"}
          </p>

          <hr />

          <p>{dress.description}</p>
        </div>
      </div>
    </main>
  );
}
