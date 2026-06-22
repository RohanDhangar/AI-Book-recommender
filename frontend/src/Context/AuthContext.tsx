import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from 'jwt-decode';


interface User {
    id: string,
    email: string
}

export const UserDetails = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => { },
    user: null,
    setUser: (user: any) => { }
});



export const UserProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | any>(null);
    const [cookie] = useCookies(['accessToken', 'refreshToken']);

    useEffect(() => {
        if (cookie.accessToken) {
            setIsAuthenticated(true);
            const decoded:any = jwtDecode(cookie.accessToken);
            setUser(decoded);
        }
    }, [cookie.accessToken])

    return (
        <UserDetails.Provider 
        value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser
        }}
        >
        {children}
        </UserDetails.Provider>
    );

}
