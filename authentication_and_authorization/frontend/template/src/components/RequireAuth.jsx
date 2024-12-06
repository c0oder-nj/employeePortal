import { useLocation, Navigate, Outlet ,useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../views/layout/Header";
import Sidebar from "../views/layout/Sidebar";
import OffCanvas from "./OffCanvas";
import axios from 'axios'
import { useEffect, useState } from "react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import ShaktiLoader from "./ShaktiLoader";
// import jwt from 'jsonwebtoken';



const RequireAuth = ({ allowedRoles }) => {


    console.log("Allowed roles are :: ", allowedRoles);


    const { auth , setAuth , checkCookie ,  } = useAuth();
    const [isfetched, setIsFetched] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    // function checkCookie(cookieName) {
    //     const cookies = document.cookie.split(';');
    //     console.log(document.cookie);
    //     for (let i = 0; i < cookies.length; i++) {
    //       let cookie = cookies[i].trim();
    //       if (cookie.startsWith(cookieName + '=')) {
    //         const accesstoken = cookie.split('=')[1];
    //         return { status: true, accesstoken };
    //       }
    //     }
    //     return { status: false, accesstoken: null };
    //   }



      useEffect(() => {
          const cookieChecking = checkCookie('accessToken');
          if (auth.user) {
              setIsFetched(true); // Skip fetching if auth is already set
            return;
        }

        if (cookieChecking.status) { // when cookie exists with access token
            let value = cookieChecking.cookie.split('=').at(1);
            console.log("Cookie value at requireauth :: ", value);
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${process.env.REACT_APP_BASE_URL}/api/employee/roles`,
                headers: { 
                    'accessToken': value
                }
            };

            axios.request(config)
                .then((response) => {
                    // auto logout user when token is expired
                    if(response.data.status == false && response.data.type == "Token Expired"){
                        console.log(response.data.message);
                        console.log("Navigate user to login via requireAuth")
                        // window.location.href = '/'; //redirect user to login when token expired with message
                        navigate('/', {
                            state : {response}
                        })
                    }
                    setAuth(response.data);
                    setIsFetched(true);
                })
                .catch((error) => {
                    console.log(error);
                    setIsFetched(true); // Ensure loading is stopped even if there's an error
                });
        } else {
            setIsFetched(true); // No token found, so stop loading
            console.log("In case when no token found")
        }
    }, [auth, setAuth]);



    // console.log("Printing from require auth componet :: ", JSON.stringify(auth));
    
    // console.log("Roles in auth object :: -> ", auth.roles);
    // console.log("Allowed roles in prop :: -> ", allowedRoles);




    if(!isfetched){
        return ( <div>
            <ShaktiLoader/>
        </div>)
    }

    console.log("user Roles :: ", auth.roles)
        console.log("allowed roles :: ", allowedRoles)
    
    return (

        

        auth?.roles?.some( role => allowedRoles?.includes(role))
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