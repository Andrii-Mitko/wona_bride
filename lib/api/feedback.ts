import { connectDB } from "@/lib/mongodb";
import Feedback from "@/models/Feedback";

export async function getApprovedFeedbacks() {
  await connectDB();

  const feedbacks = await Feedback.find({
    approved: true,
  })
    .sort({
      createdAt: -1,
    })
    .lean();

  return JSON.parse(JSON.stringify(feedbacks));
}
