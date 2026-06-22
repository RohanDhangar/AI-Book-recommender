import { useEffect } from "react";
import { useContext } from "react";
import { UserDetails } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const { isAuthenticated, setIsAuthenticated } = useContext(UserDetails);
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      if (isAuthenticated) {
        fetch("http://localhost:2000/logout", {
          method: "POST",
          credentials: "include",
        })
          .then((response) => response.json())
          .then(() => console.log("logout successfully"));
      }
      setIsAuthenticated(false);
    };
    logout();
  }, []);

  return (
    <div>
      <p>You have been logged out.</p>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
}

export default LogoutButton;
