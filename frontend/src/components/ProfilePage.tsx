import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  name: string;
  email: string;
  instagramDetails: string;
  linkedinDetails: string;
  twitterDetails: string;
  description: string;
  interest: string[];
  resumeText: string;
  recommendationGenerated: boolean;
  profileProcessed: boolean;
}

function ProfilePage() {
  const [data, setData] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:2000/userDetails", {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        alert("No user data found, Please try again later");
        return;
      }
      const userData = await response.json();
      console.log(userData.Data.profileProcessed);
      setData(userData.Data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleProcessProfile = async () => {
    try {

      console.log("called backend, waiting...");
      const response = await fetch("http://localhost:2000/profile-processed",{
        method: "GET",
        credentials: "include",
      })

      console.log("response from backend", response);
      
      const data = await response.json();

      if(data){
        navigate("/suggested-books");
      }

    } catch (error) {
      console.error("Error occoured while processing your profile:", error);
    }
  }
  
  return (
    <>
      // this page is created to display the profile of the user and allow them
      to edit their information
      <div className="profile-page">
        <h1>User Profile</h1>
        {data ? (
          <div>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Instagram:</strong> {data.instagramDetails}</p>
            <p><strong>LinkedIn:</strong> {data.linkedinDetails}</p>
            <p><strong>Twitter:</strong> {data.twitterDetails}</p>
            <p><strong>Description:</strong> {data.description}</p>
            <p><strong>Interests:</strong> {data.interest.join(", ")}</p>

            <>
            {data.profileProcessed ? (
              <>
              <p>Your Profile is processed, you can now get your personalized recommendations</p>
              <button onClick={() => navigate("/suggested-books")}>Get Personalized Recommendations</button>
              </>
            ): (
              <>Your Profile is not processed yet, please click on below button to get your profile processed for the personalized recommendations
              <button onClick={handleProcessProfile}>Process my Profile</button>
              </>
            )}
            </>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
