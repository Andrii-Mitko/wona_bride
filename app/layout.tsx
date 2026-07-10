import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import css from "./page.module.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
// import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wona-bride.ua"),

  title: "WONA Bride — весільні сукні",
  description:
    "Елегантні весільні сукні WONA Bride. Створіть свій ідеальний образ нареченої.",

  openGraph: {
    title: "WONA Bride — весільні сукні",
    description:
      "Елегантні весільні сукні WONA Bride. Створіть свій ідеальний образ нареченої.",
    url: "https://wona-bride.ua",
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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${css.body}`}>
        <TanStackProvider>
          {/* <AuthProvider> */}
          {/* <-- додаємо провайдер */}
          <Header />
          <main className={css.main}>
            {children}
            {modal}
          </main>
          <Footer />
          {/* </AuthProvider>{" "} */}
          {/* <-- додаємо провайдер */}
        </TanStackProvider>
      </body>
    </html>
  );
}
