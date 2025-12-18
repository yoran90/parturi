import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./db/db.js";


if (process.env.NODE_ENV !== "test") {
  dotenv.config();
}



const startServer = async () => {
  if (process.env.NODE_ENV !== "test") {
    await connectDB(process.env.MONGODB_URL);

    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT} ✅`)
    );
  }
};

startServer();



