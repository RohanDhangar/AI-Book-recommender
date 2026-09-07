import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyIdentity = async (req, res, next) => {
  // console.log("logging cookie value", req.cookies.accessToken);
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Access token missing",
      refreshNeeded: true,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    req.email = decoded.email;
    // console.log("decoded email from token:", req.email);
    req.id = decoded.id;
    // console.log("decoded id from token:", req.id);
    next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
        RefreshNeeded: true,
      });
    }

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

export default verifyIdentity;
