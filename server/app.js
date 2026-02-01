import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';


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
import reviewsRoutes from './routes/reviewsRoute.js';
import shopMediaRoutes from './routes/shopRoute.js';
import jobApplicationRoutes from './routes/jobApplicationRoute.js';
import googleReviewsRoute from './routes/googleReviewsRoute.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://parturi.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
app.use("/api/reviwes", reviewsRoutes);
app.use("/api/shopMedia", shopMediaRoutes);
app.use("/api/job", jobApplicationRoutes);
app.use("/api/google-reviews", googleReviewsRoute);


export default app