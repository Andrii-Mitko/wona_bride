import Skeleton from "@/components/Skeleton/Skeleton";
import css from "./page.module.css";

export default function DressPageLoading() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <Skeleton width="120px" height="20px" className="mb-32" />

        <div className={css.product}>
          <div>
            <Skeleton height="600px" borderRadius="12px" />
          </div>

          <div>
            <Skeleton height="36px" width="70%" className="mb-8" />
            <Skeleton height="28px" width="30%" className="mb-32" />

            <Skeleton height="80px" borderRadius="12px" className="mb-32" />

            <Skeleton height="20px" width="40%" className="mb-8" />
            <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
              <Skeleton width="48px" height="42px" borderRadius="12px" />
              <Skeleton width="48px" height="42px" borderRadius="12px" />
              <Skeleton width="48px" height="42px" borderRadius="12px" />
            </div>

            <Skeleton height="56px" borderRadius="12px" />
          </div>
        </div>
      </div>
    </section>
  );
}
