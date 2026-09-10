import { useContext, useEffect, useState } from "react";
import { UserDetails } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
}

function ProtectedRoute({
  children,
  isHome = false,
}: {
  children: React.ReactNode;
  isHome?: boolean;
}) {
  const { setIsAuthenticated, setUser } = useContext(UserDetails);
  const [cookie] = useCookies(["accessToken"]);

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (cookie.accessToken) {
          const decoded = jwtDecode<User>(cookie.accessToken);

          setIsAuthenticated(true);
          setUser(decoded);
          setAuthorized(true);

          return;
        }

        const response = await fetch("http://localhost:2000/refresh-token", {
          method: "POST",
          credentials: "include",
        });

        if (response.status === 401) {
          setIsAuthenticated(false);
          setUser(null);
          setAuthorized(false);

          return;
        }

        if (response.status === 201) {
          const data = await response.json();
          setIsAuthenticated(true);
          setAuthorized(true);
          setUser(data.user);

          return;
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
        setUser(null);
        setAuthorized(false);
      } finally {
        setChecking(false);
      }
    };
    checkAuthentication();
  }, [cookie.accessToken]);

  if (checking) {
    //loading animation
    return <div>Checking authentication...</div>;
  }

  if (!authorized && !isHome) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
