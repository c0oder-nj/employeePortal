import React, { useState,useEffect } from "react";
// import Breadcrumbs from "../../../../../Ui_Interface/Components/Breadcrumbs";
import Breadcrumbs from "../../../../../../../components/Breadcrumbs";
import "react-datepicker/dist/react-datepicker.css";
import EmployeeConfirmationDetailsHRHead from "./EmployeeConfirmationDetailsHRHead";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../../../hooks/useAuth";

const EmployeeConfirmationFromDetailsHRHead = () => {
  
  // Function for checking a cookie 
  const navigate = useNavigate();
  const {checkCookie} = useAuth(); 
  useEffect(()=>{
    console.log("In head hr part ");
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
            maintitle="Employee Assesment Form and PPT show to Head HR"
          />
          <EmployeeConfirmationDetailsHRHead />
          {/* <EmployeeConfirmationFromDetailsHRHead/> */}
        </div>
      </div>
      {/* <AddSalaryModal /> */}
    </>
  );
};

export default EmployeeConfirmationFromDetailsHRHead;
