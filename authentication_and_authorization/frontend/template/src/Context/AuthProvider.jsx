import { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext({})


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate();
    const checkCookie = (cookieName) => {
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if(cookie.startsWith(cookieName + '=')) {
            return {'status' : true, 'cookie' : cookie};
        }
        }
        return {'status' : false, 'cookie' : false};
    }

    const handleLogOut = (cookieName) => {
        const isCookie = checkCookie(cookieName);
        let value = isCookie.cookie;
        document.cookie = value+";expires=22 Aug 1999 12:00:00 UTC;";
        localStorage.clear();
        window.location.href = '/'; // redirect to login endpoint
        // navigate('/'); //navigate to login endpoint
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, checkCookie, handleLogOut , isLoading, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;