import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Salary from "../../../../../assets/json/employeeSalary";
import { Table } from "antd";
import { Navigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import DatePicker from "react-datepicker";
import JwtTokenTimeExpire from "../../../../../cookieTimeOut/jwtTokenTime";
import useAuth from "../../../../../hooks/useAuth";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ConfirmationHODShowTable = (props) => {
  console.log(props);
  const data = Salary.Salary;
  console.log(props);
  const navigate = useNavigate();
  const [ddataFetched, setDdataFetched] = useState([]);
  const [empSap, empSapSet] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const { checkCookie } = useAuth();
  const [typeAction,setTypeAction] = useState();
  const [formData, setFormData] = useState({
    empSapNumer:"",
    empName:"",
    kostl:"",
    joiningDate:"",
    confirmDate:"",
    persk:"",
    hodName:"",
    hodRemark:"",
    zaction:"",
    hod_pernr:"",
    i1: "",
    i2: "",
    i3: "",
    i4: "",
    i5: "",
    i6: "",
    i7: "",
    i8: "",
    i9: "",
    i10: "",
    i11: "",
    i12: "",
    i13: "",
    i14: "",
    i15: "",
    i16: "",
    i17: "",
    i18: "",
    i19: "",
    i20: "",
    d1: "",
    d2: "",
    d3: "",
    d4: "",
    d5: "",
    d6: "",
    d7: "",
    d8: "",
    d9: "",
    d10: "",
    d11: "",
    d12: "",
    d13: "",
    d14: "",
    d15: "",
    d16: "",
  });

  const isCookieExist = checkCookie("accessToken");
  if (!isCookieExist.status) {
    navigate("/");
  }
  const selectoptions = [
    { label: "None", value: "" },
    { label: "Excellent", value: "A" },
    { label: "Good", value: "B" },
    { label: "Average", value: "C" },
    { label: "Poor", value: "D" },
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#00c5fb" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#00c5fb",
      },
    }),
  };
  const setColums = [
    {
      title: "Employee Sap Number",
      dataIndex: "pernr",
      sorter: (a, b) => a.pernr.length - b.pernr.length,
    },
    {
      title: "Reimbursement Number",
      dataIndex: "reinr",
      sorter: (a, b) => a.reinr.length - b.reinr.length,
    },
    {
      title: "Expense Type",
      dataIndex: "exp_type",
      sorter: (a, b) => a.exp_type.length - b.exp_type.length,
    },
    {
      title: "Description",
      dataIndex: "sptxt",
      sorter: (a, b) => a.sptxt.length - b.sptxt.length,
    },
    {
      title: "Received Amount",
      dataIndex: "rec_amount",
      sorter: (a, b) => a.rec_amount.length - b.rec_amount.length,
    },
    {
      title: "Received Currency",
      dataIndex: "rec_curr",
      sorter: (a, b) => a.rec_curr.length - b.rec_curr.length,
    },
    {
      title: "Receipt Date",
      dataIndex: "rec_date",
      sorter: (a, b) => a.rec_date.length - b.rec_date.length,
    },
    {
      title: "Tax Code",
      dataIndex: "tax_code",
      sorter: (a, b) => a.tax_code.length - b.tax_code.length,
    },
    {
      title: "From Date",
      dataIndex: "from_date1",
      sorter: (a, b) => a.from_date1.length - b.from_date1.length,
    },
    {
      title: "To Date",
      dataIndex: "to_date1",
      sorter: (a, b) => a.to_date1.length - b.to_date1.length,
    },
    {
      title: "Location Description",
      dataIndex: "descript",
      sorter: (a, b) => a.descript.length - b.descript.length,
    },
    {
      title: "Location",
      dataIndex: "location",
      sorter: (a, b) => a.location.length - b.location.length,
    },
    {
      title: "Region",
      dataIndex: "region",
      sorter: (a, b) => a.region.length - b.region.length,
    },
  ];

  const ShowTravelData = (props) => {
    console.log("Your data in showTable", props);
    const [sapNumber, tripNumber] = [props.pernr, props.reinr];
    console.log("Sap and trip number", sapNumber, tripNumber);
    const fetchData = async () => {
      const isCookie = checkCookie("accessToken");
      let value = isCookie.cookie.split("=").at(1);

      console.log("Printing values in useEffect", sapNumber, tripNumber);
      const url = `${process.env.REACT_APP_BASE_URL}/api/TravelExpense/showExpenseUsingSapAndCode?sapNumber=${sapNumber}&tripNumber=${tripNumber}`;
      console.log(url);
      fetch(url, {
        headers: { "Access-Control-Allow-Origin": "*", accesstoken: value },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status == false) {
            if (data.type == "Token Expired") {
              console.log("Line 305", data);
              // handleLogout();
              JwtTokenTimeExpire();
              navigate("/logout");
              return;
            }
          }
          console.log("Helo data", data.travel_data);
          setDdataFetched(data.travel_data);

          return data;
        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  };

  async function sendDataForConfimationTerminationDeletion (event,props){
    
    event.preventDefault();
   
    const cookieExists = checkCookie("accessToken");
    let cookieValue = cookieExists.cookie;
    cookieValue = cookieValue.split('=').at(1);


    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/admin/hod-confim-extend-terminate`,
      headers: {
        'accesstoken': cookieValue,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(formData)
    };

    axios.request(config)
      .then((response) => {
        if(response.status == 200){
          console.log(response);
          withReactContent(Swal).fire({
            title: response.data.message,
            confirmButtonText: "Ok",
            cancelButtonText: "No",
            showCancelButton: false,
            preConfirm: () => {
              // trigger parent component re-rendering
              
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  // For checing the values
  useEffect(() => {
    console.log(
      empSap,
      formData.i1,
      formData.i2,
      formData.i3,
      formData.i4,
      formData.i5,
      formData.i6,
      formData.i7,
      formData.i8,
      formData.i9,
      formData.i10,
      formData.i11,
      formData.i12,
      formData.i13,
      formData.i14,
      formData.i15,
      formData.i16,
      formData.i17,
      formData.i18,
      formData.i19,
      formData.i20,
      formData.d1,
      formData.d15
    );
  }, [
    empSap,
    formData.i1,
    formData.i2,
    formData.i3,
    formData.i4,
    formData.i5,
    formData.i6,
    formData.i7,
    formData.i8,
    formData.i9,
    formData.i10,
    formData.i11,
    formData.i12,
    formData.i13,
    formData.i14,
    formData.i15,
    formData.i16,
    formData.i17,
    formData.i18,
    formData.i19,
    formData.i20,
    formData.d1,
    formData.d15,
  ]);

  useEffect(()=>{
    setFormData(
      () => (
        {
          ...formData,
          empSapNumer:empSap.pernr,
          empName:empSap.ename,
          kostl:empSap.kostl,
          joiningDate:empSap.joini_date,
          confirmDate:empSap.confir_date,
          persk:empSap.persk,
          hodName:empSap.hod_name
        }
      )
    );
  },[empSap]);

  const [dataFetched, setDataFetched] = useState([]);
  const columns = [
    {
      title: "Show Expense",
      id: "pernr",
      render: (id) => (
        <button
          className="btn btn-sm btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#show_travel_data"
          onClick={() => ShowTravelData(id)}
        >
          Show Travel
        </button>
      ),
    },
    {
      title: "Status",
      dataIndex: "antrg_text",
      render: (text) => (
        <div className="dropdown action-label">
          <Link
            className="btn btn-white btn-sm btn-rounded "
            to="#"
            
            aria-expanded="false"
          >
            <i
              className={
                text === "Request Entered"
                  ? "far fa-dot-circle text-primary"
                  : text === "Trip Created"
                  ? "far fa-dot-circle text-primary"
                  : text === "Trip Completed"
                  ? "far fa-dot-circle text-info"
                  : text === "Trip Approved"
                  ? "far fa-dot-circle text-success"
                  : text === "Finance"
                  ? "far fa-dot-circle text-success"
                  : text === "Audit"
                  ? "far fa-dot-circle text-success"
                  : "far fa-dot-circle text-danger"
              }
            />{" "}
            {text}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Action",
      id: "pernr",
      render: (id) => (
        <div className="dropdown dropdown-action text-end">
          <Link
            to="#"
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <button
              className="dropdown-item "
              data-bs-toggle="modal"
              data-bs-target="#create"
              onClick={() => {
                setFormData(
                  () => (
                    {
                      ...formData,
                      zaction:"Confirmed",
                    }
                  )
                );
                empSapSet(id);
              }}
            >
              {" "}
              Confirmation
            </button>
            <button
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#create"
              onClick={() => {
                setFormData(
                  () => (
                    {
                      ...formData,
                      zaction:"Extend",
                    }
                  )
                );
                empSapSet(id);
              }}
            >
              {" "}
              Extend
            </button>
            <button
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target="#create"
              onClick={() => {
                setFormData(
                  () => (
                    {
                      ...formData,
                      zaction:"Terminated",
                    }
                  )
                );
                empSapSet(id);
              }}
            >
              {" "}
              Termination
            </button>
          </div>
        </div>
      ),
    },
    {
      title: "SAP ID",
      dataIndex: "pernr",
      sorter: (a, b) => a.reinr.length - b.reinr.length,
    },
    {
      title: "Employee Name",
      dataIndex: "ename",
      sorter: (a, b) => a.datv1.length - b.datv1.length,
    },
    {
      title: "Joining Date",
      dataIndex: "joini_date",
      sorter: (a, b) => a.datb1.length - b.datb1.length,
    },
    {
      title: "Confirm Due Date",
      dataIndex: "confir_date",
      sorter: (a, b) => a.zort1.length - b.zort1.length,
    },
    {
      title: "HOD Name",
      dataIndex: "hod_name",
      sorter: (a, b) => a.antrg_text.length - b.antrg_text.length,
    },
    {
      title: "HOD Remark",
      dataIndex: "hod_remark",
      sorter: (a, b) => a.trip_total.length - b.trip_total.length,
    },
    {
      title: "Designation",
      dataIndex: "depart",
      sorter: (a, b) => a.waers.length - b.waers.length,
    },
  ];
  const [setApi, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // const value = `${document.cookie}`;
      const value = checkCookie("accessToken").cookie.split("=").at(1);
      console.log(
        "Printing value at 478 for travelexpense data in local :: ",
        value
      );
      const url = `${process.env.REACT_APP_BASE_URL}/api/admin/employee-confirmation-listing-hod`;
      console.log(url);
      await fetch(url, {
        headers: { "Access-Control-Allow-Origin": "*", accesstoken: value },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status == false) {
            if (data.type == "Token Expired") {
              console.log("Line 305", data);
              // handleLogout();
              JwtTokenTimeExpire();
              navigate("/logout");
              return;
            }
          }
          console.log("Printing travel data in data.travel_data :: ", data);
          setDataFetched(data.data.data);
          setApiData(data.data.data);
          return data;
        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  }, []);

  //New search implemented start
  const formatDateForComparison = (date) => {
    const d = new Date(date);
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2); // Months are zero-indexed
    const year = d.getFullYear();
    return `${year}${month}${day}`;
  };
  const convertJsonDateForComparison = (jsonDate) => {
    const [day, month, year] = jsonDate.split(".");
    return `${year}${month}${day}`;
  };

  // Unified search handler
  const handleSearch = () => {
    let results = setApi;
    // Filter by search term
    if (searchTerm) {
      results = results.filter((f) =>
        f.reinr.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFrom) {
      const formattedDate = formatDateForComparison(dateFrom);
      console.log("Formatted Date for Comparison:", formattedDate);
      results = results.filter((f) => {
        const startDate = convertJsonDateForComparison(f.datb1);
        console.log(startDate);
        console.log(formattedDate);
        return startDate >= formattedDate;
      });
    }

    if (dateTo) {
      const formattedDate = formatDateForComparison(dateTo);
      console.log("Formatted Date for Comparison:", formattedDate);
      results = results.filter((f) => {
        const endDate = convertJsonDateForComparison(f.datb1);
        return endDate <= formattedDate;
      });
    }

    setDataFetched(results);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, dateFrom, dateTo]);
  //New search implemented ends here
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  return (
    <>
      <div className="row">
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3">
            <div className="input-block form-focus select-focus">
              <input
                type="text"
                placeholder="search here ..."
                className="form-control"
                onChange={(e) => {
                  // handleFilter(e.target.value);
                  setSearchTerm(e.target.value);
                }}
              ></input>
              <label className="focus-label">Trip number</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="input-block  form-focus focused">
              <div className="cal-icon focused ">
                <DatePicker
                  className="form-control floating datetimepicker"
                  selected={start}
                  // onChange={handleDateChange}
                  onChange={(e) => {
                    setStart(e);
                    // handleDateFilterFrom(e);
                    setDateFrom(e);
                  }}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <label className="focus-label">From</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="input-block  form-focus focused">
              <div className="cal-icon focused ">
                <DatePicker
                  className="form-control floating datetimepicker"
                  selected={end}
                  onChange={(e) => {
                    setEnd(e);

                    setDateTo(e);
                  }}
                  dateFormat="dd-MM-yyyy"
                />
              </div>
              <label className="focus-label">To</label>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="table-responsive">
            <Table
              className="table-striped"
              style={{ overflowX: "auto" }}
              columns={columns}
              dataSource={dataFetched}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>
      <div
        id="show_travel_data"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Show Travel Data</h5>
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
              {
                <Table
                  className="table-striped"
                  style={{ overflowX: "auto" }}
                  columns={setColums}
                  dataSource={ddataFetched.data}
                  rowKey={(record) => record.id}
                />
              }
            </div>
          </div>
        </div>
      </div>

      {/* Pop up for trip create start*/}
      <div className="modal custom-modal fade" id="create" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered "
          style={{ maxWidth: "1000px" }}
        >
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>{formData.zaction=="Confirmed"?"Confirmation":(formData.zaction=="Extend"?"Extention":"Termination")}</h3>
                <p>Employee Name : {empSap.ename}</p>
                <p>Sap Number : {empSap.pernr}</p>
              </div>
              <div className="modal-btn delete-action">
              <div className="row">
                  <div className="input-block mb-3 row">
                    HOD Remark
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="Type Here"
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              hodRemark: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-block mb-3 row">
                    Areas in which the employee was given an exposure
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="Type Here"
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i1: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                {/* <div className="row">
                  <div className="input-block mb-3 row">
                    Outcoming Text
                    <input
                      type="text"
                      className="form-control"
                      placeholder="type your outcome"
                      required
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i2: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div> */}
                <div className="row">
                  <div className="input-block mb-3 row">
                    Special / significant task undertaken by him (min 1 entry is
                    required) :*
                  </div>

                  <input
                    type="text"
                    className="input-block mb-3 col-sm-6"
                    placeholder="Task/Job/Assignment*"
                    required
                    onChange={(event) => {
                      setFormData(
                        () => (
                          console.log(event.target.value),
                          {
                            ...formData,
                            i3: event.target.value,
                          }
                        )
                      );
                    }}
                  />
                  <input
                    type="text"
                    className="input-block mb-3 col-sm-6"
                    placeholder="Remarks by the next superior*"
                    required
                    onChange={(event) => {
                      setFormData(
                        () => (
                          console.log(event.target.value),
                          {
                            ...formData,
                            i4: event.target.value,
                          }
                        )
                      );
                    }}
                  />
                  <input
                    type="text"
                    className="input-block mb-3 col-sm-6"
                    placeholder="Task/Job/Assignment*"
                    required
                    onChange={(event) => {
                      setFormData(
                        () => (
                          console.log(event.target.value),
                          {
                            ...formData,
                            i5: event.target.value,
                          }
                        )
                      );
                    }}
                  />
                  <input
                    type="text"
                    className="input-block mb-3 col-sm-6"
                    placeholder="Remarks by the next superior*"
                    required
                    onChange={(event) => {
                      setFormData(
                        () => (
                          console.log(event.target.value),
                          {
                            ...formData,
                            i6: event.target.value,
                          }
                        )
                      );
                    }}
                  />
                  <input
                    type="text"
                    className="input-block mb-3 col-sm-6"
                    placeholder="Task/Job/Assignment*"
                    required
                    onChange={(event) => {
                      setFormData(
                        () => (
                          console.log(event.target.value),
                          {
                            ...formData,
                            i7: event.target.value,
                          }
                        )
                      );
                    }}
                  />
                  <input
                    type="text"
                    className="input-block mb-3 col-sm-6"
                    placeholder="Remarks by the next superior*"
                    required
                    onChange={(event) => {
                      setFormData(
                        () => (
                          console.log(event.target.value),
                          {
                            ...formData,
                            i8: event.target.value,
                          }
                        )
                      );
                    }}
                  />
                  <input
                    type="text"
                    className="input-block mb-3 col-sm-6"
                    placeholder="Task/Job/Assignment*"
                    required
                    onChange={(event) => {
                      setFormData(
                        () => (
                          console.log(event.target.value),
                          {
                            ...formData,
                            i9: event.target.value,
                          }
                        )
                      );
                    }}
                  />
                  <input
                    type="text"
                    className="input-block mb-3 col-sm-6"
                    placeholder="Remarks by the next superior*"
                    required
                    onChange={(event) => {
                      setFormData(
                        () => (
                          console.log(event.target.value),
                          {
                            ...formData,
                            i10: event.target.value,
                          }
                        )
                      );
                    }}
                  />
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="bg-white">
                      <table className="table">
                        <thead>
                          <tr>
                            <th colSpan={2}>Factors</th>
                            <th colSpan={2}>Description of Factor</th>
                            <th>Select Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={2}>Job Knowledge*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Knows and understands all aspects of present
                              position.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d1: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Planning*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Sets up objectives and course of action, develops
                              and organizes projects.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d2: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Quality*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Performs work accurately and thoroughly adheres to
                              standards & policies cost consciousness.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d3: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Initiative & Creativity*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Takes initiative & meets dealings, imagination and
                              develops new ideas and methods.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d4: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Cost Consciousness*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Considers efforts made in the cost of major items
                              and takes timely action to check costs whenever
                              necessary.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d5: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Communication*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Expresses with clarity of thought, both written
                              and spoken.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d6: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Judgement*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Fair & objective in his judgement.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d7: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Organising ability*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Resourceful, can organize and control problems
                              effectively.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d8: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Dependability*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Fulfills obligations to the company and position.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d9: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Ability in Making Decision*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Takes an overall view and has the ability to take
                              timely and correct decisions with confidence.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d10: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Employee Relation*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Fair & equitable to all, able to build and
                              maintain team spirit.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d11: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Delegation*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Assigns work in relation to the capacity of his
                              subordinates, never overloads himself with work
                              that could be delegated.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d12: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Training*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Effectively guides, trains, and counsels
                              subordinates.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d13: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Leadership*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Directs personnel effectively to accomplish plans,
                              projects, and attain established goals.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d14: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Discipline*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Maintains a high level of self-discipline.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d15: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={2}>Habits*</td>
                            <td
                              colSpan={2}
                              style={{
                                whiteSpace: "normal",
                                wordWrap: "break-word",
                                maxWidth: "300px",
                              }}
                            >
                              Neatness, systematic approach, punctuality, and
                              attendance.
                            </td>
                            <td>
                              <Select
                                options={selectoptions}
                                placeholder="None"
                                styles={customStyles}
                                onChange={(selectedOption) => {
                                  setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    d16: selectedOption
                                      ? selectedOption.value
                                      : "",
                                  }));
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="input-block mb-3 row">
                    Please brief about his/her execution skills ( of the work
                    allotted):*
                    <input
                      type="text"
                      className="form-control"
                      placeholder="type your outcome"
                      required
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i11: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-block mb-3 row">
                    Please brief about his/her interpersonal skills*
                    <input
                      type="text"
                      className="form-control"
                      placeholder="type your outcome"
                      required
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i12: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-block mb-3 row">
                    Please brief about his upward and downward communication :*
                    <input
                      type="text"
                      className="form-control"
                      placeholder="type your outcome"
                      required
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i13: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-block mb-3 row">
                    Please brief about his/her Function Skills (Knowledge of
                    machine, equipment, SOP):*
                    <input
                      type="text"
                      className="form-control"
                      placeholder="type your outcome"
                      required
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i14: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-block mb-3 row">
                    Is he/she adaptive to various situation/work pressure/new
                    processes/new people?:*
                    <input
                      type="text"
                      className="form-control"
                      placeholder="type your outcome"
                      required
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i15: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-block mb-3 row">
                    Is he/she able to obtain desirable results? Please brief :*
                    <input
                      type="text"
                      className="form-control"
                      placeholder="type your outcome"
                      required
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i16: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-block mb-3 row">
                    Additional comments if any(What significant contribution to
                    the company has he/she made during the last six months).*
                    <input
                      type="text"
                      className="form-control"
                      placeholder="type your outcome"
                      required
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i17: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-block mb-3 row">
                    Can the assesses be confirmed.*
                    <input
                      type="text"
                      className="form-control"
                      placeholder="type your outcome"
                      required
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i18: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-block mb-3 row">
                    Does he require additional training and suggest areas for
                    improvement and development.*
                    <input
                      type="text"
                      className="form-control"
                      placeholder="type your outcome"
                      required
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i19: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-block mb-3 row">
                  Not performing satisfactorily, suggest action to take (Like extension of probation period / termination).*
                    <input
                      type="text"
                      className="form-control"
                      placeholder="type your outcome"
                      required
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              i20: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <button
                      className="btn btn-primary continue-btn"
                      onClick={(event) => {
                        sendDataForConfimationTerminationDeletion(event,empSap);
                      }}
                    >
                      Confirmation
                    </button>
                  </div>
                  <div className="col-6">
                    <Link
                      to="#"
                      data-bs-dismiss="modal"
                      className="btn btn-primary cancel-btn"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationHODShowTable;
