import Image from "next/image";
import css from "./About.module.css";

export default function About() {
  return (
    <section className={css.aboutSection} id="about">
      <div className={`${css.container} ${css.aboutContainer}`}>
        <div className={css.aboutContent}>
          <h2 className={css.aboutTitle}>Про WONA</h2>

          <p className={css.aboutText}>
            Ласкаво просимо до WONA — простору жіночої краси, стилю та
            натхнення. Ми допомагаємо кожній жінці знайти сукню, яка підкреслить
            її індивідуальність та зробить особливі моменти життя незабутніми.
          </p>

          <p className={css.aboutText}>
            У нашому магазині представлені весільні, вечірні та святкові сукні,
            створені з увагою до кожної деталі, сучасних тенденцій і високої
            якості.
          </p>

          <p className={css.aboutText}>
            Для нас важливо, щоб кожна клієнтка почувалася впевнено, красиво та
            комфортно. Ми допоможемо знайти сукню, про яку ви мріяли.
          </p>
        </div>

        <div className={css.imageWrapper}>
          <Image
            src="/images/about.png"
            alt="WONA"
            fill
            sizes="
              (min-width: 1440px) 644px,
              (min-width: 768px) 704px,
              100vw
            "
            className={css.aboutImage}
            priority
          />
        </div>
      </div>
    </section>
  );
}
