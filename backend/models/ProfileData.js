import mongoose from "mongoose";
import User from "./User";

const profileData = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    linkedInData: {
      type: String,
    },
    instagramData: {
      type: String,
    },
    twitterData: {
      type: String,
    },
    profileAnalysis: {
      recommendedCategories: [String],
      learningGoals: [String],
      technicalLevel: String,
      personalityTraits: [String],
      careerStage: String
    },
    recommendedBooks: {
      type: [
        {
          name: String,
          thumbnailURL: String,
          description: String,
          source: String,
          purchaseURL: String,
          isLiked: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
    lastProcessedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const ProfileData = new mongoose.model("ProfileData", profileData);

export default ProfileData;
