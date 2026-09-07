import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CompleteYourProfile() {
  
  const location = useLocation();
  const { name, email, password } = location.state || {};

  // console.log("PROPS:", { name, email, password });
  
  const [linkedInUserName, setLinkedInUserName] = useState("");
  const [instagramUserName, setInstagramUserName] = useState("");
  const [twitterUserName, setTwitterUserName] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [uploadedRsume, setUploadedResume] = useState<File | null>(null);
  const navigate = useNavigate();

  const addInterest = () => {
    const value = interestInput.trim();
    if (!value || interests.includes(value)) {
      return;
    }
    setInterests([...interests, value]);
    setInterestInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("oldPassword", password);

    formData.append("LinkedInUsername", linkedInUserName);
    formData.append("instagramUsername", instagramUserName);
    formData.append("twitterUsername", twitterUserName);

    // Array ko string mein bhejo
    formData.append("interest", JSON.stringify(interests));

    formData.append("description", description);

    // File
    if (uploadedRsume) {
      formData.append("resume", uploadedRsume);
    }

    // console.log([...formData.entries()]);

    // console.log("name:", formData.get("name"));
    // console.log("email:", formData.get("email"));
    // console.log("password:", formData.get("oldPassword"));
    try {
      const response = await fetch("http://localhost:2000/register", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      console.log("registered successfully", data);
      alert("Congratulations, Registered successfully");
      navigate("/login");
    } catch (error) {
      alert("Error occurred at register");
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Complete Your Profile</h1>
      <p>Please complete your profile to access all features.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="LinkedIn Username"
          value={linkedInUserName}
          onChange={(e) => setLinkedInUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Instagram Username"
          value={instagramUserName}
          onChange={(e) => setInstagramUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Twitter Username"
          value={twitterUserName}
          onChange={(e) => setTwitterUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Please enter your short & sweet description about yourself for better recommendations"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Please Enter your interests"
          value={interestInput}
          onChange={(e) => {
            setInterestInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addInterest();
            }
          }}
        />

        <div>
          {interests.map((interest) => (
            <span key={interest}>
              {interest}

              <button
                type="button"
                onClick={() => {
                  setInterests(interests.filter((item) => item !== interest));
                }}
              >
                {" "}
                x{" "}
              </button>
            </span>
          ))}
        </div>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setUploadedResume(file);
          }}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default CompleteYourProfile;
