import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Appointment from "@/models/Appointment";
import Feedback from "@/models/Feedback";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ message: "Немає доступу" }, { status: 401 });
    }

    await connectDB();

    const [orders, appointments, feedbacks] = await Promise.all([
      Order.countDocuments({ status: "new" }),
      Appointment.countDocuments({ status: "new" }),
      Feedback.countDocuments({ approved: false }),
    ]);

    return NextResponse.json({ orders, appointments, feedbacks });
  } catch (error) {
    console.error("Admin notifications error:", error);

    return NextResponse.json(
      { message: "Помилка отримання сповіщень" },
      { status: 500 },
    );
  }
}
