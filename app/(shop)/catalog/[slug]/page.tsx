import { notFound } from "next/navigation";
import { getDressBySlug } from "@/lib/api/dresses";
import DressGallery from "@/components/DressGallery/DressGallery";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import BackButton from "@/components/BackButton/BackButton";
import css from "./page.module.css";

export const dynamic = "force-dynamic";

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
        <div className={css.backWrapper}>
          <BackButton />
        </div>
        <div className={css.product}>
          <DressGallery name={dress.name} images={dress.images} />
          <ProductDetails dress={dress} />
        </div>
      </div>
    </section>
  );
}
