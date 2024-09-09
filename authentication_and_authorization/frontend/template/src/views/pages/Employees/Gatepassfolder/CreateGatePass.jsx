import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { TimePicker } from "antd";
import { format } from "date-fns";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dayjs from 'dayjs'

const CreateGatePass = (props) => {
  const [setSelectedOption] = useState(null);
  const [setselectTwo] = useState(null);
  const [isReturnable, setIsReturnable] = useState(false);
  const { checkCookie } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gatePassType: "",
    requestType: "",
    date: "",
    time: "",
    expComeBackDate: "",
    expComeBackTime: "",
    purpose: "",
    handoverPerson: "",
    place: "",
  });
  const gatePassTypeoptions = [
    { value: "", label: "Select" },
    { value: "Returnable", label: "Returnable" },
    { value: "NonReturnable", label: "Non-Returnable" },
  ];

  const requestTypeoptions = [
    { value: "", label: "Select" },
    { value: "Personal", label: "Personal" },
    { value: "Official", label: "Official" },
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
  useEffect(() => {
    let cookieExists = checkCookie("accessToken");
    console.log(cookieExists);
    if (!cookieExists.status) {

      navigate("/");
    }
  });

  async function submitFormDataForGatePassCreation(event) {
    event.preventDefault();
    //Fetching data for attendance
    const cookieExists = checkCookie("accessToken");
    let cookieValue = cookieExists.cookie;
    cookieValue = cookieValue.split('=').at(1);


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/employee/gate-pass-creation`,
      headers: {
        'accesstoken': cookieValue,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(formData)
    };

    axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        if(response.status == 200){
          withReactContent(Swal).fire({
            title: response.data.text,
            confirmButtonText: "Ok",
            cancelButtonText: "No",
            showCancelButton: false,
            preConfirm: () => {
              // trigger parent component re-rendering
              props.stateChange();
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // clear the form 
    setFormData({
      gatePassType: "",
      requestType: "",
      date: "",
      time: "",
      expComeBackDate: "",
      expComeBackTime: "",
      purpose: "",
      handoverPerson: "",
      place: "",
    });


  }

  useEffect(() => {
    console.log(JSON.stringify(formData))
  }, [
    formData
  ]);
  return (
    <>
      <div
        id="create_gate_pass"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Gate Pass</h5>
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
              <form onSubmit={submitFormDataForGatePassCreation}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Gate Pass Type</label>

                      <Select
                        placeholder=""
                        // onChange={setSelectedOption}
                        value={gatePassTypeoptions.find(option => option.label === formData.gatePassType) || gatePassTypeoptions[0]}
                        options={gatePassTypeoptions}
                        styles={customStyles}
                        className="select"
                        required
                        onChange={(event) => {
                          event.label === 'Returnable' ? setIsReturnable(true) : setIsReturnable(false);
                          setFormData(() =>
                          ({
                            ...formData,
                            gatePassType: event.label,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Request Type</label>

                      <Select
                        placeholder=""
                        // onChange={setselectTwo}
                        value={requestTypeoptions.find(option => option.label === formData.requestType) || requestTypeoptions[0]}
                        options={requestTypeoptions}
                        className="select"
                        styles={customStyles}
                        required
                        onChange={(event) => {
                          console.log(event.label);
                          setFormData(() => ({
                            ...formData,
                            requestType: event.label,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="show-fixed-amount">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="input-block mb-3">
                            <label className="focus-label">Select Date</label>
                            <div className="input-block  form-focus focused">
                              <div className="cal-icon focused ">
                                <DatePicker
                                  className="form-control floating datetimepicker"
                                  value={formData.date ? dayjs(formData.date, "DD/MM/YYYY") : null}
                                  dateFormat="dd-MM-yyyy"
                                  onChange={(event) => {
                                    console.log(event);
                                    // setFormData(() => ({
                                    //   ...formData,
                                    //   LeaveFrom: format(date, "dd/MM/yyyy"),
                                    // }));
                                    const padWithZeroDate = (num) =>
                                      num < 10 ? `0${num}` : `${num}`;
                                    const padWithMonth = (num) =>
                                      num < 9 ? `0${num + 1}` : `${num + 1}`;
                                    setFormData(() => ({
                                      ...formData,
                                      date: `${padWithZeroDate(
                                        event.$D
                                      )}/${padWithMonth(event.$M)}/${event.$y}`,
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="show-fixed-amount">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="input-block mb-12">
                            <label className="focus-label">Select Time</label>
                            <div className="form-focus focused">
                              <div className="">
                                <TimePicker
                                  placeholder="Select"
                                  styles={customStyles}
                                  value={formData.time ? dayjs(formData.time, "HH:mm:ss") : null}
                                  onChange={(event) => {
                                    console.log(event);
                                    const padWithZero = (num) =>
                                      num < 10 ? `0${num}` : `${num}`;
                                    setFormData(() => ({
                                      ...formData,
                                      time: `${padWithZero(
                                        event.$H
                                      )}:${padWithZero(event.$m)}:${padWithZero(
                                        event.$s
                                      )}`,
                                    }));
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isReturnable &&
                    <div className="col-sm-12">
                      <div className="show-fixed-amount">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="input-block mb-3">
                              <label className="focus-label">Expected Comeback Date</label>
                              <div className="input-block  form-focus focused">
                                <div className="cal-icon focused ">
                                  <DatePicker
                                    className="form-control floating datetimepicker"
                                    value={formData.expComeBackDate ? dayjs(formData.expComeBackDate, "DD/MM/YYYY") : null}
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(event) => {
                                      console.log(event);
                                      const padWithZeroDate = (num) =>
                                        num < 10 ? `0${num}` : `${num}`;
                                      const padWithMonth = (num) =>
                                        num < 9 ? `0${num + 1}` : `${num + 1}`;
                                      setFormData(() => ({
                                        ...formData,
                                        expComeBackDate: `${padWithZeroDate(
                                          event.$D
                                        )}/${padWithMonth(event.$M)}/${event.$y}`,
                                      }));
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="input-block mb-12">
                              <label className="focus-label">Expected Time</label>
                              <div className="form-focus focused">
                                <div className="">
                                  <TimePicker
                                    placeholder="Select"
                                    value={formData.expComeBackTime ? dayjs(formData.expComeBackTime, "HH:mm:ss") : null}
                                    styles={customStyles}
                                    onChange={(event) => {
                                      console.log(event);
                                      const padWithZero = (num) =>
                                        num < 10 ? `0${num}` : `${num}`;
                                      setFormData(() => ({
                                        ...formData,
                                        expComeBackTime: `${padWithZero(
                                          event.$H
                                        )}:${padWithZero(event.$m)}:${padWithZero(
                                          event.$s
                                        )}`,
                                      }));
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  <div className="col-sm-12">
                    <div className="show-fixed-amount">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Purpose</label>
                            <input
                              className="form-control"
                              type="text"
                              value={formData.purpose}
                              required
                              onChange={(event) => {
                                console.log(event.target.value);
                                setFormData(() => ({
                                  ...formData,
                                  purpose: event.target.value,
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="show-fixed-amount">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Handover Person's SAP number
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={formData.handoverPerson}
                              required
                              onChange={(event) => {
                                console.log(event.target.value);
                                setFormData(() => ({
                                  ...formData,
                                  handoverPerson: event.target.value,
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="show-fixed-amount">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">
                              Place To Visit
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={formData.place}
                              required
                              onChange={(event) => {
                                console.log(event.target.value);
                                setFormData(() => ({
                                  ...formData,
                                  place: event.target.value,
                                }));
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="submit"
                  // onSubmit={(event)=>{
                  //   event.preventDefault();
                  //   submitFormDataForGatePassCreation();
                  // }}
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

export default CreateGatePass;
