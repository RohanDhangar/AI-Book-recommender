import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
interface User {
  id: string;
  email: string;
}

export const UserDetails = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
  user: null,
  setUser: (user: User) => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [cookie] = useCookies(["accessToken", "refreshToken"]);

  useEffect(() => {
    const checkAuth = () => {
      if (cookie.accessToken) {
        try {
          const decoded = jwtDecode<User>(cookie.accessToken);

          setIsAuthenticated(true);
          setUser(decoded);
        } catch (error) {
          console.error("Error decoding access token:", error);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [cookie.accessToken]);

  if (isLoading) {
    return <div>Loading... from context component</div>;
  }

  return (
    <UserDetails.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </UserDetails.Provider>
  );
};
