import React, { useState,useEffect } from "react";


// import Breadcrumbs from "../../../../../Ui_Interface/Components/Breadcrumbs";
import Breadcrumbs from "../../../../../../../components/Breadcrumbs";
import "react-datepicker/dist/react-datepicker.css";
import EmployeeConfirmationDetailsHR from "./EmployeeConfirmationDetailsHR";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../../../hooks/useAuth";


const EmployeeConfirmationFromDetailsHR = () => {
  
  // Function for checking a cookie 
  const navigate = useNavigate();
  const {checkCookie} = useAuth(); 
  useEffect(()=>{
    const checkCk = checkCookie('accessToken');
    if(checkCk.status === false){
      return navigate('/');
    }
  },[]);

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Employee Assesment Form and PPT"
            
          />
          <EmployeeConfirmationDetailsHR />
        </div>
      </div>
      {/* <AddSalaryModal /> */}
    </>
  );
};

export default EmployeeConfirmationFromDetailsHR;
