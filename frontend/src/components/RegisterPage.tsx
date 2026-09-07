import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() { 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    navigate("/complete-profile", { state: { name, email, password } });

    // const payload = {
    //   name,
    //   email,
    //   password,
    // };

    // try {

    //     const response = await fetch("http://localhost:2000/register", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(payload)
    //     })
    //     const data = await response.json();
    //     console.log("Registration successfully", data);

    // } catch (error) {
    //   console.log("Registration failed: ", error);
    //   alert("Registration failed, Please try again.");
    // }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
