import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const AllEmployeeAddPopup = (props) => {
  // console.log("In attendance",props.data);
    const [startDate, setStartDate] = useState(null);
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    SapNumber : props.data,
    status : "",
    date :"",
    remark : ""
  })

 
  async function sendData(e){
    e.preventDefault();
    // console.log("In send Data")
    console.log(JSON.stringify(formData));
    const value = `${document.cookie}`;
    console.log(value)
    const url = `http://localhost:3000/api/DailyAttendance/employeeDailyAttendnceCorrectionStatus?value=${value}`;
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Access-Control-Allow-Headers',
            'Access-Control-Allow-Methods': 'POST',
        },
        body: JSON.stringify(formData)
    }).then((response)=>{

      response.json().then(body => {console.log(body)
        Toastify({
          text: body.message,
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
     
      })
      // console.log(response)
      // return response.json();
    }); 
  }
  const [selectedDate1, setSelectedDate1] = useState(null);
  const employee = [
    { value: 1, label: "Select Department" },
    { value: 2, label: "Web Development" },
    { value: 3, label: "IT Management" },
    { value: 4, label: "Marketing" },
  ];
  const designation = [
    { value: 1, label: "Web Developer" },
    { value: 2, label: "Web Designer" },
    { value: 3, label: "Ios Developer" },
    { value: 4, label: "Marketing" },
  ];
  const companies = [
    { value: 1, label: "Present" },
    { value: 2, label: "First Half Present" },
    { value: 3, label: "Second Half Present" }
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
  var dataFetchedThroughApi=null;
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

    // var fetchData = async ()=>{
    // const value = `${document.cookie}`;
    //     console.log(value)
        
    //     const url = `http://localhost:3000/api/DailyAttendance/employeeDailyAttendnceCorrectionStatus?value=${value}`;
    //     console.log(url);
        
    //     dataFetchedThroughApi = await fetch
    //     (url).then((response)=>{
    //       return response.json();
    //     }).then((data) => {
    //     //   setData(data.employeeAttendance);
    //       return data;
    //     }).catch((error)=>{
    //       console.log("Error");
    //     });
    // }
    // fetchData();
  },[]);

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };
  // const onChangeFunctionSapNumberArea = ()=>{
  //   // console.log("Your are inside event function",event.target.value);
  //   setFormData(()=>({
  //       ...formData,
  //       SapNumber : props.data
  //   }))
  // };
  const onChangeFunctionReasonArea = (event)=>{
    console.log("Your are inside event function",event.target.value);
    setFormData(()=>({
        ...formData,
        remark : event.target.value
    }))
  };
  return (
    <>
      <div id="add_employee_attendance_correction" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Attendance Correction</h5>
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
            <form onSubmit={sendData}>
                <div className="row">
                  <div className="">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Sap Number <span className="text-danger">*</span>
                      </label>
                      <input
                      className="form-control" 
                      name = "sapNumber"
                      // onLoad={onChangeFunctionSapNumberArea}
                      value = {props.data}
                      disabled
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Correction Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={startDate}
                        //   onChange={handleDateChange1}
                          className="form-control floating datetimepicker"
                          type="date"
                          dateFormat="dd-MM-yyyy"
                        onChange={(date) =>{setFormData(()=>({
                            ...formData,
                            date: format(date, 'yyyyMMdd')
                          }))
                          setStartDate(date)
                        }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Phone </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div> */}
                  <div className="">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Type of attendance correction</label>
                      <Select
                        options={companies}
                        placeholder="Select"
                        styles={customStyles}
                        onChange={(data) =>{setFormData(()=>(
                           {
                            ...formData,
                            status : data.label
                          }))
                        }}
                      />
                    </div>
                  </div>

                  <div className="">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Reason</label>
                      <textarea 
                      className="form-control" 
                      type="text" 
                      onChange={onChangeFunctionReasonArea}
                      />
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Department <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={employee}
                        placeholder="Select"
                        styles={customStyles}
                      />
                    </div>
                  </div> */}
                  {/* <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Designation <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={designation}
                        placeholder="Select"
                        styles={customStyles}
                      />
                    </div>
                  </div> */}
                </div>
                {/* <div className="table-responsive m-t-15">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Module Permission</th>
                        <th className="text-center">Read</th>
                        <th className="text-center">Write</th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Import</th>
                        <th className="text-center">Export</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Holidays</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Leaves</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Clients</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Projects</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Tasks</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Chats</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Assets</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Timing Sheets</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div id="edit_employee" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Employee</h5>
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
                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        defaultValue="John"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Last Name</label>
                      <input
                        className="form-control"
                        defaultValue="Doe"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        defaultValue="johndoe"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        defaultValue="johndoe@example.com"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Password</label>
                      <input
                        className="form-control"
                        defaultValue="johndoe"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Confirm Password</label>
                      <input
                        className="form-control"
                        defaultValue="johndoe"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Employee ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        defaultValue="FT-0001"
                        readOnly=""
                        className="form-control floating"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Joining Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={selectedDate1}
                          onChange={handleDateChange1}
                          className="form-control floating datetimepicker"
                          type="date"
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Phone </label>
                      <input
                        className="form-control"
                        defaultValue={9876543210}
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Type of Leave Correction</label>
                      <Select
                        options={companies}
                        placeholder="Select"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Department <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={employee}
                        placeholder="Select"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Designation <span className="text-danger">*</span>
                      </label>
                      <Select
                        options={designation}
                        placeholder="Select"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                </div>
                <div className="table-responsive m-t-15">
                  <table className="table table-striped custom-table">
                    <thead>
                      <tr>
                        <th>Module Permission</th>
                        <th className="text-center">Read</th>
                        <th className="text-center">Write</th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Import</th>
                        <th className="text-center">Export</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Holidays</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Leaves</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Clients</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Projects</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Tasks</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Chats</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Assets</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <td>Timing Meri wali Sheets</td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input type="checkbox" defaultChecked="true" />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                        <td className="text-center">
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="rememberme"
                              className="rememberme"
                            />
                            <span className="checkmark" />
                          </label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default AllEmployeeAddPopup;
