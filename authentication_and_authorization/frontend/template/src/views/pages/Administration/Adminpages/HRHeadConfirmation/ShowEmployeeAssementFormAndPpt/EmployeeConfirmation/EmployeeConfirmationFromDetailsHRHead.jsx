// import React, { useState,useEffect } from "react";
// // import Breadcrumbs from "../../../../../Ui_Interface/Components/Breadcrumbs";
// import Breadcrumbs from "../../../../../../../components/Breadcrumbs";
// import "react-datepicker/dist/react-datepicker.css";
// import EmployeeConfirmationDetailsHRHead from "./EmployeeConfirmationDetailsHRHead";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../../../../../../hooks/useAuth";

// const EmployeeConfirmationFromDetailsHRHead = () => {
  
//   // Function for checking a cookie 
//   const navigate = useNavigate();
//   const {checkCookie} = useAuth(); 
//   useEffect(()=>{
//     console.log("In head hr part ");
//     const checkCk = checkCookie('accessToken');
//     if(checkCk.status === false){
//       return navigate('/');
//     }
//   },[]);

//   return (
//     <>
//       <div className="page-wrapper">
//         <div className="content container-fluid">
//           <Breadcrumbs
//             maintitle="Employee Assesment Form and PPT"
//           />
//           {/* <EmployeeConfirmationDetailsHRHead /> */}
//           {/* <EmployeeConfirmationFromDetailsHRHead/> */}
//         </div>
//       </div>
//       {/* <AddSalaryModal /> */}
//     </>
//   );
// };

// export default EmployeeConfirmationFromDetailsHRHead;









import React, { useState,useEffect } from "react";


// import Breadcrumbs from "../../../../../Ui_Interface/Components/Breadcrumbs";
import Breadcrumbs from "../../../../../../../components/Breadcrumbs";
import "react-datepicker/dist/react-datepicker.css";
import EmployeeConfirmationDetailsHRHead from './EmployeeConfirmationDetailsHRHead'
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../../../hooks/useAuth";


const EmployeeConfirmationFromDetailsHRHead = () => {
  
  // Function for checking a cookie 
  const navigate = useNavigate();
  const {checkCookie} = useAuth(); 
  useEffect(()=>{
    const checkCk = checkCookie('accessToken');
    if(checkCk.status === false){
      return navigate('/');
    }
  },[]);

  // const [setSelectedOption] = useState(null);
  // const [setSelecttwo] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedDateTwo, setSelectedDateTwo] = useState(null);

  // const [dateTwo, setdateTwo] = useState(false);
  // const [isFocused, setIsFocused] = useState(false);
  // const [focused, setFocused] = useState(false);
  // const [inputValue, setInputValue] = useState("");

  // const handleLabelClick = () => {
  //   setFocused(true);
  // };

  // const handleInputBlur = () => {
  //   if (inputValue === "") {
  //     setFocused(false);
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);
  //   if (value !== "" && !focused) {
  //     setFocused(true);
  //   }
  // };

  // const handleFocus = () => {
  //   setIsFocused(true);
  // };

  // const handleBlur = () => {
  //   setIsFocused(false);
  // };

  // const handleFocustwo = () => {
  //   setdateTwo(true);
  // };
  // const handleBlurtwo = () => {
  //   setdateTwo(false);
  // };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };
  // const handleDateChangeTwo = (date) => {
  //   setSelectedDateTwo(date);
  // };
  // const options = [
  //   { value: "--Select--", label: "--Select--" },
  //   { value: "Employee", label: "Employee" },
  //   { value: "Manager", label: "Manager" },
  // ];

  // const optionsTwo = [
  //   { value: "--Select--", label: "--Select--" },
  //   { value: "Cash", label: "Cash" },
  //   { value: "Cheque", label: "Cheque" },
  // ];
  // const customStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
  //     color: state.isFocused ? "#fff" : "#000",
  //     "&:hover": {
  //       backgroundColor: "#ff9b44",
  //     },
  //   }),
  // };
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Employee Assesment Form and PPT"
            // title="Dashboard"
            // subtitle="Salary"
            // modal="#add_salary"
            // name="Add Salary"
          />
          <EmployeeConfirmationDetailsHRHead/>
        </div>
      </div>
      {/* <AddSalaryModal /> */}
    </>
  );
};

export default EmployeeConfirmationFromDetailsHRHead;
