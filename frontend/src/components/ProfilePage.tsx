import { useEffect, useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  instagramDetails: string;
  linkedinDetails: string;
  twitterDetails: string;
  bio: string;
  interests: string[];
  resumeText: string;
  recommendationGenerated: boolean;
  profileProcessed: boolean;
}

function ProfilePage() {
  const [data, setData] = useState<UserProfile | null>(null);
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
      // console.log("User data fetched:", userData);
      setData(userData.Data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
            <p><strong>Bio:</strong> {data.bio}</p>
            <p><strong>Interests:</strong> {data.interests}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
