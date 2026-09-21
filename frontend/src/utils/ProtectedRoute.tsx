import { useContext, useEffect, useState } from "react";
import { UserDetails } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { apiUrl } from "./api";

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

        const response = await fetch(apiUrl("/refresh-token"), {
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

        setIsAuthenticated(false);
        setUser(null);
        setAuthorized(false);
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
    return (
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-5">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-stone-800" />
          <p className="mt-4 text-sm text-stone-500">Checking your session...</p>
        </div>
      </div>
    );
  }

  if (!authorized && !isHome) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
