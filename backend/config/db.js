import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected succesfully ✅");
  } catch (error) {
    console.log("Error occurred while connecting with database");
  }
};

export default connectDB;
