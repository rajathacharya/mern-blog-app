import jwt from "jsonwebtoken";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Generate Refresh Token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// Register user
export const registerUser = async (req, res) => {
  
  try {
    
    const { username, email, password } = req.body;
    
    //console.log(req.body);
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    const user = await User.create({ username, email, password });
    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // set to true if using HTTPS in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: accessToken,
      });
  } catch (error) {
    console.error("❌ Signup failed:", error);
    res.status(500).json({ message: error.message });
  }
  
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const accessToken = generateToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: accessToken,
        });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//Refresh token

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateToken(decoded.id);
    res.json({ token: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

// @desc Logout user and clear refresh token cookie
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};