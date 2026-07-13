import css from "./Faq.module.css";

const faqItems = [
  {
    question: "Чи потрібно записуватися на примірку?",
    answer:
      "Так, ми рекомендуємо записатися заздалегідь, щоб консультант міг приділити вам достатньо часу та допомогти створити ідеальний образ.",
  },
  {
    question: "Скільки часу займає примірка сукні?",
    answer:
      "Зазвичай примірка займає від 40 хвилин до 1 години. За цей час ви зможете приміряти кілька моделей та вибрати найкращу.",
  },
  {
    question: "Чи можна забронювати весільну сукню?",
    answer:
      "Так, після вибору моделі ми можемо обговорити умови бронювання сукні.",
  },
  {
    question: "Як підібрати правильний розмір?",
    answer:
      "Наші консультанти допоможуть визначити ваш розмір та підібрати модель, яка найкраще підкреслить вашу фігуру.",
  },
  {
    question: "Чи можна внести зміни у сукню?",
    answer:
      "Можливість коригування залежить від конкретної моделі. Усі деталі можна обговорити під час примірки.",
  },
  {
    question: "Чи є у вас аксесуари до суконь?",
    answer:
      "Так, ми допоможемо підібрати аксесуари, які доповнять образ нареченої.",
  },
  {
    question: "Як здійснюється оплата?",
    answer:
      "Оплата здійснюється після узгодження всіх деталей покупки. Умови оплати можна уточнити у консультанта.",
  },
];

export default function Faq() {
  return (
    <section className={css["faq-section"]} id="faq">
      <div className={css["faq-container"]}>
        <h2 className={css["section-faq__title"]}>Часті питання</h2>

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
