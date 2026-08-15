// components\Faq\Faq.tsx

import React from "react";
import css from "./Faq.module.css";

const faqItems = [
  {
    question: "Як вибрати розмір сукні?",
    answer:
      "Ми допоможемо підібрати правильний розмір за вашими параметрами. Якщо виникнуть питання — зв'яжіться з нами, і консультант підкаже найкращий варіант.",
  },

  {
    question: "Чи можна приміряти сукню перед покупкою?",
    answer:
      "Так, ви можете записатися на примірку у нашому салоні WONA Bride та особисто оцінити модель перед покупкою.",
  },

  {
    question: "Як оформити замовлення?",
    answer:
      "Оберіть сукню в каталозі, додайте її до кошика та заповніть форму замовлення. Після цього ми зв'яжемося з вами для підтвердження деталей.",
  },

  {
    question: "Які способи оплати доступні?",
    answer:
      "Умови оплати узгоджуються індивідуально після підтвердження замовлення нашим менеджером.",
  },

  {
    question: "Чи можна забронювати сукню?",
    answer:
      "Так, можливість бронювання залежить від конкретної моделі. Деталі можна уточнити у консультанта.",
  },

  {
    question: "Чи є доставка?",
    answer:
      "Так, ми можемо організувати доставку сукні за погодженням з клієнтом.",
  },

  {
    question: "Чи можна змінити або підкоригувати сукню?",
    answer:
      "Можливість змін залежить від моделі сукні. Ми обговоримо всі деталі перед покупкою.",
  },
];

export default function Faq() {
  return (
    <section className={css["faq-section"]} id="faq">
      <div className={css["faq-container"]}>
        <hr className="section-divider" style={{ margin: "0 auto 16px" }} />

        <h2 className={css["section-faq__title"]}>
          Відповіді на часті питання
        </h2>

        <ul className={css["faq__list"]}>
          {faqItems.map((item) => (
            <li key={item.question} className={css["faq__list-item"]}>
              <details className={css["faq__item"]}>
                <summary className={css["faq__question"]}>
                  <span className={css["faq-text"]}>{item.question}</span>

                  <span className={css["faq__icons"]}>
                    <svg
                      className={css["faq-icon-down"]}
                      width="24"
                      height="24"
                    >
                      <use href="/icons/icons.svg#icon-chevron-down" />
                    </svg>
                  </span>
                </summary>

                <p className={css["faq__answer"]}>{item.answer}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
