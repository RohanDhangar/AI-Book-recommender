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
import { GetBooksDetails } from "./controllers/BooksFunction/BookDetails.js";

const app = express();
const port = process.env.PORT || 2000;

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
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
app.get("/getBooks", verifyIdentity, GetBooksDetails);
app.get("/profile-processed", verifyIdentity, LLM_ProfileAnalysis);
app.get("/recommended-Books", verifyIdentity, RecommendedBooks);
app.post("/logout", verifyIdentity, LogoutUser);

app.listen(port, "0.0.0.0", () => {
  console.log(`server started at ${port}`);
});