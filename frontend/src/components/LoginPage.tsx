import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "../Context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(UserDetails);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    try {
        const response = await fetch("http://localhost:2000/login", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json();
        console.log("login successfully", data);
        setIsAuthenticated(true);
        navigate("/");


    } catch (error) {
        console.log("login failed", error);
        alert("login failed, Please try again");
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} >
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
