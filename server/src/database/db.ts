import mongoose from "mongoose";

export async function connectToDb() {
  const MONGO_URL =
    process.env.MONGO_URL || "mongodb+srv://admin:admin@dastish.gf1hbe3.mongodb.net/?retryWrites=true&w=majority";

  try {
    await mongoose.connect(MONGO_URL);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  console.log("Connected to MongoDB");
}