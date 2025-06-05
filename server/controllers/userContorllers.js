import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// register user
export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user" });
  }
}

// login
export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User is not registered" });
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return res.status(400).json({ message: "Password is incorrect" });
  }

  try {
    const token = generateToken(email, user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 3600 * 1000,
    });

    return res
      .status(201)
      .json({
        message: "User Logged In successfully",
        userInfo: { username: user.username, email: user.email },
      });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in user" });
  }
}

// profile (protected)
export async function getMyProfile(req, res) {
  const id = req.user._id;

  if (!id) {
    return res
      .status(401)
      .json({ message: "Sign in to access this page" });
  }

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user profile" });
  }
}

// logout (protected)
export async function logoutUser(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error logging out user" });
  }
}
