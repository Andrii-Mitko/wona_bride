import css from "./FormError.module.css";

type Props = {
  message?: string;
};

export default function FormError({ message }: Props) {
  if (!message) {
    return null;
  }

  return <span className={css.error}>{message}</span>;
}
