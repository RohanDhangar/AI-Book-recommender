import GenrateText from "../utils/ModelResponse.js";
import ProfileData from "../models/ProfileData.js";
import User from "../models/User.js";
import ParametersForSearchingBooks from "./RecommendedParams.js";
import "dotenv/config";

const RecommendedBooks = async (req, res) => {
  try {
    const { LLMResponse, processedUser, findedUser } =
      await ParametersForSearchingBooks(req);

    console.log(LLMResponse);

    // const API = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
    // recommendedBooks: {
    //       type: [
    //         {
    //           name: String,
    //           thumbnailURL: String,
    //           description: String,
    //           source: String,
    //           purchaseURL: String,
    //           isLiked: {
    //             type: Boolean,
    //             default: false,
    //           },
    //         },
    //       ],
    //     },

    const searchArray = LLMResponse.bookSearches;
    console.log(searchArray);
    const size = searchArray.length;
    const Books = [];

    for (let i = 0; i < size; i++) {
      const searchQuery = searchArray[i];
      const query = searchQuery.query;
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=2&key=${process.env.GOOGLE_BOOKS_API_KEY}`,
      );

      const category = searchQuery.category;
      const response_category = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}&maxResults=1&orderBy=newest&key=${process.env.GOOGLE_BOOKS_API_KEY}`,
      );
      const responsesArray = [response, response_category];

      while (responsesArray.length > 0) {
        const res = responsesArray.pop();
        const data = await res.json();

        console.log(data);

        if (data.items && data.items.length > 0) {
          data.items.forEach((item) => {
            const book = {
              name: item.volumeInfo.title,
              thumbnailURL: item.volumeInfo.imageLinks?.thumbnail || "",
              description: item.volumeInfo.description || "",
              source: "Google Books",
              purchaseURL: item.volumeInfo.infoLink || "",
            };
            // console.log(book);
            Books.push(book);
          });
        }
      }
    }

    // assuming the user exists in ProfileData collection, you can update the recommendedBooks field for that user
    await ProfileData.findOneAndUpdate(
      { userID: processedUser.userID },
      { recommendedBooks: Books },
    );

    await User.findOneAndUpdate(
      { _id: findedUser._id },
      { recommendationGenerated: true },
    );

    // console.log(Books);
    return res.status(200).json({
      message: "Recommendation generated successfully",
      Data: Books,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Error occoured",
      Error: error,
    });
  }
};

export default RecommendedBooks;
