const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await User.create({ name, email, password, phoneNumber });
    const token = generateToken(user);
    res.status(201).json({ message: "Signup successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch profile" });
  }
};
