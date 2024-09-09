import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { TimePicker } from "antd";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const EmployeeLeaveModelPopup = (props) => {
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);
  const form = useForm();
  const { leaveName } = form;
  const [formData, setFormData] = useState({
    SapNumber: "",
    LeaveType: "",
    LeaveDuration: "",
    LeaveFrom: "",
    LeaveTo: "",
    TimeFrom: "",
    TimeTo: "",
    LeaveReason: "",
    LeaveCharge1: "",
    LeaveCharge2: "",
  });
  const onChangeFunction = (event) => {
    console.log("Your are inside event function", event);
    setFormData(() => ({
      ...formData,
      [event.value]: event.label,
    }));
  };

  const onChangeFunctionTimeFrom = (event) => {
    console.log("Your are inside event function", event);
    const padWithZero = (num) => (num < 10 ? `0${num}` : `${num}`);
    setFormData(() => ({
      ...formData,

      TimeFrom: `${padWithZero(event.$H)}:${padWithZero(
        event.$m
      )}:${padWithZero(event.$s)}`,
    }));
  };
  const onChangeFunctionTimeTo = (event) => {
    console.log("Your are inside event function", event);
    const padWithZero = (num) => (num < 10 ? `0${num}` : `${num}`);
    setFormData(() => ({
      ...formData,
      TimeTo: `${padWithZero(event.$H)}:${padWithZero(event.$m)}:${padWithZero(
        event.$s
      )}`,
    }));
  };

  const onChangeFunctionLeaveFrom = (event) => {
    console.log("Your are inside event function", event);
    setFormData(() => ({
      ...formData,
      TimeFrom: event.$H + event.$m + event.$s,
    }));
  };
  const onChangeFunctionLeaveTo = (event) => {
    console.log("Your are inside event function", event);
    setFormData(() => ({
      ...formData,
      TimeTo: event.$H + ":" + event.$m + ":" + event.$s,
    }));
  };
  const onChangeFunctionTextArea = (event) => {
    console.log("Your are inside event function", event);
    setFormData(() => ({
      ...formData,
      LeaveReason: event.target.value,
    }));
  };
  const onChangeFunctionCharge1 = (event) => {
    console.log("Your are inside event function", event);
    setFormData(() => ({
      ...formData,
      LeaveCharge1: event.label,
    }));
  };

  const onChangeFunctionCharge2 = (event) => {
    console.log("Your are inside event function", event);
    setFormData(() => ({
      ...formData,
      LeaveCharge2: event.label,
    }));
  };

  var dataToBeSent = {};
  // Form Data entry

  const { data1, data2 } = props;
  console.log(data1);
  console.log(data2);
  // console.log(data)
  const navigate = useNavigate();
  var sapNumber;

  // console.log(formData.leaveType)

  async function sendData(e) {
    e.preventDefault();
    console.log("In send Data");
    console.log(JSON.stringify(formData));
    const value = `${document.cookie}`;
    console.log(value);
    const url = `${process.env.REACT_APP_BASE_URL}/api/employee/employeeAttendanceApply?value=${value}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, Access-Control-Allow-Headers",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      // console.log(response);
      response.json().then((body) => {
        console.log(body);
        // alert(body.message);
        // Toastify({
        //   text: body.message,
        //   duration: 3000,
        //   close: true,
        //   gravity: "top", // `top` or `bottom`
        //   position: "center", // `left`, `center` or `right`
        //   backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        // }).showToast();
        withReactContent(Swal).fire({
          title: body.message,
          preConfirm: () => {
            navigate("/leaves-employee");
          },
        });
        //   toast(body.message, {
        //     position: toast.POSITION.TOP_LEFT,
        // });
      });
      // console.log(JSON.stringify(response));

      return;
      // return response.json();
    });
  }

  const leavetype = [
    { value: "LeaveType", label: "Select Leave Type" },
    { value: "LeaveType", label: "EARNED" },
    { value: "LeaveType", label: "CASUAL" },
    { value: "LeaveType", label: "MEDICAL" },
    { value: "LeaveType", label: "WEDDING" },
    { value: "LeaveType", label: "PATERNITY" },
    { value: "LeaveType", label: "MATERNITY" },
    { value: "LeaveType", label: "WITHOUT PAY" },
    { value: "LeaveType", label: "OPTIONAL" },
  ];

  const leaveDuration = [
    { value: "LeaveDuration", label: "Select Leave Duration" },
    { value: "LeaveDuration", label: "Full Day or More" },
    { value: "LeaveDuration", label: "Half Day" },
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

  //Checking for wheter cooie is existing or not
  function checkCookie(cookieName) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + "=")) {
        console.log("You are in cookiee testing area", cookie);
        return true;
      }
    }
    return false;
  }
  useEffect(() => {
    let cookieExists = checkCookie("accessToken");
    if (!cookieExists) {
      navigate("react/template/");
    }

    const fetchSapNumber = async () => {
      // const url = `http://localhost:3000/api/auth/home?value=${value}`;
      const value = `${document.cookie}`;
      console.log(value);
      const url = `${process.env.REACT_APP_BASE_URL}/api/employee/employeeSapNumber?value=${value}`;
      console.log(url);

      sapNumber = await fetch(url, {
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setFormData(() => ({
            ...formData,
            SapNumber: data,
          }));

          return data;
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(sapNumber);
      dataToBeSent.sapNumber = sapNumber;
    };
    fetchSapNumber();
  }, []);

  console.log(data1[0].leaveType);
  dataToBeSent.sapNumber = sapNumber;
  console.log(sapNumber);
  console.log(data2);
  var counter = 1;

  const userPresent = data2.map((index, item) => {
    const container = {};
    container.value = counter;
    container.label = index.ename;

    return container;
  });

  console.log(userPresent);

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
              <form onSubmit={sendData}>
                {/* <form> */}
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Leave Type <span className="text-danger">*</span>
                  </label>
                  <Select
                    options={leavetype}
                    placeholder="Select"
                    styles={customStyles}
                    name="LeaveType"
                    onChange={onChangeFunction}
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
                    name="LeaveDuration"
                    onChange={onChangeFunction}
                  />
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    From <span className="text-danger">*</span>
                  </label>
                  <div className="cal-icon">
                    <DatePicker
                      className="form-control datetimepicker"
                      selected={startDate}
                      onChange={(date) => {
                        setFormData(() => ({
                          ...formData,
                          LeaveFrom: format(date, "dd/MM/yyyy"),
                        }));
                        setStartDate(date);
                      }}
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
                      className="form-control datetimepicker"
                      selected={EndDate}
                      onChange={(date) => {
                        setFormData(() => ({
                          ...formData,
                          LeaveTo: format(date, "dd/MM/yyyy"),
                        }));
                        setEndDate(date);
                      }}
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
                    <TimePicker
                      placeholder="Select"
                      styles={customStyles}
                      onChange={onChangeFunctionTimeFrom}
                    />
                  </div>
                </div>

                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Time to <span className="text-danger">*</span>
                  </label>
                  <div className="">
                    <TimePicker
                      placeholder="Select"
                      styles={customStyles}
                      onChange={onChangeFunctionTimeTo}
                    />
                  </div>
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Leave Reason <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="LeaveReason"
                    onChange={onChangeFunctionTextArea}
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
                    name="LeaveCharge1"
                    onChange={onChangeFunctionCharge1}
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
                    name="LeaveCharge2"
                    onChange={onChangeFunctionCharge2}
                  />
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
                    // onClick={()=> {
                    //   sendData()}}
                  >
                    Submit
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
