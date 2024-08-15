import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("DB connected Successfully");
  } catch (error) {
    console.log("Something Went wrong...unable to connect");
  }
};
