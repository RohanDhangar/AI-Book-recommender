import mongoose from "mongoose";

const userSchma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  interest: {
    type: [String],
  },
  LinkedInUsername: {
    type: String,
    required: true,
  },
  instagramUsername: {
    type: String,
    required: true,
  },
  twitterUsername: {
    type: String,
    required: true,
  },
  profileProcessed: {
    type: Boolean,
    default: false,
  }, 
  refreshToken: {
    type: String
  },
  description: {
    type: String,
  }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchma);

export default User;