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
      setData(userData.Data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const [name, setName] = useState(data?.name || "");
  const [email, setEmail] = useState(data?.email || "");
  const [instagramDetails, setInstagramDetails] = useState(data?.instagramDetails || "");
  const [linkedinDetails, setLinkedinDetails] = useState(data?.linkedinDetails || "");
  const [twitterDetails, setTwitterDetails] = useState(data?.twitterDetails || "");
  const [bio, setBio] = useState(data?.bio || "");
  const [interests, setInterests] = useState(data?.interests || []);

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
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Instagram:</strong> {instagramDetails}</p>
            <p><strong>LinkedIn:</strong> {linkedinDetails}</p>
            <p><strong>Twitter:</strong> {twitterDetails}</p>
            <p><strong>Bio:</strong> {bio}</p>
            <p><strong>Interests:</strong> {interests.join(", ")}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
