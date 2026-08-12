// app\(shop)\layout.tsx

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
