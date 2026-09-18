import ProfileData from "../../models/ProfileData.js";

const GetBooksDetails = async (req, res) => {
  try {
    const { id } = req; 

    if (!id) {
      throw Error("Unable to get the ID from request, Please login to app");
    }

    const userID = id;

    const profileDetails = await ProfileData.findOne({ userID });

    if (!profileDetails) {
      res.status(401).json({
        message:
          "It seems like your profile is not processed by our servers, Please visit the profile page",
      });
    }

    const books = profileDetails.recommendedBooks;
    return res.status(200).json({
      message: "Please check profile details",
      books
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error occoured in catch block",
      Error: error,
    });
  }
};

export { GetBooksDetails };
