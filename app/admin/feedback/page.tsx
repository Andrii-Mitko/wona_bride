import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

import FeedbackAdminList from "@/components/FeedbackAdminList/FeedbackAdminList";

import css from "./page.module.css";

export default async function AdminFeedbackPage() {
  await connectDB();

  const feedbacks = await Feedback.find()
    .sort({
      createdAt: -1,
    })
    .lean();

  return (
    <main className={css.page}>
      <h1 className={css.title}>Відгуки клієнтів</h1>

      <FeedbackAdminList feedbacks={JSON.parse(JSON.stringify(feedbacks))} />
    </main>
  );
}
