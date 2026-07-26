import css from "./Contacts.module.css";
import { contacts } from "@/constants/contacts";
import LazyMap from "./LazyMap";

export default function Contacts() {
  return (
    <section className={css.section} id="contacts">
      <div className={css.container}>
        <div className={css.content}>
          <h2 className={css.title}>Контакти</h2>

          <p className={css.text}>
            Завітайте до нашого салону та приміряйте свою ідеальну весільну
            сукню.
          </p>

          <ul className={css.list}>
            <li>
              📍
              <a
                href={contacts.mapLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                вул. Соборна, 23, м. Бар
              </a>
            </li>

            <li>
              📞
              <a href="tel:+380966715746">+38 (096) 671 57 46</a>
            </li>

            <li>
              <a
                href="https://www.tiktok.com/@wona_bride"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="tiktok"
              >
                <svg width="24" height="24">
                  <use href="/icons/icons.svg#icon-tiktok"></use>
                </svg>{" "}
                TikTok
              </a>
            </li>

            <li>🕒 Вт–Сб: 09:00–17:00</li>
            <li>🕒Нд: 09:00–14:00</li>
            <li>🕒Пн: вихідний</li>
          </ul>

          <a
            className={css.button}
            href={contacts.mapLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Прокласти маршрут
          </a>

          <div className={css.social}>
            <a
              href="https://t.me/USERNAME_TELEGRAM"
              target="_blank"
              rel="noopener noreferrer"
              className={css.socialLink}
            >
              Telegram
            </a>

            <a
              href="viber://chat?number=+380966715746"
              target="_blank"
              rel="noopener noreferrer"
              className={css.socialLink}
            >
              Viber
            </a>
          </div>
        </div>
        <div className={css.map}>
          <LazyMap />
        </div>
      </div>
    </section>
  );
}
