"use client";

import AppointmentModal from "@/components/AppointmentModal/AppointmentModal";
import { categoryLabels, styleLabels } from "@/lib/utils/dress";
import { Dress } from "@/types/dress";
import css from "./ProductDetails.module.css";
import SizeSelector from "@/components/SizeSelector/SizeSelector";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import ShareButton from "@/components/ShareButton/ShareButton";
import ProductTrust from "@/components/ProductTrust/ProductTrust";
import AskQuestionButton from "@/components/AskQuestionButton/AskQuestionButton";

type Props = {
  dress: Dress;
};

export default function ProductDetails({ dress }: Props) {
  const [selectedSize, setSelectedSize] = useState("");
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className={css.content}>
      <h1 className={css.title}>{dress.name}</h1>

      <p className={css.price}>{dress.price.toLocaleString("uk-UA")} ₴</p>

      <div
        className={`${css.availability} ${
          dress.availability === "available"
            ? css.available
            : dress.availability === "order"
              ? css.order
              : css.waiting
        }`}
      >
        {dress.availability === "available" && "🟢 Є в наявності"}

        {dress.availability === "order" && "🟡 Під замовлення"}

        {dress.availability === "waiting" && "🔴 Модель очікується"}
      </div>
      <div className={css.specifications}>
        <div className={css.specItem}>
          <span>Артикул</span>
          <strong>{dress.article}</strong>
        </div>

        <div className={css.specItem}>
          <span>Категорія</span>

          <strong>
            {dress.category
              .map((category) => categoryLabels[category])
              .join(", ")}
          </strong>
        </div>

        <div className={css.specItem}>
          <span>Фасон</span>

          <strong>
            {dress.style.map((style) => styleLabels[style]).join(", ")}
          </strong>
        </div>

        <div className={css.specItem}>
          <span>Колір</span>

          <strong>{dress.color}</strong>
        </div>

        <div className={css.specItem}>
          <span>Матеріал</span>

          <strong>{dress.fabric.join(", ")}</strong>
        </div>
      </div>

      <p className={css.description}>{dress.description}</p>

      <h2 className={css.subtitle}>Розміри</h2>

      <SizeSelector sizes={dress.sizes} onSelect={setSelectedSize} />

      {dress.availability !== "waiting" && (
        <button
          type="button"
          className={css.addToCart}
          disabled={!selectedSize}
          onClick={() => {
            addToCart(dress, selectedSize);

            toast.success("Сукню додано в кошик 🛒");
          }}
        >
          🛒 Додати в кошик
        </button>
      )}
      <ShareButton title={dress.name} />
      <ProductTrust />
      <AskQuestionButton dressName={dress.name} />
      {dress.availability === "available" && (
        <AppointmentModal
          dressName={dress.name}
          sizes={dress.sizes}
          sizeType={dress.sizeType}
        />
      )}

      {dress.availability === "waiting" && (
        <div className={css.waitingInfo}>
          Ця модель зараз очікується.
          <br />
          Незабаром вона буде доступна.
        </div>
      )}
    </div>
  );
}
