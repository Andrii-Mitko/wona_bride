import DressForm from "@/components/DressForm/DressForm";
import css from "../dresses.module.css";

export default function NewDressPage() {
  return (
    <main className={css.page}>
      <h1>Додати сукню</h1>

      <DressForm />
    </main>
  );
}
