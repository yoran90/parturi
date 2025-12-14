import express from 'express';
import cors from 'cors';
import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';


dotenv.config();




import informationRoutes from './routes/informationRoute.js';
import mediaRoutes from './routes/mediaRoute.js';
import priceRoutes from './routes/priceRoute.js';
import productRoutes from './routes/productsRoute.js';
import emailRoutes from './routes/emailRoute.js';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';
import headetLogoRoutes from './routes/headerLogoRoute.js';
import aboutRouters from './routes/aboutUsRoute.js';
import titleForpageRoutes from './routes/titleForPageRoute.js';
import headerPagesRoutes from './routes/headrePagesRoute.js';
import reviewsRoutes from './routes/reviewsRoute.js';
import shopMediaRoutes from './routes/shopRoute.js';



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
  credentials: true
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));




app.get("/test", (req, res) => {
  res.json("API is working!");
});




app.use("/api/information", informationRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/price", priceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/header-logo", headetLogoRoutes);
app.use("/api/about-us", aboutRouters);
app.use("/api/titleForPages", titleForpageRoutes);
app.use("/api/headerPages", headerPagesRoutes);
app.use("/api/reviwes", reviewsRoutes);
app.use("/api/shopMedia", shopMediaRoutes);


if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB successfully 🌍"))
    .catch((err) => console.log(err));
}


let server;

// Only start server if not testing
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 8001;
  server = app.listen(PORT, () =>
    console.log(`Server running on port ${PORT} ✅`)
  );
}

export { server };
export default app;
