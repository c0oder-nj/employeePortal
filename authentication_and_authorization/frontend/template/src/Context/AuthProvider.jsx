import { createContext, useState } from "react";

const AuthContext = createContext({})


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

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

    return (
        <AuthContext.Provider value={{ auth, setAuth, checkCookie }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;