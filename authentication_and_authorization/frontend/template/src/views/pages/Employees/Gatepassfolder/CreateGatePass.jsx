import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { TimePicker } from "antd";
import { format } from "date-fns";
import useAuth from "../../../../hooks/useAuth";

const CreateGatePass = () => {
  const [setSelectedOption] = useState(null);
  const [setselectTwo] = useState(null);
  const { checkCookie } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gatePassType: "",
    requestType: "",
    LeaveFrom: "",
    date: "",
    time: "",
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
    console.log(cookieExists.cookie);
    
  }

  useEffect(() => {
    console.log(formData.time);
    console.log(formData.date);
    console.log(formData.purpose);
    console.log(formData.requestType);
    console.log(formData.place);
    console.log(formData.gatePassType);
    console.log(formData.handoverPerson);
  }, [
    formData.time,
    formData.date,
    formData.purpose,
    formData.requestType,
    formData.handoverPerson,
    formData.place,
    formData.gatePassType,
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
                        options={gatePassTypeoptions}
                        styles={customStyles}
                        className="select"
                        required
                        onChange={(event) => {
                          console.log(event.label);
                          setFormData(() => ({
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
                                      )}:${padWithMonth(event.$M)}:${event.$y}`,
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
                  <div className="col-sm-12">
                    <div className="show-fixed-amount">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="input-block mb-3">
                            <label className="col-form-label">Purpose</label>
                            <input
                              className="form-control"
                              type="text"
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
