// components\About\About.tsx

import Image from "next/image";
import css from "./About.module.css";
import RevealOnScroll from "@/components/RevealOnScroll/RevealOnScroll";

export default function About() {
  return (
    <section className={css.aboutSection} id="about">
      <RevealOnScroll>
        <div className={`${css.container} ${css.aboutContainer}`}>
          <div className={css.aboutContent}>
            <hr className="section-divider" />

            <p className={css.label}>Про наш салон</p>

            <h2 className={css.aboutTitle}>
              Допомагаємо знайти сукню вашої мрії
            </h2>

            <p className={css.aboutText}>
              WONA Bride — це простір краси, стилю та особливих моментів. Ми
              підбираємо весільні та вечірні сукні, у яких кожна наречена
              відчуває себе впевненою та неповторною.
            </p>

            <p className={css.aboutText}>
              У нашій колекції представлені сучасні моделі з якісних тканин,
              витонченим декором та увагою до кожної деталі.
            </p>

            <p className={css.aboutText}>
              Ми допоможемо підібрати фасон, розмір та образ, який ідеально
              підійде саме вам.
            </p>
          </div>

          <div className={css.imageWrapper}>
            <Image
              src="/images/about.png"
              alt="Салон WONA Bride"
              fill
              sizes="
              (min-width: 1440px) 644px,
              (min-width: 768px) 704px,
              100vw
            "
              className={css.aboutImage}
            />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
