"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCartStore } from "@/store/cartStore";
import { orderSchema, type OrderFormData } from "@/lib/validation/order";
import { useRouter } from "next/navigation";
import css from "./checkout.module.css";

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);

  const total = items.reduce(
    (sum, item) => sum + item.dress.price * item.quantity,
    0,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data: OrderFormData) => {
    const order = {
      customer: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        comment: data.comment,
      },

      items: items.map((item) => ({
        dressId: item.dress.id,
        name: item.dress.name,
        size: item.selectedSize,
        price: item.dress.price,
        quantity: item.quantity,
      })),

      total,
    };

    const response = await fetch("/api/orders", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(order),
    });

    if (response.ok) {
      useCartStore.getState().clearCart();

      router.push("/success");
    }
  };

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.title}>Оформлення замовлення</h1>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Ваше ім'я" {...register("name")} />

          {errors.name && <p className={css.error}>{errors.name.message}</p>}

          <input type="tel" placeholder="Телефон" {...register("phone")} />

          {errors.phone && <p className={css.error}>{errors.phone.message}</p>}

          <input type="email" placeholder="Email" {...register("email")} />

          {errors.email && <p className={css.error}>{errors.email.message}</p>}

          <textarea
            placeholder="Коментар до замовлення"
            {...register("comment")}
          />

          <div className={css.summary}>
            Сума замовлення:
            <strong> {total.toLocaleString("uk-UA")} ₴</strong>
          </div>

          <button type="submit">Підтвердити замовлення</button>
        </form>
      </div>
    </section>
  );
}
