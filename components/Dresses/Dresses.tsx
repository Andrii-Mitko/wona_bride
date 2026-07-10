import css from "./Dresses.module.css";

const Dresses = () => {
  return (
    <section className={css["furniture__section"]} id="furniture">
      <div className={`${css["container"]} ${css["furniture__container"]}`}>
        <div className={css["furniture__head"]}>
          <h2 className={css["furniture__card__title"]}>Наші сукні</h2>
          <p className={css["furniture__subtitle"]}>
            Обирайте весільні сукні, які поєднують елегантність, комфорт і
            бездоганний стиль для вашого особливого дня.
          </p>
        </div>

        <div className={css["furniture__categories"]} data-categories-container>
          {" "}
          {/* renderCategories() */}
        </div>

        <div className={css["furniture__list"]} data-furniture-container></div>

        <div
          className={css["furniture__pagination-wrap"] + " " + css["is-hidden"]}
          data-furniture-pagination-wrap
        >
          <div
            className={css["furniture__pagination"]}
            aria-label="Пагінація меблів"
          >
            <button
              className={css["furniture__pagination__arrow"]}
              type="button"
              data-furniture-prev
              aria-label="Попередня сторінка"
            >
              <svg
                className={css["furniture__pagination__arrow__icon"]}
                width="24"
                height="24"
                aria-hidden="true"
              >
                <use href="/icons/icons.svg#icon-left-arrow-alt"></use>
              </svg>
            </button>

            <div
              className={css["furniture__pagination__pages"]}
              data-furniture-pagination
            ></div>

            <button
              className={css["furniture__pagination__arrow"]}
              type="button"
              data-furniture-next
              aria-label="Наступна сторінка"
            >
              <svg
                className={css["furniture__pagination__arrow__icon"]}
                width="24"
                height="24"
                aria-hidden="true"
              >
                <use href="/icons/icons.svg#icon-right-arrow-alt"></use>
              </svg>
            </button>
          </div>
        </div>

        <div className={css["furniture__actions"]}>
          <button
            className={
              css["furniture__load-more"] +
              " " +
              css["product__btn"] +
              " " +
              css["btn"] +
              " " +
              css["btn__furniture"]
            }
            type="button"
            data-load-more
          >
            Показати ще
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dresses;
