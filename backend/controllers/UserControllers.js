import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const RegisterUser = async (req, res) => {
  // console.log(req.body);
  //   console.log(req.headers);
  //   console.log(req.params);
  //   console.log(req.query);
  //   console.log(req.cookies);

  try {
    let {
      name,
      email,
      oldPassword,
      interest,
      LinkedInUsername,
      instagramUsername,
      twitterUsername,
      description
    } = req.body;

    if (!name || !email || !oldPassword) {
      throw new Error("Please provide the completed details");
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new Error("User already exsists");
    }

    if (LinkedInUsername == "") {
      LinkedInUsername = "Not Available";
    }
    if (instagramUsername == "") {
      instagramUsername = "Not Available";
    }
    if (twitterUsername == "") {
      twitterUsername = "Not Available";
    }

    const password = await bcrypt.hash(oldPassword, 12);

    const newUser = await User.create({
      name,
      email,
      password,
      interest,
      LinkedInUsername,
      instagramUsername,
      twitterUsername,
      description
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully!",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error, failed to create user.",
      error: error.message,
    });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide the completed details for login");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Please register to the app");
    }
    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const access_token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_ACCESS_SECRET_KEY,
        {
          expiresIn: "15m",
        },
      );

      const refresh_token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_REFRESH_SECRET_KEY,
        {
          expiresIn: "7d",
        },
      );

      user.refreshToken = refresh_token;
      await user.save();

      res
        .status(201)
        .cookie("accessToken", access_token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refresh_token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: "login successfully completed",
        });
    } else {
      throw new Error(
        "Password didn't match, Please enter the correct password",
      );
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error, failed to login",
      error: error.message,
    });
  }
};

const LogoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Please login !!");
    }

    const user = await User.findOne({ email });
    user.refreshToken = "";
    await user.save();

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .json({
        message: "successfully logout",
      });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Server error, failed to logout",
      error: error.message,
    });
  }
};

export { RegisterUser, LoginUser, LogoutUser };
