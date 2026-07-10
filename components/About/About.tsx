import Image from "next/image";
import css from "./About.module.css";

export default function About() {
  return (
    <section className={css.about__section} id="about">
      <div className={`${css.container} ${css.about__container}`}>
        <div className={css.about__content}>
          <h2 className={css.about__title}>Про WONA</h2>
          <p className={css.about__text}>
            Ласкаво просимо до WONA — простору жіночої краси, стилю та
            натхнення. Ми допомагаємо кожній жінці знайти сукню, яка підкреслить
            її індивідуальність та зробить особливі моменти життя незабутніми. У
            нашому магазині представлені весільні, вечірні та святкові сукні,
            створені з увагою до кожної деталі, сучасних тенденцій і високої
            якості. Для нас важливо, щоб кожна клієнтка почувалася впевнено,
            красиво та комфортно. Саме тому ми пропонуємо професійну
            консультацію, індивідуальний підхід і допомагаємо знайти сукню, про
            яку ви мріяли.
          </p>
        </div>
        <Image
          src="/images/about-section/about-desk.webp"
          alt="Команда WONA"
          width={644}
          height={430}
          sizes="(min-width: 1440px) 644px, (min-width: 768px) 704px, 100vw"
          className={css.about__image}
          style={{
            width: "100%",
            height: "auto",
          }}
          priority
        />
      </div>
    </section>
  );
}
