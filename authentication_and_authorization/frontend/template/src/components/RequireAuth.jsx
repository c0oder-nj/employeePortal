import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../views/layout/Header";
import Sidebar from "../views/layout/Sidebar";
import OffCanvas from "./OffCanvas";
import axios from 'axios'
import { useEffect, useState } from "react";
// import jwt from 'jsonwebtoken';



const RequireAuth = ({ allowedRoles }) => {
    const { auth , setAuth } = useAuth();
    const [isfetched, setIsFetched] = useState(false);
    const location = useLocation();


    function checkCookie(cookieName) {
        const cookies = document.cookie.split(';');
        console.log(document.cookie);
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          if (cookie.startsWith(cookieName + '=')) {
            const accesstoken = cookie.split('=')[1];
            return { status: true, accesstoken };
          }
        }
        return { status: false, accesstoken: null };
      }



    useEffect(() => {
        if (auth.user) {
            setIsFetched(true); // Skip fetching if auth is already set
            return;
        }

        const cookieChecking = checkCookie('accessToken');
        if (cookieChecking.status) { // when cookie exists with access token
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/api/employee/roles',
                headers: { 
                    'accessToken': cookieChecking.accesstoken
                }
            };

            axios.request(config)
                .then((response) => {
                    setAuth(response.data);
                    setIsFetched(true);
                })
                .catch((error) => {
                    console.log(error);
                    setIsFetched(true); // Ensure loading is stopped even if there's an error
                });
        } else {
            setIsFetched(true); // No token found, so stop loading
        }
    }, [auth, setAuth]);




    console.log("Printing from require auth componet :: ", JSON.stringify(auth));
    
    console.log("Roles in auth object :: -> ", auth.roles);
    console.log("Allowed roles in prop :: -> ", allowedRoles);




    if(!isfetched){
        return ( <div>Loading ....</div>)
    }
    
    return (

        auth?.roles?.find( role => allowedRoles?.includes(role))
            ? 
            <>
                <Header/>
                <Sidebar />
                <OffCanvas />
                <Outlet />
            </>
            : <Navigate to="/" state={{ from: location }} replace />
    );
} 
export default RequireAuth;