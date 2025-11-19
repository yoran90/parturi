import express from 'express'
import cors from 'cors'
import mongoose, { Mongoose } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url';




import informationRoutes from './routes/informationRoutes.js'
import mediaRoutes from './routes/mediaRoute.js'
import priceRoutes from './routes/priceRouter.js'
import productRoutes from './routes/productsRoute.js'
import emailRoutes from './routes/emailRoute.js'
import authRoutes from './routes/authRoute.js'
import headetLogoRoutes from './routes/headerLogoRoute.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",  // your frontend
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
app.use("/api/header-logo", headetLogoRoutes)


mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to MongoDB successfully 🌍");
}).catch((error) => {
  console.log(error)
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on port... ${PORT} ✅`);
});