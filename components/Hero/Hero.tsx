import Link from "next/link";
import css from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={`${css.container} ${css.heroContainer}`}>
        <div className={css.heroContent}>
          <h1 className={css.heroTitle}>Знайдіть сукню своєї мрії</h1>

          <p className={css.heroText}>
            Весільні та вечірні сукні WONA створені, щоб підкреслити вашу красу,
            стиль та індивідуальність у найважливіший день.
          </p>

          <div className={css.heroActions}>
            <Link href="/catalog" className={css.button}>
              Переглянути колекцію
            </Link>

            <Link href="#feedback" className={css.secondaryButton}>
              Відгуки клієнтів
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
