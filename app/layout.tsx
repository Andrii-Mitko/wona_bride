import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import css from "./page.module.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wona-bride.vercel.app"),

  title: "WONA Bride — весільні сукні",
  description:
    "Елегантні весільні сукні WONA Bride. Створіть свій ідеальний образ нареченої.",

  openGraph: {
    title: "WONA Bride — весільні сукні",
    description:
      "Елегантні весільні сукні WONA Bride. Створіть свій ідеальний образ нареченої.",
    url: "https://wona-bride.vercel.app",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" data-scroll-behavior="smooth">
      <body className={`${roboto.variable} ${css.body}`}>
        <TanStackProvider>
          <Header />

          <main className={css.main}>{children}</main>

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
