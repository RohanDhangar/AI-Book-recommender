import mongoose from "mongoose";

const userSchma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    interest: {
        type: String,
        required: true
    },
    LinkedInURL: {
        type: String,
        required: true
    },
    instagramURL: {
        type: String,
        required: true
    },
    twitterURL: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});