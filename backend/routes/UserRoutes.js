import express from "express";
import { RegisterUser } from "../controllers/UserControllers";

const app = express();

app.post("/register", RegisterUser);