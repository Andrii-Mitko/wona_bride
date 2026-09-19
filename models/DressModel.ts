import mongoose, { Schema, models } from "mongoose";

const DressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    article: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    fabric: [
      {
        type: String,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    category: [
      {
        type: String,
      },
    ],

    style: [
      {
        type: String,
      },
    ],

    sizeType: {
      type: String,
      enum: ["letter", "women", "kids"],
      required: true,
    },

    sizes: [
      {
        type: String,
      },
    ],

    isPopular: {
      type: Boolean,
      default: false,
    },
    availability: {
      type: String,
      enum: ["available", "order", "waiting"],
      default: "order",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const DressModel = models.Dress || mongoose.model("Dress", DressSchema);

export default DressModel;
