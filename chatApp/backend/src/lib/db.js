import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGO DB Successfully connected to : ", conn.connection.host);
  } catch (error) {
    console.error("Error : ", error.body);
    console.log("Error in connecting MongoDB");
  }
}

export default connectDB;