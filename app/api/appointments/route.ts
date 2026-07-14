import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function GET() {
  try {
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
