"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import css from "./wishlist.module.css";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlistStore();

  if (items.length === 0) {
    return (
      <section className={css.section}>
        <div className={css.container}>
          <h1 className={css.title}>Список обраного порожній</h1>

          <Link href="/catalog" className={css.link}>
            Перейти до каталогу
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Обрані сукні</h1>

        <div className={css.list}>
          {items.map((dress) => (
            <article key={dress._id} className={css.item}>
              <Link
                href={`/catalog/${dress.slug}`}
                className={css.imageWrapper}
              >
                <Image
                  src={dress.images[0]}
                  alt={dress.name}
                  fill
                  sizes="180px"
                />
              </Link>

              <div className={css.info}>
                <Link href={`/catalog/${dress.slug}`}>
                  <h2>{dress.name}</h2>
                </Link>

                <p>{dress.price.toLocaleString("uk-UA")} ₴</p>

                <button
                  className={css.remove}
                  onClick={() => removeFromWishlist(dress._id)}
                >
                  Видалити з обраного
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
