import Link from "next/link";
import css from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={`${css.container} ${css.heroContainer}`}>
        <div className={css.heroContent}>
          <p className={css.badge}>WONA Bride — весільні сукні</p>

          <h1 className={css.heroTitle}>
            Сукня вашої мрії
            <br />
            для особливого дня
          </h1>

          <p className={css.heroText}>
            Елегантні весільні та вечірні сукні, які підкреслять вашу красу,
            стиль і індивідуальність.
          </p>

          <div className={css.heroActions}>
            <Link href="/catalog" className={css.button}>
              Переглянути колекцію
            </Link>

            <Link href="/appointment-success" className={css.secondaryButton}>
              Записатися на примірку
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
