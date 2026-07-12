import Image from "next/image";
import Link from "next/link";
import css from "./Header.module.css";
const Header = () => {
  return (
    <header className={css.header} id="top">
      {" "}
      <div className={css.header__container}>
        {" "}
        <Link href="/" className={css.logo} aria-label="WONA — на головну">
          {" "}
          <Image
            className={css.logo__img}
            width={140}
            height={64}
            src="/images/logo.png"
            alt="WONA Bride"
            priority
          />{" "}
        </Link>{" "}
        <nav
          className={`${css.header__nav} ${css.nav}`}
          aria-label="Основна навігація"
        >
          {" "}
          <ul className={css.nav__list}>
            {" "}
            <li className={css.nav__item}>
              {" "}
              <Link className={css.nav__link} href="/catalog">
                {" "}
                Наші сукні{" "}
              </Link>{" "}
            </li>{" "}
            <li className={css.nav__item}>
              {" "}
              <Link className={css.nav__link} href="#about">
                {" "}
                Про нас{" "}
              </Link>{" "}
            </li>{" "}
            <li className={css.nav__item}>
              {" "}
              <Link className={css.nav__link} href="#popular">
                {" "}
                Популярні{" "}
              </Link>{" "}
            </li>{" "}
            <li className={css.nav__item}>
              {" "}
              <Link className={css.nav__link} href="#feedback">
                {" "}
                Відгуки{" "}
              </Link>{" "}
            </li>{" "}
          </ul>{" "}
        </nav>{" "}
        <Link
          className={`${css.header__cta} ${css.btn} ${css["btn--primary"]}`}
          href="/catalog"
        >
          {" "}
          Переглянути сукні{" "}
        </Link>{" "}
        <button
          className={css.burger}
          type="button"
          aria-label="Відкрити меню"
          aria-expanded="false"
        >
          {" "}
          <span></span> <span></span> <span></span>{" "}
        </button>{" "}
      </div>{" "}
    </header>
  );
};
export default Header;
