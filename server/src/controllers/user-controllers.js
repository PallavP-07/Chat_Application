import { compare } from "bcrypt";
import { User } from "../models/userModel.js";
import { cookieOption, sendToken } from "../services/jwtAuth.js";

const addUser = async (req, res) => {
  const { name, userName, phone_no, password, about } = req.body;
  const avatar = {
    public_id: "hsuc",
    url: "sjd",
  };
  const user = await User.create({
    name,
    userName,
    phone_no,
    password,
    about,
    avatar,
  });
  sendToken(res, user, 201, "user created!");
  // res.status(201).json({message:"user register"});
};

const Loging = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName }).select("+password");

    if (!user) return res.status(400).json({ message: "Invalide credential" });
    const isMatch = await compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "input valide password" });

    sendToken(res, user, 200, `wellcome back ${user.name}`);
  } catch (error) {
    console.log(error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const Logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("chat-token", "", { ...cookieOption, maxAge: 0 })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    console.log(error);
  }
};
const searchUser = async (req, res) => {
 
  try {
     const {name}=req.query;

    return res.status(200).json({
      success: true,
      message: name,
    });
  } catch (error) {
    console.log(error);
  }
};
export { Loging, addUser, getUserProfile, Logout, searchUser };
