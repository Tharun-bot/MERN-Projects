import express from "express";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js"
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

//Init app instance
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use((req, res, next) => {
  console.log(`This is a ${req.method} and the URL is ${req.url}`);
  next();
})
app.use(rateLimiter);

app.use("/api/note", noteRoutes);

//Start a simple server
app.listen(process.env.PORT, () => {
  console.log(`Server running at port : ${process.env.PORT}`)
});



