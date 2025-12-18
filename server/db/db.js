import mongoose from "mongoose";

export const connectDB = async (uri) => {
  if (!uri) {
    throw new Error("MongoDB URI is required");
  }

  await mongoose.connect(uri);
};
