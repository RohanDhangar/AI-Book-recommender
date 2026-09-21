import { useContext, useEffect } from "react";
import { UserDetails } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/api";

function LogoutButton() {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(UserDetails);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await fetch(apiUrl("/logout"), {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Logout failed");
          return;
        }

        setIsAuthenticated(false);
        setUser(null);
        console.log("Logout successfully");
      } catch (error) {
        console.error("Error while logging out:", error);
      }
    };

    logout();
  }, []);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center justify-center px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-xl">
          👋
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-stone-900">You are logged out</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          Your session has been cleared. Come back whenever you are ready to continue.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Go to Login
        </button>
      </div>
    </section>
  );
}

export default LogoutButton;
