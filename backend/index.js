import express from "express";
import DbConnect from "./utils/DbConnect.js";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "./controllers/UserControllers.js";
import RefreshAccessToken from "./controllers/RefreshToken.js";
import verifyIdentity from "./middlewares/AuthMiddleware.js";
import upload from "./middlewares/Upload.js";
import RecommendedBooks from "./controllers/BookRecommendation.js";
import LLM_ProfileAnalysis from "./controllers/ProfileAnalysis.js";
import cors from "cors";
import { GetUserDetails } from "./controllers/UserFunctions/UserDetails.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 2000;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

DbConnect();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", verifyIdentity, (req, res) => {
  res.send("welcome to book recommender");
});

app.post("/register", upload.single("resume"), RegisterUser);
app.post("/refresh-token", RefreshAccessToken);
app.post("/login", LoginUser);


// protected routes
app.get("/userDetails", verifyIdentity, GetUserDetails);
app.get("/profile-processed", verifyIdentity, LLM_ProfileAnalysis); // to be added authmiddleware for protected route
app.get("/recommended-Books", verifyIdentity, RecommendedBooks); // to be added authmiddleware for protected route
app.post("/logout", verifyIdentity, LogoutUser);


app.listen(port, () => {
  console.log(`server started at ${port}`);
});
