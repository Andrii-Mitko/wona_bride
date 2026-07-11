import css from "./Popular.module.css";
const Popular = () => {
  return (
    <section className={css.sectionPopular} id="popular">
      <div className={css.container}>
        <h2 className={css.popularTitle}>Популярні товари</h2>

        <div className={css.popularSwiper}>
          <ul className={css.popularList + " " + css.swiperWrapper}></ul>

          <div className={css.swiperControlPanel + " " + css.popularSwiperUp}>
            <nav
              className={css.swiperPaginationDotsPopular}
              aria-label="Сторінки слайдера"
            ></nav>

            <div
              className={css.popularArrows}
              role="group"
              aria-label="Керування слайдером"
            >
              <button
                className={css.swiperPrevButtonPopular}
                aria-label="Попередній слайд"
              >
                <svg className={css.leftArrow}>
                  <use href="/icons/icons.svg#icon-left-arrow-alt"></use>
                </svg>
              </button>

              <button
                className={css.swiperNextButtonPopular}
                aria-label="Наступний слайд"
              >
                <svg className={css.rightArrow}>
                  <use href="/icons/icons.svg#icon-right-arrow-alt"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;
