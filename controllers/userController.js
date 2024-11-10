import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwtTokenFunction from "../jwt/JwtToken.js";
import jwt from "jsonwebtoken";
//for Register user
export const SignUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not matches" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "User already registered!" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    return res
    .status(201)
    .json({ message: "User registered successfully!", newUser });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};
//for Register Login
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid user credential!" });
    }
    if (user) {
      jwtTokenFunction(user._id, user.name, user.email, res); 
    }
    return res.status(200).json({
      message: "User logged in successfully!",
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};
//for Register Logout
export const LogOut = async (req, res) => {
  try 
  {
    res.cookie('jwt', '', 
    { 
      httpOnly: true,
      expires: new Date(0),           
      secure: true,                
      sameSite: 'strict',
      path: '/',    
    }
    );
    return res.status(201).json({ message: "User Loged Out successfully!" });
  } catch (error) 
  {
    console.log("error", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

//for Getuser data
export const GetUserData = (req, res) => 
  {
    const token = req.cookies.jwt; 
    if (!token) 
    {
      return res.status(401).json({ error: "No token provided" });
    }  
    jwt.verify(token, process.env.JwtTokenKEY, (err, decoded) => {
      try
      {
        if (err) 
        {
          console.log("Token verification error:", err); 
          return res.status(403).json({ error: "Invalid token" });
        }
        console.log("i am comming");
        const userId = decoded.userId;
        const name = decoded.name;
        const email = decoded.email;
        return res.json({ userId, name, email });
      }catch(err)
      {
        console.log("i am comming");
        return res.status(403).json({ error: "Token varification error:" });
      }
    });
  };
  
