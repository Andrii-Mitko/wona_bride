import Link from "next/link";
import css from "./Footer.module.css";
const Footer = () => {
  return (
    <footer className={css.footer} id="footer">
      <div className={css["footer__container"]}>
        <Link
          href="#top"
          className={
            css["footer__logo"] + " " + css.logo + " " + css["logo--light"]
          }
          aria-label="WONA — на головну"
        >
          <svg className={css["footer__logo-icon"]} width="228" height="49">
            <use href="./icons/icons.svg#icon-logo"></use>
          </svg>
        </Link>

        <p className={css["footer__copy-desk"]}>
          © 2026 WONA. Всі права захищені.
        </p>

        <nav className={css["footer__nav"]} aria-label="Навігація в футері">
          <ul className={css["footer__nav-list"]}>
            <li className={css["footer__nav-item"]}>
              <Link className={css["footer__nav-link"]} href="#furniture">
                Наші сукні
              </Link>
            </li>
            <li className={css["footer__nav-item"]}>
              <Link className={css["footer__nav-link"]} href="#about">
                Про нас
              </Link>
            </li>
            <li className={css["footer__nav-item"]}>
              <Link className={css["footer__nav-link"]} href="#popular">
                Популярні
              </Link>
            </li>
            <li className={css["footer__nav-item"]}>
              <Link className={css["footer__nav-link"]} href="#faq">
                Часті питання
              </Link>
            </li>
            <li className={css["footer__nav-item"]}>
              <Link className={css["footer__nav-link"]} href="#feedback">
                Відгуки
              </Link>
            </li>
          </ul>
        </nav>

        <ul className={css["footer__socials"]} aria-label="Соціальні мережі">
          <li className={css["footer__social-item"]}>
            <Link
              className={css["footer__social-link"]}
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <svg
                className={css["footer__social-icon"]}
                width="24"
                height="24"
              >
                <use href="./icons/icons.svg#icon-youtube"></use>
              </svg>
            </Link>
          </li>

          <li className={css["footer__social-item"]}>
            <Link
              className={css["footer__social-link"]}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                className={css["footer__social-icon"]}
                width="24"
                height="24"
              >
                <use href="./icons/icons.svg#icon-instagram"></use>
              </svg>
            </Link>
          </li>

          <li className={css["footer__social-item"]}>
            <Link
              className={css["footer__social-link"]}
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                className={css["footer__social-icon"]}
                width="24"
                height="24"
              >
                <use href="./icons/icons.svg#icon-facebook"></use>
              </svg>
            </Link>
          </li>
        </ul>

        <p className={css["footer__copy-mobi"]}>
          © 2026 WONA. Всі права захищені.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
