import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    const { fullname, email, password, mobile, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "Mobile number must be of 10 digits" });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullname,
      email,
      password: hasedPassword,
      mobile,
      role,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json(`Signup Error : ${error.message}`);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400), json({ message: "User does not exist" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(200)
      .json({ message: "Something went wrong while signIn" });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error occurred while signout" });
  }
};
