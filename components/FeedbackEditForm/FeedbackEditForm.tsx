"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import css from "./FeedbackEditForm.module.css";

type Props = {
  id: string;
  name: string;
  text: string;
  rating: number;
};

export default function FeedbackEditForm({
  id,
  name: initialName,
  text: initialText,
  rating: initialRating,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [text, setText] = useState(initialText);
  const [rating, setRating] = useState(initialRating);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    await fetch(`/api/feedback/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        text,
        rating,
      }),
    });

    setLoading(false);

    router.push("/admin/feedback");

    router.refresh();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Редагування відгуку</h2>

      <input
        className={css.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        className={css.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className={css.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={css.star}
            onClick={() => setRating(star)}
          >
            {star <= rating ? "★" : "☆"}
          </button>
        ))}
      </div>

      <button className={css.button} disabled={loading}>
        {loading ? "Збереження..." : "Зберегти"}
      </button>
    </form>
  );
}
