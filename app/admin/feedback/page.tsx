import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FeedbackAdminList from "@/components/FeedbackAdminList/FeedbackAdminList";
import Pagination from "@/components/Pagination/Pagination";
import css from "./page.module.css";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function AdminFeedbackPage({ searchParams }: Props) {
  await connectDB();

  const params = await searchParams;

  const currentPage = Number(params.page) || 1;

  const limit = 20;

  const skip = (currentPage - 1) * limit;

  const cookieStore = await cookies();

  const adminAuth = cookieStore.get("admin-auth");

  if (!adminAuth || adminAuth.value !== "true") {
    redirect("/admin/login");
  }

  const totalFeedbacks = await Feedback.countDocuments();

  const feedbacks = await Feedback.find()
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalPages = Math.ceil(totalFeedbacks / limit);

  return (
    <main className={css.page}>
      <h1 className={css.title}>Відгуки клієнтів</h1>

      <FeedbackAdminList feedbacks={JSON.parse(JSON.stringify(feedbacks))} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        pathname="/admin/feedback"
      />
    </main>
  );
}
