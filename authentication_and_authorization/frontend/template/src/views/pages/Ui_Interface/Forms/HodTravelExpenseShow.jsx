import React, { useState } from "react";

// import Breadcrumbs from "../../../../../components/Breadcrumbs";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { Link } from "react-router-dom";
// import ExpenseReportTable from "./ExpenseReportTable";
import TravelExpenseReportTable from "../../HR/Reports/ExpenseReport/TravelExpenseReportTable";
import { Input } from "antd";

const HodTravelExpenseShow = ()=>{
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateTwo, setSelectedDateTwo] = useState(null);
  
    const [isFocused, setIsFocused] = useState(false);
    const [dateTwo, setdateTwo] = useState(false);
    const [select,setSelectedOption] = useState(null);
  
    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };
  
    const handleFocustwo = () => {
      setdateTwo(true);
    };
    const handleBlurtwo = () => {
      setdateTwo(false);
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    const handleDateChangeTwo = (date) => {
      setSelectedDateTwo(date);
    };
  
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
        color: state.isFocused ? "#fff" : "#000",
        "&:hover": {
          backgroundColor: "#ff9b44",
        },
      }),
    };
    const options = [
      { value: "--Select--", label: "--Select--" },
      { value: "Loren Gatlin", label: "Loren Gatlin" },
      { value: "Tarah Shropshire", label: "Tarah Shropshire" },
    ];
  
    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Hod Travel Approval"
            title="Dashboard"
            subtitle="Employee Travel Report"
          />
          {/* <div className="row filter-row">
            <div className="col-sm-6 col-md-3">
              <div className="input-block form-focus select-focus">
                <Input 
                  type="text"
                  className="form-control"
                 
                />
                <label className="focus-label">Purchased By</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <Link to="#" className="btn btn-success btn-block w-100">
                {" "}
                Search{" "}
              </Link>
            </div>
          </div> */}
  
          <TravelExpenseReportTable />
        </div>
      </div>
    );
}

export default HodTravelExpenseShow;