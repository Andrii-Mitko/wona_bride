import { Schema, model, models } from "mongoose";

const appointmentSchema = new Schema(
  {
    dressName: {
      type: String,
      required: true,
    },

    sizes: {
      type: [String],
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    date: {
      type: String,
    },

    time: {
      type: String,
    },

    message: {
      type: String,
    },

    privacy: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "confirmed", "completed", "cancelled"],
      default: "new",
    },
  },
  {
    timestamps: true,
  },
);

const Appointment =
  models.Appointment || model("Appointment", appointmentSchema);

export default Appointment;
