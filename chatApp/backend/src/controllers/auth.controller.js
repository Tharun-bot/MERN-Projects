import bcrypt from "bcryptjs"
import User from "../models/auth.model.js";
import { generateJWTToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

export const signUpController = async (req, res) => {
  try {
    const {firstName, password, email} = req.body;
    if(!firstName || !password || !email){
      return res.status(400).json({message: "Inadequate credentials"});
    }
    if(await User.findOne({email})){
      return res.status(400).json({message: "Email already exists"})
    }
    if(password.length < 6){
      return res.status(400).json({message: "Password must be atleast 6 characters"});
    }
    const salt = await bcrypt.genSalt(10); //same as hash
    console.log("salt : ", salt);
    const hashedPassword = await bcrypt.hash(password, salt); //its a promise, must be resolved, use await
    console.log("hashed : ", hashedPassword);
    if(hashedPassword){
      const user = new User({
        email, firstName, password: hashedPassword
      });
      generateJWTToken(user._id, res);
      await user.save(); //must be awaited

      res.status(201).json({message: user});
  }
  } catch (error) {
    console.error("Error : ", error.message)
    res.status(400).json({message: "Error in signup controller"})
  }
};

export const loginController = async (req, res) => {
  try {
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({message: "Insufficient Credentials"});
    }
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message: "User Does not exists"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message: "Invalid Credentials"});
    }
    generateJWTToken(user._id, res);
    res.status(200).json({
      "id" : user._id,
      email,
      "firstName" : user.firstName,
      "profilePic" : user.profilePic
    })

  } catch (error) {
    console.error("Error : ", error.body);
    res.status(500).json({message: "Problem in login controller"});
    
  }
};

export const logoutController = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge : 0});
    res.status(200).json({message : "Loogged Out Successfully"});
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfilePic = async (req, res) => { 
  try {
    const {profilePic} = req.body;
    if(!profilePic){
      return res.status(400).json({message : "Image not uploaded"})
    }
    const uploadImageToCloudinary = await cloudinary.uploader.upload(profilePic);
    const updatedUserEntry = await User({
      profilePic : uploadImageToCloudinary.secure_url
    });
    res.status(200).json(updatedUserEntry);
  } catch (error) {
    res.status(400).json({message : "Error in uploading image"});
    console.log("Error : ", error);
  }
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};