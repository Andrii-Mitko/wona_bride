"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  id: string;
  approved: boolean;
};

export default function FeedbackActions({ id, approved }: Props) {
  const router = useRouter();

  const deleteFeedback = async () => {
    const ok = confirm("Видалити цей відгук?");

    if (!ok) return;

    await fetch(`/api/feedback/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  };

  const updateStatus = async () => {
    await fetch(`/api/feedback/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        approved: !approved,
      }),
    });

    router.refresh();
  };

  return (
    <div>
      <button onClick={updateStatus}>
        {approved ? "Сховати" : "Опублікувати"}
      </button>

      <Link href={`/admin/feedback/${id}`}>Редагувати</Link>

      <button onClick={deleteFeedback}>Видалити</button>
    </div>
  );
}
