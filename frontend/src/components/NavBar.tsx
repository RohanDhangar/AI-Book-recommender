import { useContext } from "react";
import { UserDetails } from "../Context/AuthContext";
import { Link } from "react-router-dom";

function NavBar() {
  const { isAuthenticated } = useContext(UserDetails);

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#faf8f3]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 text-lg text-amber-100 shadow-sm">
            📖
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-stone-900">
              Decode Books
            </p>
            <p className="hidden text-[11px] text-stone-500 sm:block">
              AI-powered personalized reading
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/suggested-books"
                className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
              >
                Recommendations
              </Link>
              <Link
                to="/profile"
                className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
              >
                Profile
              </Link>
              <Link
                to="/logout"
                className="ml-1 rounded-lg border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-900 hover:text-white"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-stone-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
