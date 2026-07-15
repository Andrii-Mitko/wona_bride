"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import css from "./cart.module.css";

export default function CartPage() {
  const router = useRouter();

  const { items, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.dress.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }

    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <section className={css.section}>
        <div className={css.container}>
          <h1 className={css.title}>Кошик порожній</h1>

          <Link href="/catalog" className={css.link}>
            Перейти до каталогу
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Ваш кошик</h1>

        <div className={css.list}>
          {items.map((item) => (
            <article
              key={`${item.dress.id}-${item.selectedSize}`}
              className={css.item}
            >
              <div className={css.imageWrapper}>
                <Image
                  src={item.dress.images[0]}
                  alt={item.dress.name}
                  fill
                  sizes="180px"
                />
              </div>

              <div className={css.info}>
                <h2>{item.dress.name}</h2>

                <p>Розмір: {item.selectedSize}</p>

                <p>{item.dress.price.toLocaleString("uk-UA")} ₴</p>

                <div className={css.actions}>
                  <button
                    onClick={() =>
                      decreaseQuantity(item.dress.id, item.selectedSize)
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.dress.id, item.selectedSize)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className={css.remove}
                  onClick={() =>
                    removeFromCart(item.dress.id, item.selectedSize)
                  }
                >
                  Видалити
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className={css.total}>
          Всього:
          <strong> {total.toLocaleString("uk-UA")} ₴</strong>
        </div>

        <button className={css.checkout} onClick={handleCheckout}>
          Оформити замовлення
        </button>
      </div>
    </section>
  );
}
