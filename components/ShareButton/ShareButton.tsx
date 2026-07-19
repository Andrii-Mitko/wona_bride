"use client";

import css from "./ShareButton.module.css";

type Props = {
  title: string;
};

export default function ShareButton({ title }: Props) {
  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share && window.innerWidth < 768) {
        await navigator.share({
          title,
          text: `Весільна сукня ${title}`,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);

      alert("Посилання скопійовано ✅");
    } catch (error) {
      console.error(error);

      alert("Не вдалося скопіювати посилання");
    }
  };

  return (
    <button type="button" className={css.button} onClick={handleShare}>
      🔗 Поділитися
    </button>
  );
}
