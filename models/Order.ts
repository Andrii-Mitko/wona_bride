import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      comment: {
        type: String,
      },
    },

    items: [
      {
        dressId: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        size: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    total: {
      type: Number,
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

const Order = models.Order || mongoose.model("Order", OrderSchema);

export default Order;
