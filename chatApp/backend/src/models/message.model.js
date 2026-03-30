import mongoose from "mongoose";
import User from "./auth.model.js";

const messageSchema = new mongoose.Schema({
  "senderId" : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  "recieverId" : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  "image":{
    type: String,
  },
  "message":{
    type: String
  }
}, {timestamp : true})

const Message = mongoose.model("Message", messageSchema);

export default Message;