import bcrypt, { genSalt } from "bcryptjs";
import User from "../models/auth.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signUpController = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;
    if(!fullName || !email || !password){
      return res.status(400).json({message: "Invalid Credentails"});
    }
    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({message: "User already exists"});
    }
    if(password.length < 6){
      return res.status(400).json({message: "Password must be atleast 6 characters long"});
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName, 
      email,
      "password": hashedPassword
    })

    if(hashedPassword){
      generateToken(newUser._id, res);
      await newUser.save();
    }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({message : "Problem in loginController"});
    console.log("Error : ", error);
  }
}

export const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0})
  } catch (error) {
    return res.status(400).json({message: "Error in logging out"})
    console.log("Error : ", error);
  }
}

export const loginController = async (req, res) => {
  const {email, password} = req.body;
  try {
    if(!email || !password){
      return res.status(400).json({message: "Invalid Credentials"});
    }
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message: "Invalid Credentials"});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message: "Invalid Credentials"});
    }
    generateToken(user._id, res);
    res.status(200).json({message: "User logged in successfully"});
  } catch (error) {
    res.status(400).json({message: "Error in loginController"});
    console.log("Error : ", error);
  }
}

export const updateProfilePic = async (req, res) => {
  try {
    const {profilePic} = req.body;
    const {userId} = req.user._id;
    if(!profilePic){
      return res.status(40).json({message: "Profile pic not uploaded"});
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(userId, {profilePic : uploadResponse.secure_url}, {returnDocument: 'after'});
    res.status(200).json(updateUser, {message: "Uploaded successfully"});
  } catch (error) {
    res.status(400).json({message: "Problem in uploading image"});
    console.error("Error : ", error);
  }
}

