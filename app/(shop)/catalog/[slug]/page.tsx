import { notFound } from "next/navigation";
import { getDressBySlug } from "@/lib/api/dresses";
import DressGallery from "@/components/DressGallery/DressGallery";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import BackButton from "@/components/BackButton/BackButton";
import css from "./page.module.css";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const dress = await getDressBySlug(slug);

  if (!dress) {
    return {
      title: "Сукню не знайдено",
    };
  }

  return {
    title: `${dress.name} | WONA Bride`,
    description: dress.description,

    openGraph: {
      title: `${dress.name} | WONA Bride`,
      description: dress.description,
      images: [dress.images[0]],
    },
    alternates: {
      canonical: `https://wona-bride.com.ua/catalog/${dress.slug}`,
    },
  };
}

export default async function DressPage({ params }: Props) {
  const { slug } = await params;

  const dress = await getDressBySlug(slug);

  if (!dress) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: dress.name,

    image: dress.images,

    description: dress.description,

    sku: dress.article,

    brand: {
      "@type": "Brand",
      name: "WONA Bride",
    },

    offers: {
      "@type": "Offer",

      price: dress.price,

      priceCurrency: "UAH",

      availability:
        dress.availability === "available"
          ? "https://schema.org/InStock"
          : dress.availability === "order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
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
    </>
  );
}
