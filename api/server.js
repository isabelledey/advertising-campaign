import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
//import campaignsRouter from "./routes/campaigns";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8800;

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB!");
  } catch (error) {
    console.error(error);
  }
};

// Middleware
app.use(bodyParser.json());

// Routes
//app.use("/api/campaigns", campaignsRouter);

// Start server
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
