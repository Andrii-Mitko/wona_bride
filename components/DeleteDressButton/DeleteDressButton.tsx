"use client";

import { useRouter } from "next/navigation";

import css from "./DeleteDressButton.module.css";

type Props = {
  id: string;
};

export default function DeleteDressButton({ id }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("Ви дійсно хочете видалити цю сукню?");

    if (!confirmed) return;

    const response = await fetch(`/api/dress/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Не вдалося видалити сукню");
      return;
    }

    router.push("/admin/dresses");
    router.refresh();
  };

  return (
    <button className={css.button} onClick={handleDelete}>
      🗑 Видалити
    </button>
  );
}
