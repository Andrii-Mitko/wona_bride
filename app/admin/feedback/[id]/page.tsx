import { notFound } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

import FeedbackEditForm from "@/components/FeedbackEditForm/FeedbackEditForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditFeedbackPage({ params }: Props) {
  const { id } = await params;

  await connectDB();

  const feedback = await Feedback.findById(id).lean();

  if (!feedback) {
    notFound();
  }

  return (
    <main>
      <FeedbackEditForm
        id={String(feedback._id)}
        name={feedback.name}
        text={feedback.text}
        rating={feedback.rating}
      />
    </main>
  );
}
