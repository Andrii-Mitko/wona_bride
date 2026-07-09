import css from "./About.module.css";

export default function About() {
  return (
    <section className={css.about__section} id="about">
      <div className={css.container + " " + css.about__container}>
        <div className={css.about__content}>
          <h2 className={css.about__title}>Про Меблерію</h2>
          <p className={css.about__text}>
            У Меблерії ми прагнемо створювати затишок та функціональність у
            кожному домі. Наша місія - пропонувати високоякісні меблі, що
            поєднують у собі сучасний дизайн, довговічність та доступність. Ми
            віримо, що ідеальний інтер`єр починається з правильних меблів.
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
