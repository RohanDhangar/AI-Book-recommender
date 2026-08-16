import GenrateText from "../utils/ModelResponse.js";
import ProfileData from "../models/ProfileData.js";
import User from "../models/User.js";

const ParametersForSearchingBooks = async (req) => {
  try {
    const { email } = req.body;

    const findedUser = await User.findOne({ email });

    if (!findedUser) {
      //   return res.status(401).json({
      //     message: "unable to find the user",
      //   });
      throw new Error("unable to find the user");
    }

    if (!findedUser.profileProcessed) {
      //   return res.status(401).json({
      //     message:
      //       "Profile is not processed by our systems, Kindly visit our personalized profile section",
      //   });

      throw new Error(
        "Profile is not processed by our systems, Kindly visit our personalized profile section",
      );
    }

    const userID = findedUser._id;

    const processedUser = await ProfileData.findOne({ userID });

    if (!processedUser) {
      //   return res.status(401).json({
      //     message: "unable to find the user in processed section",
      //   });
      throw new Error("unable to find the user in processed section");
    }

    const { linkedInData, instagramData, twitterData, profileAnalysis } =
      processedUser;

    const prompt = `Analyze the user's profile data below and generate exactly 5 book-search strategies.For each strategy, provide:
1. A Google Books search query optimized to find books relevant to this specific user.
2. A category representing the main learning area.
Use the user's recommended categories, learning goals, technical level, personality traits, and career stage to make the queries personalized.
The search queries should be concise and suitable for the Google Books API. Do not include unnecessary words, explanations, or book titles.
Return ONLY valid JSON.
No markdown.
No explanation.

Required format:
{
  "bookSearches": [
    {
      "query": "",
      "category": ""
    },
    {
      "query": "",
      "category": ""
    },
    {
      "query": "",
      "category": ""
    },
    {
      "query": "",
      "category": ""
    },
    {
      "query": "",
      "category": ""
    }
  ]
}
User Profile:
linkedIn Data:${linkedInData}
instagram Data:${instagramData}
twitter Data: ${twitterData}
Recommended Categories:${profileAnalysis.recommendedCategories}
Learning Goals: ${profileAnalysis.learningGoals}
Technical Level: ${profileAnalysis.technicalLevel}
Personality Traits:${profileAnalysis.personalityTraits}
Career Stage: ${profileAnalysis.careerStage}`;

    console.log("prompt for book search generation");

    const LLMResponse = await GenrateText(prompt);

    console.log("LLMResponse for book search generation");
    return { LLMResponse, processedUser, findedUser };
  } catch (error) {
    throw new Error(error);
  }
};

export default ParametersForSearchingBooks;
