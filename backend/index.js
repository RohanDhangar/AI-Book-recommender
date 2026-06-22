import express from "express";
import DbConnect from "./utils/DbConnect.js";
import { LoginUser, LogoutUser, RegisterUser } from "./controllers/UserControllers.js";

const app = express();
const port = 2000;

DbConnect();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.send("welcome to book recommender")
})

app.post("/register", RegisterUser);
app.post("/login", LoginUser);
app.post("/logout", LogoutUser);

app.listen(port, ()=>{
    console.log(`server started at ${port}`);
});