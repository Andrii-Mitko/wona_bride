import css from "./Hero.module.css";

const Hero = () => {
  return (
    <div>
      <section className={css.hero + " " + css.section}>
        <div className={css.container + " " + css.hero__container}>
          <div className={css.hero__content}>
            <h1 className={css.hero__title}>Знайдіть сукню своєї мрії</h1>
            <p className={css.hero__text}>
              Відкрийте для себе колекцію вишуканих весільних, вечірніх та
              святкових суконь, створених для особливих моментів вашого життя.
              Ми допоможемо знайти образ, у якому ви почуватиметеся
              неперевершено.
            </p>
            <div className={css.hero__actions}>
              <a className={css.btn + " " + css["btn--hero"]} href="#feedback">
                Що про нас думають
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
