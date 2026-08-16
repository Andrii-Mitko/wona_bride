import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return Response.json({ message: "Немає доступу" }, { status: 401 });
    }

    await connectDB();

    const appointments = await Appointment.find().sort({
      createdAt: -1,
    });

    return Response.json(appointments);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Помилка отримання заявок",
      },
      {
        status: 500,
      },
    );
  }
}
