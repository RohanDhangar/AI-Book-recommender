import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/api";

interface Books {
  title: string;
  description: string;
  thumbnailURL: string;
  source: string;
  purchaseURL: string;
  isLiked: boolean;
  _id: string;
}

type LoadingStep = "profile" | "generating" | "books";

function SuggestedBooks() {
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState<LoadingStep>("profile");
  const [isProfileProcessed, setIsProfileProcessed] = useState(false);
  const [books, setBooks] = useState<Books[]>([]);
  const navigate = useNavigate();
  const hasStarted = useRef(false);

  const handleProfileStatus = async () => {
    console.log("[SuggestedBooks] Checking profile status...");

    const response = await fetch(apiUrl("/userDetails"), {
      method: "GET",
      credentials: "include",
    });

    console.log("[SuggestedBooks] /userDetails response:", response.status);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile status. Status: ${response.status}`,
      );
    }

    const data = await response.json();

    console.log("[SuggestedBooks] Profile status:", {
      profileProcessed: data.Data.profileProcessed,
      recommendationGenerated: data.Data.recommendationGenerated,
    });

    return {
      profileProcessed: data.Data.profileProcessed,
      recommendationGenerated: data.Data.recommendationGenerated,
    };
  };

  const handleGetBooks = async () => {
    console.log("[SuggestedBooks] Fetching books...");

    const response = await fetch(apiUrl("/getBooks"), {
      method: "GET",
      credentials: "include",
    });

    console.log("[SuggestedBooks] /getBooks response:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch books. Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("[SuggestedBooks] Books received:", data.books?.length ?? 0);
    setBooks(data.books || []);
  };

  useEffect(() => {
    // React StrictMode runs effects twice in development. This prevents the
    // recommendation generation endpoint from being called twice.
    if (hasStarted.current) return;
    hasStarted.current = true;

    const handleSuggestedBooks = async () => {
      try {
        setLoadingStep("profile");
        const status = await handleProfileStatus();

        if (!status?.profileProcessed) {
          console.log("[SuggestedBooks] Profile is NOT processed.");
          setIsProfileProcessed(false);
          setLoading(false);

          alert(
            "Profile status not processed. Please visit your profile section and process your profile.",
          );

          navigate("/profile");
          return;
        }

        console.log("[SuggestedBooks] Profile is processed.");
        setIsProfileProcessed(true);

        if (status.recommendationGenerated) {
          console.log("[SuggestedBooks] Recommendation already exists.");
          setLoadingStep("books");
          await handleGetBooks();
          console.log("[SuggestedBooks] Existing books loaded successfully.");
          setLoading(false);
          return;
        }

        // console.log("[SuggestedBooks] Recommendation does NOT exist.");
        // console.log("[SuggestedBooks] Starting recommendation generation...");
        setLoadingStep("generating");

        const generateResponse = await fetch(apiUrl("/recommended-Books"), {
          method: "GET",
          credentials: "include",
        });

        // console.log(
        //   "[SuggestedBooks] /recommended-Books response:",
        //   generateResponse.status,
        // );

        if (!generateResponse.ok) {
          let errorData;

          try {
            errorData = await generateResponse.json();
          } catch {
            errorData = null;
          }

          console.error(
            "[SuggestedBooks] Recommendation generation failed:",
            errorData,
          );

          setLoading(false);
          alert(
            "Hi, thanks for visiting us. Actually we are facing an issue at our end. Please visit our general book section.",
          );
          return;
        }

        const generateData = await generateResponse.json();

        console.log(
          "[SuggestedBooks] Recommendation generation response:",
          generateData,
        );
        // console.log("[SuggestedBooks] Recommendation generated successfully.");

        setLoadingStep("books");
        console.log("[SuggestedBooks] Fetching generated books...");
        await handleGetBooks();
        console.log("[SuggestedBooks] Generated books loaded successfully.");

        setLoading(false);

      } catch (error) {
        console.error("[SuggestedBooks] Unexpected error:", error);
        setLoading(false);
      }
    };

    handleSuggestedBooks();
  }, []);

  const loadingContent = {
    profile: {
      title: "Reading your profile",
      text: "Checking your profile and learning preferences...",
    },
    generating: {
      title: "Building your recommendations",
      text: "Our recommendation engine is finding books for you...",
    },
    books: {
      title: "Preparing your bookshelf",
      text: "Almost there. Bringing your recommendations together...",
    },
  }[loadingStep];

  return (
    <section className="min-h-[calc(100vh-73px)] bg-[#faf8f3]">
      {loading ? (
        <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-3xl items-center justify-center px-5 py-16">
          <div className="w-full rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-amber-200 border-t-amber-700" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              Personalized reading
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-stone-900">
              {loadingContent.title}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
              {loadingContent.text}
            </p>

            <div className="mx-auto mt-8 flex max-w-sm items-center justify-between gap-2">
              {["profile", "generating", "books"].map((step, index) => {
                const active =
                  ["profile", "generating", "books"].indexOf(loadingStep) >= index;

                return (
                  <div key={step} className="flex flex-1 items-center gap-2">
                    <div
                      className={`h-2 w-full rounded-full ${
                        active ? "bg-stone-900" : "bg-stone-200"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-stone-400">
              This can take a little longer when recommendations are being generated for the first time.
            </p>
          </div>
        </div>
      ) : isProfileProcessed ? (
        <div className="mx-auto max-w-6xl px-5 py-10 lg:px-6 lg:py-14">
          <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Personalized for you
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Your suggested books
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                A selection generated from your profile, learning goals, and interests.
              </p>
            </div>
            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              Personalized recommendations
            </span>
          </div>

          {books.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <article
                  key={book._id}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex h-72 items-center justify-center overflow-hidden bg-stone-100">
                    {book.thumbnailURL ? (
                      <img
                        src={book.thumbnailURL}
                        alt={book.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-sm text-stone-400">No cover available</div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-stone-900">
                      {book.title}
                    </h2>
                    <p className="mt-3 line-clamp-5 flex-1 text-sm leading-6 text-stone-500">
                      {book.description || "No description available."}
                    </p>
                    <a
                      href={book.purchaseURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center justify-center rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
                    >
                      View book
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-stone-200 bg-white p-12 text-center shadow-sm">
              <h2 className="text-lg font-semibold text-stone-900">No suggested books available.</h2>
              <p className="mt-2 text-sm text-stone-500">
                We could not find recommendations for this profile right now.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-5 py-16">
          <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-stone-900">Profile not processed</h1>
            <p className="mt-3 text-sm leading-6 text-stone-500">
              Please process your profile before viewing personalized recommendations.
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="mt-6 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
            >
              Go to profile
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default SuggestedBooks;
