import { useContext, useEffect } from "react";
import { UserDetails } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUser,
  } = useContext(UserDetails);

  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const response = await fetch("http://localhost:2000/logout", {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Logout failed");
          return;
        }

        // Clear global authentication state
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
    <div>
      <p>You have been logged out.</p>

      <button onClick={() => navigate("/login")}>
        Go to Login
      </button>
    </div>
  );
}

export default LogoutButton;