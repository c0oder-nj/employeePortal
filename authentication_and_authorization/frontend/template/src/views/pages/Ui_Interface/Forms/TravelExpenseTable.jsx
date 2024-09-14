import React, { useEffect, useState } from "react";

import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Link } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddSalaryModal from "../../../../components/modelpopup/AddSalaryModal";
import TravelAllwowanceExcelSubmitionPopup from "../../../../components/modelpopup/TravelAllwowanceExcelSubmitionPopup";
import TravelExpenseDataTable from "./TravelExpenseDataTable";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const TravelExpenseTable = () => {
  const [setSelectedOption] = useState(null);
  const [setSelecttwo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateTwo, setSelectedDateTwo] = useState(null);
  const navigate = useNavigate();
  const [dateTwo, setdateTwo] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const {checkCookie} = useAuth();

  const handleLabelClick = () => {
    setFocused(true);
  };

  const handleInputBlur = () => {
    if (inputValue === "") {
      setFocused(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value !== "" && !focused) {
      setFocused(true);
    }
  };

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
  const options = [
    { value: "--Select--", label: "--Select--" },
    { value: "Employee", label: "Employee" },
    { value: "Manager", label: "Manager" },
  ];

  const optionsTwo = [
    { value: "--Select--", label: "--Select--" },
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];
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
  
  // function checkCookie(cookieName) {
  //   const cookies = document.cookie.split(';');
  //   for (let i = 0; i < cookies.length; i++) {
  //     let cookie = cookies[i].trim();
  //     if (cookie.startsWith(cookieName + '=')) {
  //       const accesstoken = cookie.split('=')[1];
  //       return { status: true, accesstoken };
  //     }
  //   }
  //   return { status: false, accesstoken: null };
  // }
  useEffect(()=>{
    const checkCk = checkCookie('accessToken');
    if(checkCk.status === false){
      return navigate('/');
    }
  },[]);

  return (
    <>
      {/* custom modal */}
      {/* <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title custom modal</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div> */}
      {/* custom modal end */}
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Travel Expense"
            title="Travel Dashboard"
            // modal = "#add_salary"
            name="Add Travel Expense"
            modal="#travel_allwowance"
          />

          <div className="row filter-row">
            {/* <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div
                className={
                  focused || inputValue !== ""
                    ? "input-block form-focus focused"
                    : "input-block form-focus"
                }
              >
                <input
                  type="text"
                  className="form-control floating"
                  value={inputValue}
                  onFocus={handleLabelClick}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                />
                <label className="focus-label" onClick={handleLabelClick}>
                  Reimbur. Number
                </label>
              </div>
            </div> */}
            {/* <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="input-block mb-3 form-focus select-focus">
                <Select
                  placeholder="--Select--"
                  onChange={setSelectedOption}
                  options={options}
                  className="select floating"
                  styles={customStyles}
                />
                <label className="focus-label">Purchased By</label>
              </div>
            </div> */}
            {/* <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="input-block mb-3 form-focus select-focus">
                <Select
                  placeholder="--Select--"
                  onChange={setSelecttwo}
                  options={optionsTwo}
                  className="select floating"
                  styles={customStyles}
                />
                <label className="focus-label">Paid By</label>
              </div>
            </div> */}
            {/* <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div
                className={`input-block mb-3 form-focus ${
                  isFocused ? "focused" : ""
                }`}
              >
                <div className="cal-icon focused ">
                  <DatePicker
                    className="form-control floating datetimepicker"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
                <label className="focus-label">From</label>
              </div>
            </div> */}
            {/* <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div
                className={`input-block mb-3 form-focus ${
                  dateTwo ? "focused" : ""
                }`}
              >
                <div className="cal-icon">
                  <DatePicker
                    className="form-control floating datetimepicker "
                    selected={selectedDateTwo}
                    onChange={handleDateChangeTwo}
                    onFocus={handleFocustwo}
                    onBlur={handleBlurtwo}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
                <label className="focus-label">To</label>
              </div>
            </div> */}
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              {/* <Link to="#" className="btn btn-success w-100">
                {" "}
                Search{" "}
              </Link> */}

              {/* <button className="btn btn-success w-100" type="button" >Search</button> */}
            </div>
          </div>

          <TravelExpenseDataTable />
        </div>
      </div>
      {/* <AddSalaryModal/> */}
      <TravelAllwowanceExcelSubmitionPopup />
    </>
  );
};

export default TravelExpenseTable;
