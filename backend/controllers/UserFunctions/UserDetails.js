import User from "../../models/User.js";

const GetUserDetails = async (req, res) => {
  // Implementation for fetching user details
  try {

    // console.log("Request body received:", req);
    const { email } = req;
    // console.log("email from request body:", email);
    if (!email) {
      throw Error("Unable to get the email from request, Please login to app");
    }

    const userDetails = await User.findOne({ email });

    console.log("userDetails fetched from database:", userDetails);

    if (!userDetails) {
      return res.status(500).json({
        message: "unable to get the user details of user, please try again",
      });
    }

    return res.status(200).json({
      message: "Details fetched",
      Data: userDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occoured",
      Error: error,
    });
  }
};

export { GetUserDetails };
