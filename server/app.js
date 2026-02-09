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
app.use(express.json({ limit: "10mb" })); // <-- increase from default
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// for searching the site in google
//app.use('/sitemap.xml', express.static(path.join(__dirname, 'public', 'sitemap.xml')));
// Serve robots.txt and sitemap.xml first
app.get("/robots.txt", (req, res) => {
  res.sendFile(path.resolve("../client/public/robots.txt"), err => {
    if (err) {
      console.error("robots.txt error:", err);
      res.status(404).send("Not found");
    }
  });
});

// Serve sitemap.xml before React
app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml"); // important
  res.sendFile(path.resolve("../client/public/sitemap.xml"), err => {
    if (err) {
      console.error("Error sending sitemap.xml:", err);
      res.status(404).send("Not found");
    }
  });
});


// Serve other static files from public folder
app.use(express.static(path.join(__dirname, "../client/public")));

// THEN serve React frontend (catch-all)
app.use(express.static(path.join(__dirname, "../client/dist")));



//app.use('/robots.txt', express.static(path.join(__dirname, 'public', 'robots.txt')));
// end for searching the site in google


const allowedOrigins = [
  "http://localhost:5173",
  "https://parturi.vercel.app",
  "https://www.parturi.vercel.app",
  "https://razorr.fi",
  "https://www.razorr.fi"
];


app.use(cors({
  origin: (origin, callback) => {
    // allow Postman / server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // ❗ IMPORTANT: do NOT throw an error
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));







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