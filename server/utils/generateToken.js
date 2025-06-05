import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (email,id) => {
  return jwt.sign({email,_id:id},process.env.JWT_SECRET,{expiresIn:"7d"})
}