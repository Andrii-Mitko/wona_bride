// import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <header className={css.header} id="top">
        <div className={css.header__container}>
          <Link href="#top" className={css.logo} aria-label="WONA — на головну">
            <Image
              className={css.logo__img}
              width={140}
              height={64}
              src="/images/logo.png"
              alt="WONA"
              priority
            ></Image>
          </Link>

          <nav
            className={`${css.header__nav} ${css.nav}`}
            aria-label="Основна навігація"
          >
            <ul className={css.nav__list}>
              <li className={css.nav__item}>
                <Link className={css.nav__link} href="#furniture">
                  Наші сукні
                </Link>
              </li>
              <li className={css.nav__item}>
                <Link className={css.nav__link} href="#about">
                  Про нас
                </Link>
              </li>
              <li className={css.nav__item}>
                <Link className={css.nav__link} href="#popular">
                  Популярні
                </Link>
              </li>
              <li className={css.nav__item}>
                <Link className={css.nav__link} href="#feedback">
                  Відгуки
                </Link>
              </li>
            </ul>
          </nav>

          <Link
            className={`${css.header__cta} ${css.btn} ${css["btn--primary"]}`}
            href="#furniture"
          >
            До покупок
          </Link>

          <button
            className={css.burger}
            type="button"
            aria-label="Відкрити меню"
            aria-expanded="false"
            data-menu-open
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div
          className={`${css["mobile-menu"]} ${css["is-hidden"]}`}
          data-mobile-menu
        >
          <div className={css["mobile-menu__overlay"]} data-menu-overlay>
            <div className={`${css["container"]} ${css["mobile-menu__panel"]}`}>
              <div className={css["mobile-menu__top"]}>
                <Link
                  href="#top"
                  className={`${css["mobile-menu__logo"]} ${css.logo}`}
                  aria-label="WONA — на головну"
                >
                  <svg
                    className={`${css["logo__icon"]} ${css["logo-mobile-menu"]}`}
                    width="163"
                    height="63"
                  >
                    <use href="./icons/icons.svg#icon-logo"></use>
                  </svg>
                </Link>

                <button
                  className={`${css["mobile-menu__close"]}`}
                  type="button"
                  aria-label="Закрити меню"
                  data-menu-close
                >
                  <svg className={`${css["mobile-menu__close-icon"]}`}>
                    <use href="/icons/icons.svg#icon-x"></use>
                  </svg>
                </button>
              </div>

              <nav
                className={`${css["mobile-menu__nav"]}`}
                aria-label="Мобільна навігація"
              >
                <ul className={`${css["mobile-menu__list"]}`}>
                  <li className={`${css["mobile-menu__item"]}`}>
                    <Link
                      className={`${css["mobile-menu__link"]}`}
                      href="#furniture"
                    >
                      Наші меблі
                    </Link>
                  </li>
                  <li className={`${css["mobile-menu__item"]}`}>
                    <Link
                      className={`${css["mobile-menu__link"]}`}
                      href="#about"
                    >
                      Про нас
                    </Link>
                  </li>
                  <li className={`${css["mobile-menu__item"]}`}>
                    <Link
                      className={`${css["mobile-menu__link"]}`}
                      href="#popular"
                    >
                      Популярні
                    </Link>
                  </li>
                  <li className={`${css["mobile-menu__item"]}`}>
                    <Link
                      className={`${css["mobile-menu__link"]}`}
                      href="#feedback"
                    >
                      Відгуки
                    </Link>
                  </li>
                </ul>
              </nav>

              <Link
                className={`${css["mobile-menu__cta"]} ${css["btn"]} ${css["btn--primary"]}`}
                href="#furniture"
              >
                До покупок
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
