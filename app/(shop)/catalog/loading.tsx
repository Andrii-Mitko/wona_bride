import Skeleton from "@/components/Skeleton/Skeleton";
import css from "./catalog.module.css";

export default function CatalogLoading() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <Skeleton width="240px" height="40px" className="mb-32" />

        <div style={{ display: "flex", gap: "12px", marginBottom: "40px" }}>
          <Skeleton width="90px" height="42px" borderRadius="30px" />
          <Skeleton width="110px" height="42px" borderRadius="30px" />
          <Skeleton width="100px" height="42px" borderRadius="30px" />
          <Skeleton width="95px" height="42px" borderRadius="30px" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <Skeleton height="360px" borderRadius="16px" />

              <div style={{ marginTop: "16px" }}>
                <Skeleton height="22px" width="80%" className="mb-8" />
                <Skeleton height="16px" width="50%" className="mb-8" />
                <Skeleton height="24px" width="40%" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
