import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyIdentity = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Login required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {

    if(error.name == "TokenExpiredError"){
      return res.status(401).json({
        message: 'Token expired',
        RefreshNeeded: true
      })
    }

    return res.status(401).json({
      message: "Inavlid Token",
    });
  }
};

export default verifyIdentity;
