import jwt from "jsonwebtoken";

export const generateJWTToken = (userId, res) => {
  try {
    const token = jwt.sign(
      { userId }, 
      process.env.JWT_SECRETKEY,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    return token;

  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};