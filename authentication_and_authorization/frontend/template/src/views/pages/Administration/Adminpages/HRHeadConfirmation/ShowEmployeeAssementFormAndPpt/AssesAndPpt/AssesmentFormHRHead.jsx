
import Breadcrumbs from "../../../../../../../components/Breadcrumbs";
import { Applogo } from "../../../../../../../Routes/ImagePath";

import Select from "react-select";
import useAuth from "../../../../../../../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";


const AssesmentHRHead = () => {
  const navigate = useNavigate();
  const { checkCookie } = useAuth();
  
  const location= useLocation();
  const employeeSapNumber = location.state;
  console.log("Printing value",employeeSapNumber);
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "150px",
    }),
  };
  useEffect(()=>{
    console.log("In useEffect");
    const checkCk = checkCookie('accessToken');
    if(checkCk.status === false){
      return navigate('/');
    }

    const fetchData = async () => {
      
      const cookieExists = checkCookie("accessToken");
      let cookieValue = cookieExists.cookie;
      cookieValue = cookieValue.split('=').at(1);
      console.log(
        "Printing value at 478 for travelexpense data in local :: ",
        cookieValue
      );
      const url = `${process.env.REACT_APP_BASE_URL}/api/admin/assesment-form?value=${employeeSapNumber}`;
      console.log(url);
      await fetch(url, {
        headers: {
          'accesstoken': cookieValue,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          
          console.log("Printing travel data in data.travel_data :: ", data);
          
          return data;
          
        })
        .catch((error) => {
          console.log("Error",error);
        });
     
    };
    fetchData();

  },[]);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Assesment Form"
        />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="payslip-title">
                  Payslip for the month of Feb 2019
                </h4>
                
                <div className="row">
                  <div className="col-lg-12 m-b-20">
                    <ul className="list-unstyled">
                      <li>
                        <h5 className="mb-0">
                          <strong>COMPANY NAME :</strong>Shakti Pumps
                        </h5>
                      </li>
                      <li>
                      <h5 className="mb-0">
                          <strong>Location:</strong>Pithampur
                        </h5>
                      </li>
                      <li><h5 className="mb-0">
                          <strong>Name:</strong>Shiv Dev Singh
                        </h5></li>
                        <li><h5 className="mb-0">
                          <strong>SAP.NO. *:</strong>00005052
                        </h5></li>
                        <li><h5 className="mb-0">
                          <strong>Designation :</strong>P
                        </h5></li>
                        <li><h5 className="mb-0">
                          <strong>DEPT :</strong>Z001
                        </h5></li>
                        <li><h5 className="mb-0">
                          <strong>DATE OF JOINING * :</strong>20240108
                        </h5></li>
                        <li><h5 className="mb-0">
                          <strong>CONFIRMATION DUE ON * :</strong>20241007
                        </h5></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssesmentHRHead;
