import css from "./Feedback.module.css";

const Feedback = () => {
  return (
    <>
      <section className={css.feedback__section} id="feedback">
        <div className={css.container}>
          <h2 className={css.feedback__title}>Відгуки клієнтів</h2>
          <h3 className={css.feedback__description}>
            Дізнайтеся, що кажуть наші задоволені клієнти про наші сукні.
          </h3>
          <div className={css.feedback__swiper}>
            <ul className={css.feedback__list} data-feedback-list></ul>
            <div className={css.feedback__control_panel}>
              <nav
                className={css.feedback__pagination}
                aria-label="Сторінки слайдера"
              ></nav>
              <div
                className={css.feedback__arrows}
                role="group"
                aria-label="Керування слайдером"
              >
                <button
                  className={css.feedback__arrow}
                  aria-label="Попередній слайд"
                >
                  <svg className={css.feedback__arrow__icon}>
                    <use href="/icons/icons.svg#icon-left-arrow-alt"></use>
                  </svg>
                </button>
                <button
                  className={css.feedback__arrow}
                  aria-label="Наступний слайд"
                >
                  <svg className={css.feedback__arrow__icon}>
                    <use href="/icons/icons.svg#icon-right-arrow-alt"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feedback;
