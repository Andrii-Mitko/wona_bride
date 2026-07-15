import DressGrid from "@/components/DressGrid/DressGrid";
import { getDresses } from "@/lib/api/dresses";

import css from "./Popular.module.css";

export default async function Popular() {
  const { dresses } = await getDresses({
    limit: 4,
  });

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h2 className={css.title}>Наші сукні</h2>

        <DressGrid dresses={dresses} />
      </div>
    </section>
  );
}
