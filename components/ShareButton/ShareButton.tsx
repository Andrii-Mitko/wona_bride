"use client";

import css from "./ShareButton.module.css";

type Props = {
  title: string;
};

export default function ShareButton({ title }: Props) {
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title,
        text: `Весільна сукня ${title}`,
        url,
      });

      return;
    }

    await navigator.clipboard.writeText(url);

    alert("Посилання скопійовано");
  };

  return (
    <button type="button" className={css.button} onClick={handleShare}>
      🔗 Поділитися
    </button>
  );
}
