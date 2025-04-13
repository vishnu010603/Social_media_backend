import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.utils.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    let profilePicUrl = "";

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      profilePicUrl = upload.secure_url;
    }

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      profilePic: profilePicUrl,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name,
        email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateProfilePic = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
  
      if (req.file) {
        const upload = await cloudinary.uploader.upload(req.file.path);
        user.profilePic = upload.secure_url;
        await user.save();
      }
  
      res.json({ profilePic: user.profilePic });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  