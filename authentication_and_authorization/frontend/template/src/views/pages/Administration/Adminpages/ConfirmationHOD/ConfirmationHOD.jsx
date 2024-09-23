import React, { useEffect, useState } from "react";

import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { Link } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddSalaryModal from "../../../../../components/modelpopup/AddSalaryModal";
import TravelAllwowanceExcelSubmitionPopup from "../../../../../components/modelpopup/TravelAllwowanceExcelSubmitionPopup";
// import TravelExpenseDataTable from "./TravelExpenseDataTable";
import TravelExpenseDataTable from "../../../Ui_Interface/Forms/TravelExpenseDataTable";
import ConfirmationHODShowTable from "./ConfirmationHODShowTable";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";

const ConfirmationHOD = () => {
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
      {/* custom modal end */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Employee Confirmation"
            title="Employee Confirmation Dashboard"
            // modal = "#add_salary"
            // name="Add Travel Expense"
            // modal="#travel_allwowance"
          />

          <div className="row filter-row">
            
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              </div>
          </div>

          {/* <TravelExpenseDataTable />
           */}
        <ConfirmationHODShowTable/>
        </div>
      </div>
      {/* <AddSalaryModal/> */}
      <TravelAllwowanceExcelSubmitionPopup />
    </>
  );
};

export default ConfirmationHOD;
