import Link from "next/link";
import css from "./Contacts.module.css";

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
              <Link
                href="https://maps.google.com/?q=вулиця+Соборна+23+Бар"
                target="_blank"
                rel="noopener noreferrer"
              >
                вулиця Соборна 23, м. Бар, Вінницька область
              </Link>
            </li>

            <li>
              📞
              <Link href="tel:+380966715746">+38 (096) 671 57 46</Link>
            </li>

            <li>
              <Link
                href="https://www.tiktok.com/@wona_bride"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="tiktok"
              >
                <svg width="24" height="24">
                  <use href="/icons/icons.svg#icon-tiktok"></use>
                </svg>{" "}
                TikTok
              </Link>
            </li>

            <li>🕒 Вт–Сб: 09:00–17:00</li>
            <li>🕒Нд: 09:00–14:00</li>
            <li>🕒Пн: вихідний</li>
          </ul>

          <Link
            className={css.button}
            href="https://www.google.com.ua/maps/dir//Bar+Soborna23,+%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%A1%D0%BE%D0%B1%D0%BE%D1%80%D0%BD%D0%B0,+23,+%D0%91%D0%B0%D1%80,+%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+23000/@49.07561,27.6694121,17z/data=!4m17!1m8!3m7!1s0x473289003b8ca357:0xfeff1fb08f9ea93f!2sBar+Soborna23!8m2!3d49.0762724!4d27.6713551!15sClPQstGD0LvQuNGG0Y8g0KHQvtCx0L7RgNGM0YHRjNC60LAgMjMsINC8LiDQkdCw0YAsINCS0ZbQvdC9０LjRhtGM０rQsCDQvtCx０LvQsNGB０YLRjJIBEmFwYX０bWVudF9idWlsZGluZ-ABAA!１6s%2Fg%2F１１lnst０665!４m７!１m０!１m５!１m１!１s０x４７３２８９００3b８ca３57:０xfeff１fb０８f９ea９3f!２m２!１d２７.６713551!２d４９.0762724?hl=ru&entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            Прокласти маршрут
          </Link>

          <div className={css.social}>
            <Link
              href="https://t.me/li_lelii"
              target="_blank"
              rel="noopener noreferrer"
              className={css.socialLink}
            >
              Telegram
            </Link>

            <Link
              href="viber://chat?number=+380966715746"
              target="_blank"
              rel="noopener noreferrer"
              className={css.socialLink}
            >
              Viber
            </Link>
          </div>
        </div>
        <div className={css.map}>
          <iframe
            src="https://www.google.com/maps?q=вулиця%20Соборна%2023%20Бар&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="WONA Bride location"
          />
        </div>
      </div>
    </section>
  );
}
