import { getApprovedFeedbacks } from "@/lib/api/feedback";
import Link from "next/link";
import FeedbackSwiper from "./FeedbackSwiper";

import css from "./Feedback.module.css";

export default async function Feedback() {
  const feedbacks = await getApprovedFeedbacks();

  return (
    <section className={css.feedback__section} id="feedback">
      <div className={css.container}>
        <h2 className={css.feedback__title}>Відгуки клієнтів</h2>

        <p className={css.feedback__description}>
          Дізнайтеся, що кажуть наші задоволені клієнти про наші сукні.
        </p>

        <FeedbackSwiper feedbacks={feedbacks} />

        <div className={css.feedback__control_panel}>
          <div className={`${css.feedback__pagination} feedback-pagination`} />

          <div className={css.feedback__arrows}>
            <button
              className={`${css.feedback__arrow} feedback-prev`}
              aria-label="Попередній"
            >
              <svg className={css.feedback__arrow__icon}>
                <use href="/icons/icons.svg#icon-left-arrow-alt" />
              </svg>
            </button>

            <button
              className={`${css.feedback__arrow} feedback-next`}
              aria-label="Наступний"
            >
              <svg className={css.feedback__arrow__icon}>
                <use href="/icons/icons.svg#icon-right-arrow-alt" />
              </svg>
            </button>
          </div>
        </div>

        <div className={css.feedbackAction}>
          <h3 className={css.feedbackActionTitle}>
            Поділіться своїми враженнями
          </h3>

          <p className={css.feedbackActionText}>
            Нам важлива ваша думка. Залиште відгук про нашу роботу.
          </p>

          <Link href="/feedback/new" className={css.feedbackButton}>
            Залишити відгук
          </Link>
        </div>
      </div>
    </section>
  );
}
