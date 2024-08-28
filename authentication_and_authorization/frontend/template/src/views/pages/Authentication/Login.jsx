/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2';
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Applogo } from "../../../Routes/ImagePath";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useDispatch } from "react-redux";
import { login } from "../../../user";
import { resetFunctionwithlogin } from "../../../components/ResetFunction";
import Error from './Error';

// import custom hooks for context api custom hooks
import useAuth from '../../../hooks/useAuth';

const validationSchema = Yup.object({
  sapid: Yup
      .string()
      .required("this is a required field")
      .trim(),
  password: Yup
      .string()
      .required("Password is required")
      .trim(),
});





const Login = () => {

  // setting autheticated user object
  const { auth, setAuth } = useAuth();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [display, setDisplay] = useState('block');


  
  const checkCookie = async ()=>{
    
    function checkCookie(cookieName) {
      const cookies = document.cookie.split(';');
      for(let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          // Check if the cookie name matches the parameter
          if(cookie.startsWith(cookieName + '=')) {
              // Cookie found
              // console.log(cookie);
              return true;
          }
      }
      // Cookie not found
      return false;
  }
    
    let cookieExists = checkCookie('accessToken');
    if(cookieExists){
      navigate("/employee-dashboard");
    }
  }
 
 
  const onSubmit = async (data) => {
        // when user enters the default password navigate it to set new password
        try {
          let apiUrl = `${process.env.REACT_APP_BASE_URL}/api/auth/login`;
          console.log('api url: ',apiUrl);
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Access-Control-Allow-Headers',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Origin' : '*'
                },
                body: JSON.stringify(data)
            }).then((response)=>{
                return response.json();
            });   
            if(response.status){
              localStorage.setItem('username', response.name);
              document.cookie= 'accessToken='+response.accessToken;
              console.log("Cookie has been set");
              console.log('accessToken='+response.accessToken)
              setAuth({'user': true,'name' : response.name, 'roles' : response.roles,'accessToken':response.accessToken})
              console.log("New auth that has been set :: -> ", auth);
              navigate("/employee-dashboard");
            }else if(response.newUser){
              navigate('/set-password', {
                state : {
                  "sapid" : data.sapid
                }
              });
              <Navigate to={"/set-password"}/>
            }
            else{
              console.log(response.message);
              setErrorMessage({"status": true, "message":response.message});
              setDisplay('block');
              navigate("/")
            }
        } catch (error) {
            console.log("Error at login try block ::: ",error.data);
        }

  

  };

  function refreshPage() {
    window.location.reload(false);
  }

  // const onSubmit = () => {
  //   localStorage.setItem("colorschema", "orange");
  //   localStorage.setItem("layout", "vertical");
  //   localStorage.setItem("layoutwidth", "fixed");
  //   localStorage.setItem("layoutpos", "fluid");
  //   localStorage.setItem("topbartheme", "light");
  //   localStorage.setItem("layoutSized", "lg");
  //   localStorage.setItem("layoutStyling", "default");
  //   localStorage.setItem("layoutSidebarStyle", "dark");

  //   navigate("/admin-dashboard");
  // };

  // useEffect(() => {
  //   setValue("email", localStorage.getItem("email"));
  //   setValue("password", localStorage.getItem("password"));
  // }, []);

  const [eye, seteye] = useState(true);

  const onEyeClick = () => {
    seteye(!eye);
  };

  useEffect(()=>{
    if(errorMessage.status){
      setTimeout(() => {
        setDisplay('none');
      }, 2500);
    }
  },[errorMessage])

  return (
    <div>
      <div className="account-page" >
        <div className="main-wrapper">
          <div className="account-content">
            {/* <Link to="/job-list" className="btn btn-primary apply-btn">
              Apply Job
            </Link> */}
            <div className="container">
              {/* Account Logo */}
              <div className="account-logo">
                <Link to="/admin-dashboard">
                  <img src={Applogo} alt="Shakti Pumps" style={{'width':'50%'}} />
                </Link>
              </div>
              {/* /Account Logo */}
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>
                  {/* Account Form */}
                  <div>
                    {/* {errorMessage.status && 

                      <div id='alert-div' className="alert alert-warning alert-dismissible fade show" style={{display : display}}>
                        <strong>Errro:</strong> {errorMessage.message}
                        <button type="button" className="btn-close"></button>
                      </div>
                   } */}
                   
                   {
                    errorMessage.status && <Error message={errorMessage.message} display={display}/>
                   }
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="input-block mb-4">
                        <label className="col-form-label">Username / SAP Id</label>
                        <Controller
                          name="sapid"
                          control={control}
                          render={({ field : {value,onChange} }) => (
                            <input
                              className={`form-control ${
                                errors?.email ? "error-input" : ""
                              }`}
                              type="text"
                              name='sapNumber' value={value} onChange={onChange}
                              autoComplete="true"
                            />
                          )}
                        />

                        <span className="text-danger">
                          {" "}
                          {errors.sapid?.message}{" "}
                        </span>
                      </div>

                      <div className="input-block mb-4">
                        <div className="row">
                          <div className="col">
                            <label className="col-form-label">Password</label>
                          </div>
                          <div className="col-auto">
                            <Link className="text-muted" to="/forgot-password">
                              Forgot password?
                            </Link>
                          </div>
                        </div>
                        <div style={{ position: "relative" }}>
                          <Controller
                            name="password"
                            control={control}
                            render={({ field : {value, onChange} }) => (
                              <input
                                className={`form-control ${
                                  errors?.password ? "error-input" : ""
                                }`}
                                type={eye ? "password" : "text"}
                                name='password' value={value} onChange={onChange}
                              />
                            )}
                          />
                          <span
                            style={{
                              position: "absolute",
                              right: "5%",
                              top: "30%",
                            }}
                            onClick={onEyeClick}
                            className={`fa-solid ${
                              eye ? "fa-eye-slash" : "fa-eye"
                            } `}
                          />
                        </div>
                        <span className="text-danger">
                          {" "}
                          {errors.password?.message}{" "}
                        </span>
                      </div>
                      <div className="input-block text-center">
                        <button
                          className="btn btn-primary account-btn"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="account-footer">
                      {/* <p>
                        Don't have an account yet?{" "}
                        <Link to="/register">Register</Link>
                      </p> */}
                    </div>
                  </div>
                  {/* /Account Form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
