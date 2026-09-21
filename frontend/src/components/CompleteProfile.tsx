import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/api";

function CompleteYourProfile() {
  const location = useLocation();
  const { name, email, password } = location.state || {};

  const [linkedInUserName, setLinkedInUserName] = useState("");
  const [instagramUserName, setInstagramUserName] = useState("");
  const [twitterUserName, setTwitterUserName] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [uploadedRsume, setUploadedResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const addInterest = () => {
    const value = interestInput.trim();
    if (!value || interests.includes(value)) return;
    setInterests([...interests, value]);
    setInterestInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("oldPassword", password);
    formData.append("LinkedInUsername", linkedInUserName);
    formData.append("instagramUsername", instagramUserName);
    formData.append("twitterUsername", twitterUserName);
    formData.append("interest", JSON.stringify(interests));
    formData.append("description", description);

    if (uploadedRsume) {
      formData.append("resume", uploadedRsume);
    }

    try {
      const response = await fetch(apiUrl("/register"), {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || data.error || "Registration failed");
        return;
      }

      console.log("registered successfully", data);
      alert("Congratulations, registered successfully");
      navigate("/login");
    } catch (error) {
      alert("Error occurred at register");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-5 py-10 lg:px-6 lg:py-14">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
          Step 2 of 2
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Complete your profile
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
          Add a little more context so the recommendation engine can understand
          what you are learning and where you want to go.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-stone-700">LinkedIn username</span>
            <input
              type="text"
              placeholder="Optional"
              value={linkedInUserName}
              onChange={(e) => setLinkedInUserName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-stone-300 px-3.5 py-3 text-sm outline-none focus:border-stone-500 focus:ring-2 focus:ring-amber-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-stone-700">Instagram username</span>
            <input
              type="text"
              placeholder="Optional"
              value={instagramUserName}
              onChange={(e) => setInstagramUserName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-stone-300 px-3.5 py-3 text-sm outline-none focus:border-stone-500 focus:ring-2 focus:ring-amber-100"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-stone-700">X / Twitter username</span>
            <input
              type="text"
              placeholder="Optional"
              value={twitterUserName}
              onChange={(e) => setTwitterUserName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-stone-300 px-3.5 py-3 text-sm outline-none focus:border-stone-500 focus:ring-2 focus:ring-amber-100"
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-stone-700">Tell us about yourself</span>
            <textarea
              placeholder="A short description about your work, interests, or what you want to learn..."
              value={description}
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full resize-y rounded-lg border border-stone-300 px-3.5 py-3 text-sm leading-6 outline-none focus:border-stone-500 focus:ring-2 focus:ring-amber-100"
            />
          </label>

          <div className="sm:col-span-2">
            <label className="block">
              <span className="text-sm font-medium text-stone-700">Interests</span>
              <input
                type="text"
                placeholder="Type an interest and press Enter"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addInterest();
                  }
                }}
                className="mt-2 w-full rounded-lg border border-stone-300 px-3.5 py-3 text-sm outline-none focus:border-stone-500 focus:ring-2 focus:ring-amber-100"
              />
            </label>

            {interests.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() =>
                        setInterests(interests.filter((item) => item !== interest))
                      }
                      className="text-amber-700 hover:text-stone-900"
                      aria-label={`Remove ${interest}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-stone-700">Resume</span>
            <div className="mt-2 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-5">
              <input
                type="file"
                accept=".pdf"
                required
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setUploadedResume(file);
                }}
                className="block w-full text-sm text-stone-600 file:mr-4 file:rounded-lg file:border-0 file:bg-stone-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-stone-800"
              />
              <p className="mt-2 text-xs text-stone-500">PDF only.</p>
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 w-full rounded-lg bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating your profile..." : "Create account"}
        </button>
      </form>
    </section>
  );
}

export default CompleteYourProfile;
