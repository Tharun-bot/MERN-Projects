import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try{
    const {success} = await rateLimit.limit("my-limit-key");
    if(!success){
      return res.status(429).json({
        message: "Too many rquests, please try again later"
      })
    }
    next();
  }
  catch(error){
    console.log("Error : ", error.body);
    next();
  }
}

export default rateLimiter;