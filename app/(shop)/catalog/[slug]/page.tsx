import { notFound } from "next/navigation";
import { getDressBySlug, getDresses } from "@/lib/api/dresses";
import DressGallery from "@/components/DressGallery/DressGallery";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import BackButton from "@/components/BackButton/BackButton";
import css from "./page.module.css";
import type { Metadata } from "next";
import DressGrid from "@/components/DressGrid/DressGrid";

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
      title: "Сукню не знайдено | WONA Bride",
    };
  }

  return {
    title: `${dress.name} — весільна сукня WONA Bride`,

    description:
      `${dress.description} Купити весільну сукню ${dress.name}. ` +
      `Ціна ${dress.price.toLocaleString("uk-UA")} грн.`,

    openGraph: {
      title: `${dress.name} — весільна сукня WONA Bride`,

      description: `${dress.description} Ціна ${dress.price.toLocaleString(
        "uk-UA",
      )} грн.`,

      images: [
        {
          url: dress.images[0],
          width: 800,
          height: 1200,
          alt: dress.name,
        },
      ],
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

  const { dresses } = await getDresses({
    limit: 100,
  });

  const relatedDresses = dresses
    .filter(
      (item) =>
        item._id !== dress._id &&
        item.category.some((category) => dress.category.includes(category)),
    )
    .slice(0, 4);

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

    seller: {
      "@type": "Organization",
      name: "WONA Bride",
    },

    offers: {
      "@type": "Offer",

      url: `https://wona-bride.com.ua/catalog/${dress.slug}`,

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

      {
        "@type": "ListItem",
        position: 3,
        name: dress.name,
        item: `https://wona-bride.com.ua/catalog/${dress.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
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
      {relatedDresses.length > 0 && (
        <section className={css.relatedSection}>
          <div className={css.container}>
            <h2 className={css.relatedTitle}>Вам також може сподобатися</h2>

            <DressGrid dresses={relatedDresses} />
          </div>
        </section>
      )}
    </>
  );
}
