import Link from "next/link";
import css from "./Footer.module.css";
import Image from "next/image";
import { navigation } from "@/constants/navigation";
const Footer = () => {
  return (
    <footer className={css.footer} id="footer">
      <div className={css["footer__container"]}>
        <Link
          href="/#top"
          className={`${css.footer__logo}  ${css.logo}  ${css["logo--light"]}`}
          aria-label="WONA — на головну"
        >
          <Image
            className={css.logo__img}
            width={160}
            height={62}
            src="/images/logo.png"
            alt="WONA"
            priority
          />
        </Link>

        <p className={css["footer__copy-desk"]}>
          © 2026 WONA. Всі права захищені.
        </p>

        <nav className={css["footer__nav"]} aria-label="Навігація в футері">
          <ul className={css["footer__nav-list"]}>
            {navigation.map((item) => (
              <li key={item.href} className={css["footer__nav-item"]}>
                <Link className={css["footer__nav-link"]} href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={css["footer__socials"]} aria-label="Соціальні мережі">
          <li className={css["footer__social-item"]}>
            <Link
              className={css["footer__social-link"]}
              href="https://vt.tiktok.com/ZSXByLKy6/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="tiktok"
            >
              <svg
                className={css["footer__social-icon"]}
                width="24"
                height="24"
              >
                <use href="/icons/icons.svg#icon-tiktok"></use>
              </svg>
              TikTok
            </Link>
          </li>

          <li className={css["footer__social-item"]}>
            <Link
              className={css["footer__social-link"]}
              href="https://www.instagram.com/wona_bride"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                className={css["footer__social-icon"]}
                width="24"
                height="24"
              >
                <use href="/icons/icons.svg#icon-instagram"></use>
              </svg>
              Instagram
            </Link>
          </li>
        </ul>
        <div className={css.contacts}>
          <Link href="tel:+380966715746" className={css.contact}>
            +38 (096) 671 57 46
          </Link>

          <p className={css.address}>м. Бар, Вінницька область</p>
        </div>
        <p className={css["footer__copy-mobi"]}>
          © 2026 WONA. Всі права захищені.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
