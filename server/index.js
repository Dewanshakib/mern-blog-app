import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { blogRoutes } from "./routes/blogRoutes.js";
import cloudinary from "cloudinary"
import path from "path"

dotenv.config();

// cloudinary setup
cloudinary.v2.config({
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_SECRET_KEY,
  cloud_name:process.env.CLOUD_NAME
})


const app = express();
const PORT = process.env.PORT || 3001;
const _dirname = path.resolve()

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_VITE_SERVER,
    credentials: true,
  })
);


// user routes
app.use("/api/users", userRoutes);

// blogs routes
app.use("/api/blogs", blogRoutes);

// for development purposes only
app.use(express.static(path.join(_dirname,"/client/dist")))

// app.get("*", (_, res) => {
//    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
// });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});
