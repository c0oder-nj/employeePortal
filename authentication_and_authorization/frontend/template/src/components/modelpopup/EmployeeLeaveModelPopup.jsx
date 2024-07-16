import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { TimePicker } from "antd";


const EmployeeLeaveModelPopup = (props) => {
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const { data1,data2 } = props;
  console.log(data1)
  console.log(data2)
  // console.log(data)
  const navigate = useNavigate();
  var sapNumber;
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  const leavetype = [
    { value: 1, label: "Select Leave Type" },
    { value: 2, label: "Casual Leave" },
    { value: 3, label: "Medical Leave" },
    { value: 4, label: "Earned Leave" },
    { value: 5, label: "Leave without Pay"}
  ];

  const leaveDuration = [
    { value: 1, label: "Select Leave Duration" },
    { value: 2, label: "Full day" },
    { value: 3, label: "Half Day" }
  ];

 var empData = [

 ]

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
  

  //Checking for wheter cooie is existing or not
  function checkCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if(cookie.startsWith(cookieName + '=')) {

        return true;
      }
    }
    return false;
  }
  useEffect(()=>{
    let cookieExists = checkCookie('accessToken');
    if(!cookieExists){
      navigate("react/template/");
    }

    const fetchSapNumber = async ()=>{
      
      // const url = `http://localhost:3000/api/auth/home?value=${value}`;
      const value = `${document.cookie}`;
      console.log(value)
      const url = `http://localhost:3000/api/employee/employeeSapNumber?value=${value}`;
      console.log(url);
      
      sapNumber = await fetch
      (url).then((response)=>{
        return response.json();
      }).then((data) => {
        return data;
      }).catch((error)=>{
        console.log("Error");
      });

      console.log(sapNumber)
  }
  fetchSapNumber();
  },[])

  //Fetching details of casual Leave
  // var casualCount =data[0].leaveType; 
  console.log(sapNumber)
  console.log(data1[0].leaveType)
  console.log(data2)
  var counter = 1;

  const userPresent = data2.map((index,item) =>{
    const container = {};
    container.value = counter;
    container.label = index.ename;
 
    return container
})

console.log(userPresent)

    return (
      <>
        <div id="add_leave" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Leave</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Leave Type <span className="text-danger">*</span>
                    </label>
                    <Select
                      options={leavetype}
                      placeholder="Select"
                      styles={customStyles}
                    />
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Leave Duration <span className="text-danger">*</span>
                    </label>
                    <Select
                      options={leaveDuration}
                      placeholder="Select"
                      styles={customStyles}
                    />
                    
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      From <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        selected={selectedDate1}
                        onChange={handleDateChange1}
                        className="form-control datetimepicker"
                        type="date"
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      To <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        selected={selectedDate2}
                        onChange={handleDateChange2}
                        className="form-control datetimepicker"
                        type="date"
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>

                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Time from <span className="text-danger">*</span>
                    </label>
                    <div className="">
                    <TimePicker label="Basic time picker" />
                    </div>
                  </div>

                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Time to <span className="text-danger">*</span>
                    </label>
                    <div className="">
                    <TimePicker label="Basic time picker" />
                    </div>
                  </div>

                  
                  {/* <div className="input-block mb-3">
                    <label className="col-form-label">
                      Number of days <span className="text-danger">*</span>
                    </label>
                    <input className="form-control" readOnly type="text" />
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Remaining Leaves <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      readOnly
                      defaultValue={12}
                      type="text"
                    />
                  </div> */}
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Leave Reason <span className="text-danger">*</span>
                    </label>
                    <textarea
                      rows={4}
                      className="form-control"
                      defaultValue={""}
                    />
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Incharge Person 1 :<span className="text-danger">*</span>
                    </label>
                    <Select
                      options={userPresent}
                      placeholder="Select"
                      styles={customStyles}
                    />
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                     Incharge Person 2 :<span className="text-danger">*</span>
                    </label>
                    <Select
                      options={userPresent}
                      placeholder="Select"
                      styles={customStyles}
                    />
                  </div>
                  <div className="submit-section">
                    <button
                      className="btn btn-primary submit-btn"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      type="reset"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  
        <div id="edit_leave" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Leave</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Leave Type <span className="text-danger">*</span>
                    </label>
                    <Select
                      options={leavetype}
                      placeholder="Select"
                      styles={customStyles}
                    />
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      From <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        selected={selectedDate2}
                        onChange={handleDateChange2}
                        className="form-control datetimepicker"
                        type="date"
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      To <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon">
                      <DatePicker
                        selected={selectedDate2}
                        onChange={handleDateChange2}
                        className="form-control datetimepicker"
                        type="date"
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Number of days <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      readOnly
                      type="text"
                      defaultValue={2}
                    />
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Remaining Leaves <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      readOnly
                      defaultValue={12}
                      type="text"
                    />
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">
                      Leave Reason <span className="text-danger">*</span>
                    </label>
                    <textarea
                      rows={4}
                      className="form-control"
                      defaultValue={"Going to hospital"}
                    />
                  </div>
                  <div className="submit-section">
                    <button
                      className="btn btn-primary submit-btn"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      type="reset"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default EmployeeLeaveModelPopup;
