import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB to ${mongoose.connection.host}`);
  } catch (error) {
    mongoose.disconnect();
    process.exit(1);
  }
};

export default connectDB;