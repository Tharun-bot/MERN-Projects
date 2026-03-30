import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/auth.model.js";
dotenv.config();

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if(!token){
      return res.status(400).json({message: "Token not found"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    if(!decoded){
      return res.status(400).json({message: "Cannot be decoded"});
    }
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
      return res.status(400).json({message: "User not found"})
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(400).json({message: "Cannot extract jwt key"});
    console.log("Error : ", error);
  }
}