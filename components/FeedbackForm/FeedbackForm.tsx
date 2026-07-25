"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { feedbackSchema, FeedbackFormData } from "@/lib/validation/feedback";
import { useRouter } from "next/navigation";
import css from "./FeedbackForm.module.css";

export default function FeedbackForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      text: "",
      rating: 5,
    },
  });

  const rating = watch("rating");

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Помилка відправки");
      }

      setMessage(
        "Дякуємо за ваш відгук! Незабаром він з'явиться на нашому сайті.",
      );

      reset({
        name: "",
        text: "",
        rating: 5,
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch {
      setMessage("Не вдалося відправити відгук. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={css.title}>Залишити відгук</h3>

      <input
        className={css.input}
        type="text"
        placeholder="Ваше ім'я"
        {...register("name")}
      />

      {errors.name && <p className={css.error}>{errors.name.message}</p>}

      <textarea
        className={css.textarea}
        placeholder="Напишіть свій відгук..."
        rows={5}
        {...register("text")}
      />

      {errors.text && <p className={css.error}>{errors.text.message}</p>}

      <div className={css.rating}>
        <p className={css.ratingTitle}>Оцініть наш салон</p>

        <div className={css.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={css.star}
              onClick={() => setValue("rating", star)}
            >
              {star <= rating ? "★" : "☆"}
            </button>
          ))}
        </div>

        {errors.rating && <p className={css.error}>{errors.rating.message}</p>}
      </div>

      <button
        className={`${css.button} ${loading ? css.disabled : ""}`}
        type="submit"
        disabled={loading}
      >
        {loading ? "Відправка..." : "Надіслати відгук"}
      </button>
      {message && <p className={css.message}>{message}</p>}
    </form>
  );
}
