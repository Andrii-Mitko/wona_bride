import { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Feedback = models.Feedback || model("Feedback", FeedbackSchema);

export default Feedback;
