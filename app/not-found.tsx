import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сторінку не знайдено",
  description: "Ця сторінка не існує на сайті WONA Bride",

  openGraph: {
    title: "Сторінку не знайдено",
    description: "Ця сторінка не існує на сайті WONA Bride",
    url: "https://wona-bride.vercel.app/not-found",
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

const NotFound = () => {
  return (
    <main>
      <h1>404 - Сторінку не знайдено</h1>

      <p>Вибачте, але сторінка, яку ви шукаєте, не існує.</p>
    </main>
  );
};

export default NotFound;
