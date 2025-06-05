import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authValidate = async (req,res,next) => {
  const token = req.cookies.token
  
  if(!token){
    return res.status(401).json({message:"You are not authorized to access this route"})
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({message:"You are not authorized to access this route"})
  }
}