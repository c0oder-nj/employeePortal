import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Applogo } from "../../../Routes/ImagePath";
import axios from 'axios';
import Error from './Error';

const ForgotPassword = () => {
  const [data, setData] = useState({
    sapId: "",
    mobileNo : "",
    otp : ""
  })


  const [errorObject, setErrorObject ] = useState({
    'status' : false,
    'display' : 'none',
    'message' : ''
  })

  const [hashValue, setHashValue] = useState('');


  const setOtpData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name] : value
    })
  }
  const [otpDivStyle, setOtpDivStyle] = useState('none');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(data.otp === ''){
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/api/auth/forget-password`,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        },
        data : JSON.stringify(data)
      };
      axios.request(config).then((res)=>{
        // hash = res.data.hash;
        setHashValue(res.data.hash);
        if(res.data.status){
          setOtpDivStyle('block')
          console.log( res.data.hash, res.data.mobileNo)
        }else{
          setErrorObject({status: true, message: res.data.message, display : 'block'})
        }
      }).catch((err)=>{
        console.log("Error occured:::",err);
      })
    }
    
    
    
    
    else{
      const apiBody = {
        "mobileNo" : data.mobileNo,
        "hash" : hashValue,
        "otp" : data.otp
      }
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/api/auth/verify-otp`,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        },
        data : JSON.stringify(apiBody)
      };
      axios.request(config).then((res)=>{
        if(res.data.status){
          console.log(res.data.message);
          navigate('/set-password');
        }else{
          setErrorObject({status:true, message : res.data.message, display: 'block'})
        }
      }).catch((err)=>{
        console.log("Error aayi :: forgotpassword ui componet ::: ",err);
      })
    }
    
  }


  return (


    <div className="account-page">
      <div className="main-wrapper">
        
        <div className="account-content">
          <div className="container">
            <div className="account-logo">
              <Link to="/app/main/dashboard">
                <img src={Applogo} alt="Shakti Pumps India Limited" />
              </Link>
            </div>
            <div className="account-box">
              {
                errorObject.status && <Error message={errorObject.message} display={errorObject.display} />
              }
              <div className="account-wrapper">
                <h3 className="account-title">Forgot Password?</h3>
                {/* <p className="account-subtitle">
                  Enter your email to get a password reset link
                </p> */}
                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label>SAP Id</label>
                    <input className="form-control" type="text" name="sapId" value={data.sapId} onChange={setOtpData}/>
                  </div>
                  <div className="input-block">
                    <label>Mobile Number</label>
                    <input className="form-control" type="text" name="mobileNo" value={data.mobileNo} onChange={setOtpData}/>
                  </div>
                  <div className="input-block" id="otpDiv" style={{display: otpDivStyle}}>
                    <label>Enter OTP</label>
                    <input className="form-control" type="text" name="otp" value={data.otp} onChange={setOtpData}/>
                  </div>
                  <div className="input-block text-center">
                    <button
                      className="btn btn-primary account-btn"
                      type="submit">
                      Reset Password
                    </button>
                  </div>
                  <div className="account-footer">
                    <p>
                      Remember your password? <Link to="/">Login</Link>
                    </p>
                  </div>
                </form>



                {/* form for entering otp  */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
