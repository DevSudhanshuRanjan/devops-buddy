import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();   // ✅ FIRST app create

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/devopsbuddy")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);   // ✅ AFTER app create

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});