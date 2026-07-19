import { Toaster } from "react-hot-toast";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

import type { Metadata } from "next";

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

  title: "WONA Bride — весільні сукні",
  description:
    "Елегантні весільні сукні WONA Bride. Створіть свій ідеальний образ нареченої.",

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
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
