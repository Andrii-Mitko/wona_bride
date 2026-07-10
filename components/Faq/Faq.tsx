import css from "./Faq.module.css";
const Faq = () => {
  return (
    <>
      <section className={css["faq-section"]} id="faq">
        <div className={css["faq-container"]}>
          <div className={css["section-faq"]}>
            <h2 className={css["section-faq__title"]}>Часті питання</h2>
          </div>

          <ul className={css["faq__list"]}>
            <li className={css["faq__list-item"]}>
              <details className={css["faq__item"]}>
                <summary className={css["faq__question"]}>
                  <span className={css["faq-text"]}>
                    Як здійснюється доставка суконь?
                  </span>
                  <span className={css["faq__icons"]} aria-hidden="true">
                    <svg
                      className={css["faq-icon-down"]}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="./icons/icons.svg#icon-chevron-down"></use>
                    </svg>
                  </span>
                </summary>
                <p className={css["faq__answer"]}>
                  Ми доставляємо сукні по всій Україні надійними службами
                  доставки. Після оформлення замовлення ви отримаєте номер для
                  відстеження посилки. Терміни доставки залежать від вашого
                  регіону.
                </p>
              </details>
            </li>

            <li className={css["faq__list-item"]}>
              <details className={css["faq__item"]}>
                <summary className={css["faq__question"]}>
                  <span className={css["faq-text"]}>
                    Чи можна обрати колір сукні?
                  </span>
                  <span className={css["faq__icons"]} aria-hidden="true">
                    <svg
                      className={css["faq-icon-down"]}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="./icons/icons.svg#icon-chevron-down"></use>
                    </svg>
                  </span>
                </summary>
                <p className={css["faq__answer"]}>
                  Так, у багатьох моделях Деякі моделі доступні в різних
                  кольорах і розмірах. Інформація про доступні варіанти вказана
                  в описі товару або її можна уточнити у наших консультантів.
                </p>
              </details>
            </li>

            <li className={css["faq__list-item"]}>
              <details className={css["faq__item"]}>
                <summary className={css["faq__question"]}>
                  <span className={css["faq-text"]}>
                    Чи можна повернути або обміняти сукню?
                  </span>
                  <span className={css["faq__icons"]} aria-hidden="true">
                    <svg
                      className={css["faq-icon-down"]}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="./icons/icons.svg#icon-chevron-down"></use>
                    </svg>
                  </span>
                </summary>
                <p className={css["faq__answer"]}>
                  Так, повернення або обмін можливі відповідно до чинного
                  законодавства України. Якщо сукня не була у використанні,
                  збережено її товарний вигляд, бірки та комплектацію,
                  зверніться до нас протягом установленого терміну, і ми
                  допоможемо оформити повернення або обмін.
                </p>
              </details>
            </li>

            <li className={css["faq__list-item"]}>
              <details className={css["faq__item"]}>
                <summary className={css["faq__question"]}>
                  <span className={css["faq-text"]}>
                    Чи надаєте ви послугу індивідуального пошиття сукні?
                  </span>
                  <span className={css["faq__icons"]} aria-hidden="true">
                    <svg
                      className={css["faq-icon-down"]}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="./icons/icons.svg#icon-chevron-down"></use>
                    </svg>
                  </span>
                </summary>
                <p className={css["faq__answer"]}>
                  Наразі ми не надаємо послугу індивідуального пошиття, але в
                  нашій колекції представлено багато моделей суконь різних
                  фасонів, розмірів і стилів. Наші консультанти допоможуть
                  підібрати сукню, яка ідеально підійде саме вам.
                </p>
              </details>
            </li>

            <li className={css["faq__list-item"]}>
              <details className={css["faq__item"]}>
                <summary className={css["faq__question"]}>
                  <span className={css["faq-text"]}>
                    Як підібрати правильний розмір сукні?
                  </span>
                  <span className={css["faq__icons"]} aria-hidden="true">
                    <svg
                      className={css["faq-icon-down"]}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="./icons/icons.svg#icon-chevron-down"></use>
                    </svg>
                  </span>
                </summary>
                <p className={css["faq__answer"]}>
                  Наші консультанти допоможуть визначити ваш розмір і підібрати
                  модель, яка найкраще сяде по фігурі. Перед покупкою
                  рекомендуємо скористатися таблицею розмірів або записатися на
                  примірку.
                </p>
              </details>
            </li>

            <li className={css["faq__list-item"]}>
              <details className={css["faq__item"]}>
                <summary className={css["faq__question"]}>
                  <span className={css["faq-text"]}>
                    Чи допомагаєте ви підібрати аксесуари до сукні?
                  </span>
                  <span className={css["faq__icons"]} aria-hidden="true">
                    <svg
                      className={css["faq-icon-down"]}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="./icons/icons.svg#icon-chevron-down"></use>
                    </svg>
                  </span>
                </summary>
                <p className={css["faq__answer"]}>
                  Так, наші консультанти допоможуть створити завершений образ.
                  Ми підкажемо, які аксесуари найкраще доповнять вашу сукню та
                  підкреслять її стиль.
                </p>
              </details>
            </li>

            <li className={css["faq__list-item"]}>
              <details className={css["faq__item"]}>
                <summary className={css["faq__question"]}>
                  <span className={css["faq-text"]}>Як здійснити оплату?</span>
                  <span className={css["faq__icons"]} aria-hidden="true">
                    <svg
                      className={css["faq-icon-down"]}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="./icons/icons.svg#icon-chevron-down"></use>
                    </svg>
                  </span>
                </summary>
                <p className={css["faq__answer"]}>
                  Оплатити замовлення можна банківською карткою або післяплатою
                  під час отримання. Детальні умови оплати ви побачите під час
                  оформлення замовлення.
                </p>
              </details>
            </li>

            <li className={css["faq__list-item"]}>
              <details className={css["faq__item"]}>
                <summary className={css["faq__question"]}>
                  <span className={css["faq-text"]}>
                    Чи можна записатися на примірку?
                  </span>
                  <span className={css["faq__icons"]} aria-hidden="true">
                    <svg
                      className={css["faq-icon-down"]}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="./icons/icons.svg#icon-chevron-down"></use>
                    </svg>
                  </span>
                </summary>
                <p className={css["faq__answer"]}>
                  Так, ви можете записатися на примірку у зручний для вас час.
                  Зв`яжіться з нами телефоном або через форму зворотного
                  зв`язку, і ми допоможемо підібрати ідеальну сукню.
                </p>
              </details>
            </li>

            <li className={css["faq__list-item"]}>
              <details className={css["faq__item"]}>
                <summary className={css["faq__question"]}>
                  <span className={css["faq-text"]}>
                    Як доглядати за весільною сукнею?
                  </span>
                  <span className={css["faq__icons"]} aria-hidden="true">
                    <svg
                      className={css["faq-icon-down"]}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <use href="./icons/icons.svg#icon-chevron-down"></use>
                    </svg>
                  </span>
                </summary>
                <p className={css["faq__answer"]}>
                  Ми рекомендуємо дбайливий догляд відповідно до типу тканини та
                  оздоблення сукні. Наші консультанти підкажуть, як правильно
                  зберігати та чистити вашу сукню.
                </p>
              </details>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Faq;
