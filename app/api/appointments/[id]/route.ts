import { connectDB } from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;
    const data = await req.json();

    const appointment = await Appointment.findByIdAndUpdate(
      id,
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
