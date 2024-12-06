import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Applogo } from "../../../Routes/ImagePath";
import axios from 'axios';
import Error from './Error';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const ForgotPassword = () => {
  const [data, setData] = useState({
    sapId: "",
    mobileNo : "",
    otp : ""
  })

  const [mobile, setMobile] = useState('');
  const [readOnly, isReadOnly] = useState(false);


  const [errorObject, setErrorObject ] = useState({
    'status' : false,
    'display' : 'none',
    'message' : ''
  })

  const [hashValue, setHashValue] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);


  const setOtpData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name] : value
    })


    // custom implementation to invoke api which will fetch mobile number 
    if(name === 'sapId'){
      setMobile('');
    }
  }

  const fetchMobNum = (e) => {
    var sapId = document.getElementById('sapId').value;
    sapId = parseInt(sapId);
    if(sapId > 0){
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASE_URL}/api/auth/fetch-phone?sapid=${sapId}`,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        if(response.data.status){
          const mobileNo = response.data.mobileNo;
          setMobile(mobileNo);
          setData({
            ...data,
            'mobileNo' : mobileNo
          })
          setIsSubmitDisabled(false);
        }else{
          setIsSubmitDisabled(true);
          setMobile(response.data.mobileNo)
          Toastify({
            text: response.data.message,
            duration: 3000,
            // destination: "/forgot-password",
            newWindow: false,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            // onClick: function(){} // Callback after click
          }).showToast();
        }
      })
      .catch((error) => {
        console.log(error);
      });      
    }
  }

  const [otpDivStyle, setOtpDivStyle] = useState('none');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("Printing data :: ",data);
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
          isReadOnly(true);
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
          navigate('/set-password', {
            state: {
              'sapid' : data.sapId
            }
          });
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
                <img src={Applogo} alt="Shakti Pumps India Limited" style={{width : '50%'}} />
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
                    <input className="form-control" type="text" name="sapId" id="sapId" readOnly={readOnly} value={data.sapId} onChange={setOtpData}/>
                  </div>
                  <div className="input-block">
                    <label>Mobile Number</label>
                    <input className="form-control" readOnly="true" type="text" name="mobileNo" id="mobileNo" value={mobile} onClick={fetchMobNum}/>
                  </div>
                  <div className="input-block" id="otpDiv" style={{display: otpDivStyle}}>
                    <label>Enter OTP</label>
                    <input className="form-control" type="text" name="otp" value={data.otp} onChange={setOtpData}/>
                  </div>
                  <div className="input-block text-center">
                    <button
                      className="btn btn-primary account-btn"
                      disabled={isSubmitDisabled}
                      type="submit">
                      Reset Password
                    </button>
                  </div>
                  <div className="account-footer">
                    <p>
                      Remember your password? <Link to="/" style={{color : '#297fc3'}}>Login</Link>
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
