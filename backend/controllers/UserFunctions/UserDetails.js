import User from "../../models/User.js";
import ProfileData from "../../models/ProfileData.js";

const GetUserDetails = async (req, res) => {
  // Implementation for fetching user details
  try {
    // console.log("Request body received:", req);
    const { email, id } = req;
    // console.log("email from request body:", email);
    if (!email) {
      throw Error("Unable to get the email from request, Please login to app");
    }

    const userDetails = await User.findOne({ email });
    const profileDetails = await ProfileData.findOne({ userID: id });
    // console.log("userDetails fetched from database:", profileDetails);

    if (!userDetails) {
      return res.status(500).json({
        message: "unable to get the user details of user, please try again",
      });
    }

    // console.log(userDetails);
    const userData = userDetails.toObject();

    if (!profileDetails) {
      userData.learningGoals = [];
      userData.recommendedCategories = [];

      return res.status(200).json({
        message: "User details fetched, profile not processed yet",
        Data: userData,
      });
    }

    userData.learningGoals = profileDetails.profileAnalysis.learningGoals;

    userData.recommendedCategories =
      profileDetails.profileAnalysis.recommendedCategories;

    return res.status(200).json({
      message: "Details fetched",
      Data: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occoured",
      Error: error,
    });
  }
};

export { GetUserDetails };
