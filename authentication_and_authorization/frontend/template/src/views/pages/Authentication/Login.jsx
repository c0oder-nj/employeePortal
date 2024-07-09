/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Applogo } from "../../../Routes/ImagePath";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useDispatch } from "react-redux";
import { login } from "../../../user";
import { resetFunctionwithlogin } from "../../../components/ResetFunction";
// import { login } from "../../../user";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
});





const Login = () => {
  const details = localStorage.getItem("loginDetails");

  const loginData = JSON.parse(details);

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


  const [user, setUser] = useState({
    sapNumber: '',
    password: ''
  })


  const setUserMethod = (e) => {
      let name = e.target.name;
      let value = e.target.value;


      setUser({
          ...user,
          [name]: value
      })
  }

  const checkCookie = async ()=>{
    
    function checkCookie(cookieName) {
      // Split cookie string and iterate over each cookie pair
      const cookies = document.cookie.split(';');
      for(let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          // Check if the cookie name matches the parameter
          if(cookie.startsWith(cookieName + '=')) {
              // Cookie found
              console.log(cookie);
              return true;
          }
      }
      // Cookie not found
      return false;
  }
    
    let cookieExists = checkCookie('accessToken');
    if(cookieExists){
      navigate("/admin-dashboard");
    }
  }
 

  const onSubmit = async (data) => {
    // e.preventDefault();
        
        
        // console.log(document.cookie)
        console.log(JSON.stringify(user))
        try {
            const response = await fetch(`http://localhost:3000/api/auth/login`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Access-Control-Allow-Headers',
                    'Access-Control-Allow-Methods': 'POST',
                },
                body: JSON.stringify(user)
            }).then((response)=>{
                return response.json();
            });
            // console.log(response);
            document.cookie= 'accessToken='+response.accessToken;
            // console.log(document.cookie);    
            navigate("/admin-dashboard");
        } catch (error) {
            
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

  useEffect(() => {
    setValue("email", localStorage.getItem("email"));
    setValue("password", localStorage.getItem("password"));
  }, []);

  const [eye, seteye] = useState(true);

  const onEyeClick = () => {
    seteye(!eye);
  };

  return (
    <div onLoad={checkCookie}>
      <div className="account-page" >
        <div className="main-wrapper">
          <div className="account-content">
            <Link to="/job-list" className="btn btn-primary apply-btn">
              Apply Job
            </Link>
            <div className="container">
              {/* Account Logo */}
              <div className="account-logo">
                <Link to="/admin-dashboard">
                  <img src={Applogo} alt="Dreamguy's Technologies" />
                </Link>
              </div>
              {/* /Account Logo */}
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Login</h3>
                  <p className="account-subtitle">Access to our dashboard</p>
                  {/* Account Form */}
                  <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="input-block mb-4">
                        <label className="col-form-label">Enter You Sap Id</label>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <input
                              className={`form-control ${
                                errors?.email ? "error-input" : ""
                              }`}
                              type="text"
                              defaultValue={localStorage.getItem("email")}
                              name='sapNumber' value={user.sapNumber} onChange={setUserMethod}
                              autoComplete="true"
                            />
                          )}
                        />

                        <span className="text-danger">
                          {" "}
                          {errors.email?.message}{" "}
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
                            render={({ field }) => (
                              <input
                                className={`form-control ${
                                  errors?.password ? "error-input" : ""
                                }`}
                                type={eye ? "password" : "text"}
                                defaultValue={localStorage.getItem("password")}
                                name='password' value={user.password} onChange={setUserMethod}
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
                      <p>
                        Don't have an account yet?{" "}
                        <Link to="/register">Register</Link>
                      </p>
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
