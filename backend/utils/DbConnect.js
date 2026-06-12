import mongoose from "mongoose";
import 'dotenv/config';

const DbConnect = async() => {
    console.log(process.env.MONGODB_URL);
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("mongoDB connection successfully establish");
    })
    .catch((err) => console.log("DB connection error", err));
}

export default DbConnect;