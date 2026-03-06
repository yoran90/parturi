import rateLimit, { ipKeyGenerator } from "express-rate-limit";
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
import notificationRoutes from './routes/notificationRoute.js';
import feedBackRoutes from './routes/feedBackRoute.js';

import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';


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
  const robotsPath = path.join(__dirname, "../client/public/robots.txt");
  res.type("text/plain");
  res.sendFile(robotsPath, err => {
    if (err) {
      console.error("robots.txt error:", err);
      res.status(404).send("Not found");
    }
  });
});

// Serve sitemap.xml
/* app.get("/sitemap.xml", (req, res) => {
  const sitemapPath = path.join(__dirname, "../client/public/sitemap.xml");
  res.type("application/xml");
  res.sendFile(sitemapPath, err => {
    if (err) {
      console.error("sitemap.xml error:", err);
      res.status(404).send("Not found");
    }
  });
}); */




// Dynamic sitemap route
app.get('/sitemap.xml', async (req, res) => {
  try {
    // Define your pages
    const links = [
      { url: '/', changefreq: 'weekly', priority: 0.8 },
      { url: '/meistä', changefreq: 'weekly', priority: 0.8 },
      { url: '/palvelut', changefreq: 'weekly', priority: 0.8, 
        images: [
          { url: 'https://razorr.fi/uploads/service1.jpg', title: 'Service 1' },
          { url: 'https://razorr.fi/uploads/service2.jpg', title: 'Service 2' }
        ]
      },
      { url: '/galleria', changefreq: 'weekly', priority: 0.8 },
      { url: '/tuotet', changefreq: 'weekly', priority: 0.8 },
      { url: '/yhteystiedot', changefreq: 'weekly', priority: 0.8 },
      { url: '/opinion', changefreq: 'weekly', priority: 0.8 },
      // Add more pages here, even dynamic ones from your DB
    ];

    // Create sitemap stream
    const stream = new SitemapStream({ hostname: 'https://razorr.fi/' });

    // Set response header
    res.writeHead(200, { 'Content-Type': 'application/xml' });

    // Convert links to XML and send
    const xml = await streamToPromise(Readable.from(links).pipe(stream));
    res.end(xml.toString());

  } catch (err) {
    console.error('Sitemap generation error:', err);
    res.status(500).end();
  }
});



// Serve other static files from public folder
app.use(express.static(path.join(__dirname, "../client/public")));

// THEN serve React frontend (catch-all)
app.use(express.static(path.join(__dirname, "../client/dist")));




const allowedOrigins = [
  "http://localhost:5173",
  "https://parturi.vercel.app",
  "https://www.parturi.vercel.app",
  "https://razorr.fi",
  "https://www.razorr.fi"
];

// CORS middleware - Enhanced for Safari compatibility
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (server-to-server requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost during development
    if (origin.includes("localhost")) {
      return callback(null, true);
    }
    
    // Allow all Vercel preview and production domains
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    console.log(`CORS blocked origin: ${origin}`);
    return callback(new Error(`Origin ${origin} not allowed by CORS`), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  exposedHeaders: ["Content-Length", "Authorization", "Set-Cookie"],
  maxAge: 86400, // 24 hours for preflight cache
  optionsSuccessStatus: 200 // for legacy browser support
}));


// Limit for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //! 15 min
  max: 5,
  message: { error: "Liian monta kirjautumisyritystä. Odota 15 minuuttia." },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.body.email || ipKeyGenerator(req),
  skipSuccessfulRequests: true, //! count all requests; frontend will show message
});

app.get("/", (req, res) => {
  res.json("API is working!");
});


//! for limiting login attempts
app.use("/api/auth/login", loginLimiter);
app.use("/api/user/userLogin", loginLimiter);


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
app.use("/api/notifications", notificationRoutes);
app.use("/api/feedback", feedBackRoutes);


export default app