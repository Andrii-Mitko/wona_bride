"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { feedbacks } from "@/data/feedbackData";

import css from "./Feedback.module.css";

const Feedback = () => {
  return (
    <section className={css.feedback__section} id="feedback">
      <div className={css.container}>
        <h2 className={css.feedback__title}>Відгуки клієнтів</h2>

        <h3 className={css.feedback__description}>
          Дізнайтеся, що кажуть наші задоволені клієнти про наші сукні.
        </h3>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: ".feedback-pagination",
          }}
          navigation={{
            nextEl: ".feedback-next",
            prevEl: ".feedback-prev",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },

            1440: {
              slidesPerView: 3,
            },
          }}
          className={css.swiper}
        >
          {feedbacks.map((item) => (
            <SwiperSlide key={item.name}>
              <article className={css.feedback__item}>
                <ul className={css.feedback__stars}>
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <li key={index}>
                      <svg className={css.feedback__star}>
                        <use href="/icons/icons.svg#icon-star" />
                      </svg>
                    </li>
                  ))}
                </ul>

                <p className={css.feedback__comment}>{item.text}</p>

                <p className={css.feedback__name}>{item.name}</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

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
      </div>
    </section>
  );
};

export default Feedback;
