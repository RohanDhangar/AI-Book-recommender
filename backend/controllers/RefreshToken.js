import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User";

const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({
      message: "Please login !!",
      relogin: true
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);

    const userInfo = await User.findOne({ _id: decoded.id });

    if (!userInfo) {
      return res.status(401).json({
        message: "Invalid refresh token, Please login again",
        relogin: true
      });
    }

    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: userInfo.email,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    res
      .status(201)
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .json({
        message: "New access token is genrated",
      });
  } catch (error) {
    return res.status(401).json({
      message: "refresh token expired, Please login again",
      relogin: true
    });
  }
};

export default refreshAccessToken;
