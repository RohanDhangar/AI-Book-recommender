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
import LLM_ProfileAnalysis from "./controllers/ProfileAnalysis.js";

const app = express();
const port = 2000;

DbConnect();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", verifyIdentity, (req, res) => {
  res.send("welcome to book recommender");
});

app.post("/register", upload.single("resume"), RegisterUser);
app.post("/refresh-token", RefreshAccessToken);
app.post("/login", LoginUser);
app.post("/logout", LogoutUser);

app.get("/profile-processed", LLM_ProfileAnalysis) // to be added authmiddleware for protected route

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
