/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Applogo } from "../../../Routes/ImagePath";
import axios from "axios";
// import { emailrgx } from "./RegEx"; // Assuming you might need this for email validation

const schema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/, "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol.")
    .required("Password is required")
    .trim(),
  repeatepassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("Repeat Password is required")
    .trim(),
  sapid:yup
    .string()
    .required("this is a required field")
    .matches(/^[0-9]+$/, "Must be only digits")
    .trim()
});

const SetPassword = (props) => {
  const [passwordEye, setPasswordEye] = useState(true); // State for password field
  const [repeatPasswordEye, setRepeatPasswordEye] = useState(true); // State for repeat password field

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // custom implementation
    console.log(data);
    axios.post('http://localhost:3000/api/auth/setPassword', data, {
      'Content-Type' : 'application/json'
    }).then((res)=>{
      if(res.data.status){
        navigate('/');
      }
    })

    // default code in template commented by Neeraj 
    // const currentUser = loginInfo?.find((item) => item?.email === data?.email);
    // if (currentUser === undefined) {
    //   const credencial = { email: data.email, password: data.password };
    //   localStorage.setItem(
    //     "loginDetails",
    //     JSON.stringify([...loginInfo, credencial])
    //   );
    //   setLoginState([...loginInfo, credencial]);
    //   setCheckUser(true); // Set checkUser to true for a successful login
    //   navigate("/");
    // } else {
    //   setCheckUser(false); // Set checkUser to false for a failed login
    //   return false;
    // }
  };

  // Watch password and repeatepassword fields
  const password = watch("password");
  const repeatepassword = watch("repeatepassword");

  return (
    <div className="account-page">
      <div className="main-wrapper">
        <div className="account-content">
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
                <h3 className="account-title">Set your new Password</h3>
                {/* <p className="account-subtitle">Access to our dashboard</p> */}
                {/* Account Form */}
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    
                  <div className="input-block mb-3">
                      <label className="col-form-label">Sap Number</label>
                      <Controller
                        name="sapid"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <div
                            className="pass-group"
                            style={{ position: "relative" }}
                          >
                            <input
                              type="text"
                              className={`form-control  ${
                                errors?.sapid ? "error-input" : ""
                              }`}
                              {...register("sapid")}
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                          </div>
                        )}
                        defaultValue=""
                      />

                      <span className="text-danger">
                        {errors?.sapid?.message}
                      </span>
                    </div>


                    <div className="input-block mb-3">
                      <label className="col-form-label">Password</label>
                      <Controller
                        name="password"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <div
                            className="pass-group"
                            style={{ position: "relative" }}
                          >
                            <input
                              type={passwordEye ? "password" : "text"}
                              className={`form-control  ${
                                errors?.password ? "error-input" : ""
                              }`}
                              {...register("password")}
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                            <span
                              style={{
                                position: "absolute",
                                right: "5%",
                                top: "30%",
                              }}
                              onClick={() => setPasswordEye(!passwordEye)}
                              className={`fa toggle-password ${
                                passwordEye ? "fa-eye-slash" : "fa-eye"
                              }`}
                            />
                          </div>
                        )}
                        defaultValue=""
                      />

                      <span className="text-danger">
                        {errors?.password?.message}
                      </span>
                    </div>

                    <div className="input-block mb-3">
                      <label className="col-form-label">Repeat Password</label>
                      <Controller
                        name="repeatepassword"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <div
                            className="pass-group"
                            style={{ position: "relative" }}
                          >
                            <input
                              type={repeatPasswordEye ? "password" : "text"}
                              className={`form-control  ${
                                errors?.repeatepassword ? "error-input" : ""
                              }`}
                              {...register("repeatepassword")}
                              value={value}
                              onChange={onChange}
                              autoComplete="false"
                            />
                            <span
                              style={{
                                position: "absolute",
                                right: "5%",
                                top: "30%",
                              }}
                              onClick={() =>
                                setRepeatPasswordEye(!repeatPasswordEye)
                              }
                              className={`fa toggle-password ${
                                repeatPasswordEye ? "fa-eye-slash" : "fa-eye"
                              }`}
                            />
                          </div>
                        )}
                        defaultValue=""
                      />

                      <span className="text-danger">
                        {errors?.repeatepassword?.message}
                      </span>
                    </div>

                    <div className="input-block text-center">
                      <button
                        type="submit"
                        className="btn btn-primary account-btn"
                        disabled={password !== repeatepassword}
                      >
                        Set Password
                      </button>
                    </div>
                  </form>

                  {/* <div className="account-footer">
                    <p>
                      Already have an account? <Link to="/">Login</Link>
                    </p>
                  </div> */}
                </div>
                {/* /Account Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
