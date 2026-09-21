import { useContext } from "react";
import { UserDetails } from "../Context/AuthContext";
import ListBooks from "./ListBooks";
import { Link } from "react-router-dom";


function Home() {
  const { isAuthenticated } = useContext(UserDetails);

  if (!isAuthenticated) {
    return (
      <>
        <section className="mx-auto max-w-6xl px-5 py-16 lg:px-6 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800">
              Your next book, thoughtfully chosen
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Find books that match the way you want to grow.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
              Build your profile and get personalized reading recommendations
              based on your interests, goals, and professional journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="rounded-lg bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800"
              >
                Create your profile
              </Link>
              <Link
                to="/login"
                className="rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
              >
                I already have an account
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-amber-100/70 blur-2xl" />
            <div className="relative rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(41,37,36,0.35)]">
              <div className="rounded-xl bg-stone-900 p-7 text-white">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
                  Personalized reading
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-tight">
                  A bookshelf shaped around you.
                </h2>
                <p className="mt-4 text-sm leading-6 text-stone-300">
                  Your profile is analyzed to find useful categories and books
                  that fit your learning goals.
                </p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-stone-500">
                <div className="rounded-lg bg-stone-50 p-3">Profile</div>
                <div className="rounded-lg bg-stone-50 p-3">AI Analysis</div>
                <div className="rounded-lg bg-stone-50 p-3">Books</div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </>
    );
  }

  return (
    <div>
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
            Your bookshelf
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Explore books to keep learning.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
            Browse a selection of books while your personalized recommendations
            are always available from the Recommendations section.
          </p>
        </div>
      </section>
      <ListBooks />
      
    </div>
  );
}

export default Home;
