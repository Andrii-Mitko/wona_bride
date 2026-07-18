import FeedbackActions from "@/components/FeedbackActions/FeedbackActions";

import css from "./FeedbackAdminList.module.css";

type Props = {
  feedbacks: {
    _id: string;
    name: string;
    text: string;
    rating: number;
    approved: boolean;
  }[];
};

export default function FeedbackAdminList({ feedbacks }: Props) {
  return (
    <section className={css.list}>
      {feedbacks.map((item) => (
        <article key={item._id} className={css.card}>
          <div className={css.header}>
            <h3 className={css.name}>{item.name}</h3>

            <span
              className={item.approved ? css.statusApproved : css.statusWaiting}
            >
              {item.approved ? "Опубліковано" : "Очікує"}
            </span>
          </div>

          <p className={css.rating}>{"⭐".repeat(item.rating)}</p>

          <p className={css.text}>{item.text}</p>

          <FeedbackActions id={item._id} approved={item.approved} />
        </article>
      ))}
    </section>
  );
}
