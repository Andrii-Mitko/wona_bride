
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../lib/mongodb";
import Dress from "../models/Dress";
import { dresses } from "../data/dresses";

async function importDresses() {
  try {
    await connectDB();

    await Dress.deleteMany();

    await Dress.insertMany(dresses);

    console.log("✅ Платья успешно добавлены в MongoDB");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Ошибка импорта:", error);

    await mongoose.disconnect();
    process.exit(1);
  }
}

importDresses();
