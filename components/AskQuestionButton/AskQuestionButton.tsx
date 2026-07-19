import css from "./AskQuestionButton.module.css";

type Props = {
  dressName: string;
};

export default function AskQuestionButton({ dressName }: Props) {
  const telegramUsername = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME;

  const message = `Добрий день! Мене цікавить сукня ${dressName}`;

  const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={css.button}
    >
      📞 Задати питання
    </a>
  );
}
