import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.route.js";
import linkRoutes from "./routes/link.route.js";
dotenv.config();
import { connectDB } from "./config/db.config.js";
import protect from "./middlewares/protect.middleware.js";

const app = express();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", protect, userRoutes);
app.use("/api/links", linkRoutes);


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running in mode on port ${PORT}`);
});
