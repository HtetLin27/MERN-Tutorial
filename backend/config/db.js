import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected: ", conn.connection.host);
  } catch (error) {
    console.log("Error in Connection DB:", error);
    process.exit(1); //procees code 1 means exit with failure, 0 means suceess
  }
};
