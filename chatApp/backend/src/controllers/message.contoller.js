import cloudinary from "../lib/cloudinary.js";
import User from "../models/auth.model.js";
import Message from "../models/message.model.js";

export const getAllUsersForSidebar = async (req, res) => {
  try {
    const myId = req.user._id;
    if(!myId){
      return res.status(400).json({message: "User must be logged in first"});
    }
    const allUsers = await User.find({_id : {$ne : myId}}).select("-password");
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({message: "Problem in getting users"});
    console.log("Error : ", error);
  }
}

export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const recieverId = req.params.id;

    const messages = await Message.find({
      $or:[
        {senderId : myId, recieverId: recieverId},
        {senderId : recieverId, recieverId : myId}
      ]
    })
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({message: "Problem with getMessageController"});
    console.log("Error : ", error);
  }
}

export const sendMessage = async (req, res) => {
  const {image, message} = req.body;
  try {
    const myId = req.user._id;
    const recieverId = req.params.id;

    let imageURL;
    if(image){
      const uploadImage = await cloudinary.uploader.upload(image);
      imageURL = uploadImage.secure_url;
    }

    const updatedMessages = new Message({
      senderId: myId,
      recieverId : recieverId,
      message,
      image: imageURL
    });

    await updatedMessages.save();
    res.status(201).json(updatedMessages);

  } catch (error) {
    res.status(500).json({message: "Problem with messaging controller"});
    console.log("Error : ", error);
  }
}
