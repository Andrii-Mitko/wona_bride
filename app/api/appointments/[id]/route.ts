import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();

    const data = await req.json();

    const appointment = await Appointment.findByIdAndUpdate(
      params.id,
      {
        status: data.status,
      },
      {
        new: true,
      },
    );

    return Response.json(appointment);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Помилка оновлення",
      },
      {
        status: 500,
      },
    );
  }
}
