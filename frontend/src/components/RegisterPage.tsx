import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    navigate("/complete-profile", { state: { name, email, password } });
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center justify-center px-5 py-12 lg:px-6">
      <div className="w-full max-w-xl rounded-2xl border border-stone-200 bg-white p-7 shadow-[0_20px_60px_-35px_rgba(41,37,36,0.4)] sm:p-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Start here
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
            Create your account
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
            Tell us a little about yourself next, and we will use it to build
            your personalized reading experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-stone-700">Name</span>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-stone-300 px-3.5 py-3 text-sm outline-none focus:border-stone-500 focus:ring-2 focus:ring-amber-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-stone-700">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-stone-300 px-3.5 py-3 text-sm outline-none focus:border-stone-500 focus:ring-2 focus:ring-amber-100"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-stone-700">Password</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-stone-300 px-3.5 py-3 text-sm outline-none focus:border-stone-500 focus:ring-2 focus:ring-amber-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-stone-700">Confirm password</span>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-stone-300 px-3.5 py-3 text-sm outline-none focus:border-stone-500 focus:ring-2 focus:ring-amber-100"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            Continue to profile
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-stone-900 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
