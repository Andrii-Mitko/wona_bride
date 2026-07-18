import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Order from "@/models/Order";
import Appointment from "@/models/Appointment";
import Feedback from "@/models/Feedback";

export async function GET() {
  await connectDB();

  const [orders, appointments, feedbacks] = await Promise.all([
    Order.countDocuments({
      status: "new",
    }),

    Appointment.countDocuments({
      status: "new",
    }),

    Feedback.countDocuments({
      approved: false,
    }),
  ]);

  return NextResponse.json({
    orders,
    appointments,
    feedbacks,
  });
}
