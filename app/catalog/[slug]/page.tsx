import { notFound } from "next/navigation";

import { getDressBySlug } from "@/lib/api/dresses";
import DressGallery from "@/components/DressGallery/DressGallery";
import css from "./page.module.css";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DressPage({ params }: Props) {
  const { slug } = await params;

  const dress = await getDressBySlug(slug);

  if (!dress) {
    notFound();
  }

  return (
    <section className={css.section}>
      <div className={css.container}>
        <DressGallery name={dress.name} images={dress.images} />

        <div className={css.content}>
          <h1 className={css.title}>{dress.name}</h1>

          <p className={css.price}>{dress.price.toLocaleString("uk-UA")} ₴</p>

          <p className={css.description}>{dress.description}</p>

          <h2>Розміри:</h2>

          <ul className={css.sizes}>
            {dress.sizes.map((size) => (
              <li key={size}>{size}</li>
            ))}
          </ul>

          <button className={css.button}>Записатися на примірку</button>
        </div>
      </div>
    </section>
  );
}
