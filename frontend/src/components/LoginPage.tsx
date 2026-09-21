import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDetails } from "../Context/AuthContext";
import { apiUrl } from "../utils/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(UserDetails);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { email, password };
    setLoggingIn(true);

    try {
      const response = await fetch(apiUrl("/login"), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        alert(data.error || data.message || "Login failed");
        setEmail("");
        setPassword("");
        return;
      }

      console.log("login successfully", data);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log("login failed", error);
      alert("Login failed, please try again");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center justify-center px-5 py-12 lg:px-6">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_20px_60px_-35px_rgba(41,37,36,0.4)] md:grid-cols-2">
        <div className="hidden bg-stone-900 p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
              Welcome back
            </p>
            <h1 className="mt-5 text-3xl font-semibold leading-tight">
              Pick up where your reading journey left off.
            </h1>
          </div>
          <p className="text-sm leading-6 text-stone-300">
            Your personalized recommendations are waiting for you.
          </p>
        </div>

        <div className="p-7 sm:p-10">
          <h1 className="text-2xl font-semibold text-stone-900">Sign in</h1>
          <p className="mt-2 text-sm text-stone-500">
            Access your personalized bookshelf.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-stone-700">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-amber-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-stone-700">Password</span>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-stone-300 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-amber-100"
              />
            </label>

            <button
              type="submit"
              disabled={loggingIn}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loggingIn ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-500 border-t-white" />
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500">
            New here?{" "}
            <Link to="/register" className="font-semibold text-stone-900 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
