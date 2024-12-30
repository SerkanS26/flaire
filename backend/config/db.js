import mongoose from "mongoose";
import colors from "colors";

const conntectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected successfully!`.bgCyan.bold.italic);
  } catch (error) {
    console.log(`Error: ${error.message}.`.red.bold.inverse);
    process.exit(1);
  }
};

export default conntectDB;
