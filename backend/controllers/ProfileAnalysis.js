import User from "../models/User.js";
import GenrateText from "../utils/ModelResponse.js";
import ProfileData from "../models/ProfileData.js";

const LLM_ProfileAnalysis = async (req, res) => {
  try {
    const { email } = req.body;

    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(401).json({
        message: "unable to find the user",
      });
    }

    const {
      _id,
      name,
      interest,
      profileprocessed,
      description,
      resumeText,
      recommendationGenerated,
    } = userDetails;

    const prompt = `Analyze this user professionally with this parametersName: ${name} , Interest: ${interest} , Description: ${description} , Resume: ${resumeText}
    Return ONLY JSON:
    {
        "personality_traits": [],
        "career_stage": "",
        "technical_level": "",
        "learning_goals": [],
        "recommended_categories": []
    }
    No explanation.
    No markdown.
    Only JSON.    
    `;

    const LLM_response = await GenrateText(prompt);

    const {
      recommended_categories,
      personality_traits,
      career_stage,
      technical_level,
      learning_goals,
    } = LLM_response;

    const existingProfile = await ProfileData.findOne({ userID: _id });

    let DB_Response;

    if (existingProfile) {
      existingProfile.profileAnalysis = {
        recommendedCategories: recommended_categories,
        learningGoals: learning_goals,
        technicalLevel: technical_level,
        personalityTraits: personality_traits,
        careerStage: career_stage,
      };

      existingProfile.lastProcessedAt = Date.now();

      DB_Response = await existingProfile.save();
    } else {
      DB_Response = await ProfileData.create({
        userID: _id,
        linkedInData: "Not available",
        instagramData: "Not available",
        twitterData: "Not available",
        profileAnalysis: {
          recommendedCategories: recommended_categories,
          learningGoals: learning_goals,
          technicalLevel: technical_level,
          personalityTraits: personality_traits,
          careerStage: career_stage,
        },
        recommendedBooks: [],
        lastProcessedAt: Date.now(),
      });
    }
    // const DB_Response = await ProfileData.create({
    //   userID: _id,
    //   linkedInData: "Not available",
    //   instagramData: "Not available",
    //   twitterData: "Not available",
    //   profileAnalysis: {
    //     recommendedCategories: recommended_categories,
    //     learningGoals: learning_goals,
    //     technicalLevel: technical_level,
    //     personalityTraits: personality_traits,
    //     careerStage: career_stage,
    //   },
    //   recommendedBooks: [],
    //   lastProcessedAt: Date.now(),
    // });

    if (!DB_Response) {
      return res.status(501).json({
        message: "unable to create user, internal server error",
      });
    }

    userDetails.profileProcessed = true;
    await userDetails.save();

    return res.status(200).json({
      message: "Analysis successfully performed",
      Data: DB_Response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occoured",
      Error: error,
    });
  }
};

export default LLM_ProfileAnalysis;
