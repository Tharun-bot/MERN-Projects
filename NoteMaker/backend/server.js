import express from "express";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js"
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors';

const app = express();
dotenv.config();
connectDB();

// ✅ CORS must be first — before routes and other middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log(`This is a ${req.method} and the URL is ${req.url}`);
  next();
});

app.use(rateLimiter);

// ✅ Routes come after
app.use("/api/note", noteRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at port : ${process.env.PORT}`)
});
