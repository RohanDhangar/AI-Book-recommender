import express from "express";
import DbConnect from "./utils/DbConnect.js";

const app = express();
const port = 2000;

DbConnect();

app.get("/", (req, res)=>{
    res.send("welcome to book recommender")
})

app.listen(port, ()=>{
    console.log(`server started at ${port}`);
});