"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import css from "./Feedback.module.css";

type FeedbackItem = {
  _id: string;
  name: string;
  text: string;
  rating: number;
};

type Props = {
  feedbacks: FeedbackItem[];
};

export default function FeedbackSwiper({ feedbacks }: Props) {
  return (
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
        <SwiperSlide key={item._id}>
          <article className={css.feedback__item}>
            <ul className={css.feedback__stars}>
              {Array.from({
                length: item.rating,
              }).map((_, index) => (
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
  );
}
