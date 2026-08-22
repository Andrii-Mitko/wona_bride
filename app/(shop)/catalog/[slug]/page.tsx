import { notFound } from "next/navigation";
import { getDressBySlug, getSimilarDresses } from "@/lib/api/dresses";
import DressGallery from "@/components/DressGallery/DressGallery";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import BackButton from "@/components/BackButton/BackButton";
import css from "./page.module.css";
import type { Metadata } from "next";
import DressGrid from "@/components/DressGrid/DressGrid";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 3600;

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

  const relatedDresses = await getSimilarDresses(dress.slug, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    inLanguage: "uk-UA",
    "@id": `https://wona-bride.com.ua/catalog/${dress.slug}`,

    name: dress.name,

    image: dress.images,

    description: dress.description,
    category: dress.category.join(", "),
    url: `https://wona-bride.com.ua/catalog/${dress.slug}`,

    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Колір",
        value: dress.color,
      },
      {
        "@type": "PropertyValue",
        name: "Тканина",
        value: dress.fabric.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Стиль",
        value: dress.style.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Розміри",
        value: dress.sizes.join(", "),
      },
    ],

    sku: dress.article.trim(),
    mpn: dress.article.trim(),

    brand: {
      "@type": "Brand",
      name: "WONA Bride",
    },

    manufacturer: {
      "@type": "Organization",
      name: "WONA Bride",
    },

    seller: {
      "@type": "Organization",
      name: "WONA Bride",
    },

    offers: {
      "@type": "Offer",
      itemCondition: "https://schema.org/NewCondition",
      url: `https://wona-bride.com.ua/catalog/${dress.slug}`,
      image: dress.images[0],
      price: dress.price.toString(),
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,

      priceCurrency: "UAH",

      availability:
        dress.availability === "available"
          ? "https://schema.org/InStock"
          : dress.availability === "order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "WONA Bride",
      },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: dress.price.toString(),
        priceCurrency: "UAH",
      },
      availabilityStarts: new Date().toISOString(),
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
