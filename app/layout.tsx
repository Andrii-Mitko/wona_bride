import { Toaster } from "react-hot-toast";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Script from "next/script";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wona-bride.com.ua"),

  applicationName: "WONA Bride",

  title: "WONA Bride — весільні сукні",
  description:
    "Елегантні весільні сукні WONA Bride. Створіть свій ідеальний образ нареченої.",

  authors: [
    {
      name: "WONA Bride",
      url: "https://wona-bride.com.ua",
    },
  ],

  creator: "WONA Bride",

  publisher: "WONA Bride",

  keywords: [
    "cerys",
    "платья",
    "сукня",
    "сукні",
    "вона",
    "WONA",
    "WONA Bride",
    "весільні сукні",
    "весільний салон",
    "купити весільну сукню",
    "весільна сукня",
    "салон наречених",
    "весільні сукні Україна",
    "сукні Бар",
    "весільні сукні Бар",
    "весільні сукні Вінницька область",
  ],

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Wedding",

  openGraph: {
    title: "WONA Bride — Твоя ідеальна сукня",
    description:
      "Елегантні весільні сукні WONA Bride. Створіть свій ідеальний образ нареченої.",
    url: "https://wona-bride.com.ua",
    siteName: "WONA Bride",
    locale: "uk_UA",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WONA Bride",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "WONA Bride — Твоя ідеальна сукня",
    description:
      "Елегантні весільні сукні WONA Bride. Створіть свій ідеальний образ нареченої.",
    images: ["/images/og-image.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WONA Bride",
  url: "https://wona-bride.com.ua",
  logo: "https://wona-bride.com.ua/images/logo.png",
  telephone: "+380966715746",
  sameAs: ["https://www.tiktok.com/@wona_bride"],
};

const bridalShopSchema = {
  "@context": "https://schema.org",
  "@type": "BridalShop",
  name: "WONA Bride",
  image: "https://wona-bride.com.ua/images/logo.png",
  url: "https://wona-bride.com.ua",
  telephone: "+380966715746",

  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Соборна, 23",
    addressLocality: "Бар",
    addressRegion: "Вінницька область",
    postalCode: "23000",
    addressCountry: "UA",
  },

  openingHours: ["Tu-Sa 09:00-17:00", "Su 09:00-14:00"],

  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.0762724,
    longitude: 27.6713551,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  name: "WONA Bride",

  url: "https://wona-bride.com.ua",

  description:
    "Весільний салон WONA Bride. Весільні сукні, примірка та консультації.",

  inLanguage: "uk-UA",

  publisher: {
    "@type": "Organization",
    name: "WONA Bride",
  },

  potentialAction: {
    "@type": "SearchAction",

    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://wona-bride.com.ua/catalog?search={search_term_string}",
    },

    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" data-scroll-behavior="smooth">
      <body className={raleway.variable}>
        <TanStackProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                borderRadius: "12px",
                fontSize: "16px",
              },
            }}
          />

          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />

          <Script
            id="bridalshop-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(bridalShopSchema),
            }}
          />

          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteSchema),
            }}
          />

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-KBZCSKVN4R"
            strategy="afterInteractive"
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-KBZCSKVN4R');
  `}
          </Script>

          {children}
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        </TanStackProvider>
      </body>
    </html>
  );
}
