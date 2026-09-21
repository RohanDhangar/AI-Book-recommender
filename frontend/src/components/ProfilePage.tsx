import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/api";

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
  learningGoals: string[];
  recommendedCategories: string[];
}

function ProfilePage() {
  const [data, setData] = useState<UserProfile | null>(null);
  const [processingProfile, setProcessingProfile] = useState(false);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(apiUrl("/userDetails"), {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        alert("No user data found, please try again later");
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
    setProcessingProfile(true);

    try {
      console.log("called backend, waiting...");
      const response = await fetch(apiUrl("/profile-processed"), {
        method: "GET",
        credentials: "include",
      });

      console.log("response from backend", response);
      const responseData = await response.json();

      if (response.ok && responseData) {
        navigate("/suggested-books");
      } else {
        alert("Unable to process your profile right now. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while processing your profile:", error);
    } finally {
      setProcessingProfile(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-5 py-10 lg:px-6 lg:py-14">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
          Your profile
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          About you
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          This information helps shape your personalized reading recommendations.
        </p>
      </div>

      {data ? (
        <div className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Personal details
              </p>
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-stone-400">Name</p>
                  <p className="mt-1 font-medium text-stone-900">{data.name}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-400">Email</p>
                  <p className="mt-1 font-medium text-stone-900">{data.email}</p>
                </div>
                <div>
                  <p className="text-xs text-stone-400">Description</p>
                  <p className="mt-1 text-sm leading-6 text-stone-600">
                    {data.description || "No description added."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Interests
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {data.interest?.length ? (
                  data.interest.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-stone-500">No interests added.</p>
                )}
              </div>

              <div className="mt-7 border-t border-stone-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Social profiles
                </p>
                <div className="mt-3 space-y-2 text-sm text-stone-600">
                  <p>Instagram: {data.instagramDetails || "—"}</p>
                  <p>LinkedIn: {data.linkedinDetails || "—"}</p>
                  <p>Twitter: {data.twitterDetails || "—"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  AI profile analysis
                </p>
                <h2 className="mt-1 text-lg font-semibold text-stone-900">
                  Your learning direction
                </h2>
              </div>
              <span
                className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                  data.profileProcessed
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-800"
                }`}
              >
                {data.profileProcessed ? "Profile processed" : "Not processed yet"}
              </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Learning goals
                </p>
                <div className="mt-3 space-y-2">
                  {data.learningGoals?.length ? (
                    data.learningGoals.map((goal) => (
                      <p key={goal} className="rounded-lg bg-stone-50 p-3 text-sm text-stone-600">
                        {goal}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-stone-500">Not available yet.</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Recommended categories
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.recommendedCategories?.length ? (
                    data.recommendedCategories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700"
                      >
                        {category}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-stone-500">Not available yet.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-stone-100 pt-6">
              {data.profileProcessed ? (
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-medium text-stone-900">
                      Your personalized recommendations are ready.
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Open your bookshelf to see what the recommendation engine found.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/suggested-books")}
                    className="rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
                  >
                    View recommendations
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-medium text-stone-900">
                      Your profile has not been processed yet.
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Process it to generate your personalized recommendations.
                    </p>
                  </div>
                  <button
                    onClick={handleProcessProfile}
                    disabled={processingProfile}
                    className="flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {processingProfile ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-500 border-t-white" />
                        Processing...
                      </>
                    ) : (
                      "Process my profile"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-stone-200 bg-white p-10 text-center text-sm text-stone-500 shadow-sm">
          Loading profile...
        </div>
      )}
    </section>
  );
}

export default ProfilePage;
