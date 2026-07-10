import css from "./About.module.css";

export default function About() {
  return (
    <section className={css.about__section} id="about">
      <div className={css.container + " " + css.about__container}>
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
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet="
          ./images/about-section/about-desk.webp    1x,
          ./images/about-section/about-desk@2x.webp 2x
        "
          />
          <source
            media="(min-width: 768px)"
            srcSet="
          ./images/about-section/about-tablet.webp    1x,
          ./images/about-section/about-tablet@2x.webp 2x
        "
          />

          <source
            media="(max-width: 767px)"
            srcSet="
          ./images/about-section/about-mob.webp    1x,
          ./images/about-section/about-mob@2x.webp 2x
        "
          />
          <img
            src="./images/about-section/about-mob.webp"
            alt="Команда Меблерії"
          />
        </picture>
      </div>
    </section>
  );
}
