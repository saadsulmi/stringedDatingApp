import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDB=mongoose.connect(process.env.MONGODB_URL);


export default connectDB;