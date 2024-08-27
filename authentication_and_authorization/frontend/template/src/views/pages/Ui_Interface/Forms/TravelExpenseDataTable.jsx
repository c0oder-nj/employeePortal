import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Salary from "../../../../assets/json/employeeSalary";
import { Table } from "antd";
import { Navigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import DatePicker from "react-datepicker";
import JwtTokenTimeExpire from "../../../../cookieTimeOut/jwtTokenTime";
// import Breadcrumbs from "../../../../components/Breadcrumbs";
// import EditSalaryModal from "../../../../components/modelpopup/EditSalaryModal";
// import DeleteModal from "../../../../components/modelpopup/deletePopup";
// import ShowTravelData from "../../../../components/modelpopup/ShowTravelData";

const TravelExpenseDataTable = (props) => {
  console.log(props);
  const data = Salary.Salary;
  console.log(props);
  const navigate = useNavigate();
  const [ddataFetched, setDdataFetched] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [setDelete, setDeleteData] = useState([]);
  const [createTrip, setCreateTrip] = useState([]);
  //New Search implementation state start
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  // const [filteredData, setFilteredData] = useState(initialData);
  // New Search implementation state End
  const [formData, setFormData] = useState({
    purposeText: "",
    outComingText: "",
  });
  const setColums = [
    // {
    //     title: "Sap Number",
    //     dataIndex: "pernr",
    //     sorter: (a, b) => a.employeeId.length - b.employeeId.length,
    // },
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

    // {
    //   title: "Receipt Number",
    //   dataIndex: "receiptno",
    //   sorter: (a, b) => a.receiptno.length - b.receiptno.length,
    // },
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
    // {
    //   title: "Local Amount",
    //   dataIndex: "loc_amount",
    //   sorter: (a, b) => a.loc_amount.length - b.loc_amount.length,
    // },
    // {
    //   title: "Local Currency",
    //   dataIndex: "loc_curr",
    //   sorter: (a, b) => a.loc_curr.length - b.loc_curr.length,
    // },
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
    // {
    //   title: "From Date (Old Format)",
    //   dataIndex: "from_date",
    //   sorter: (a, b) => a.from_date.length - b.from_date.length,
    // },
    // {
    //   title: "To Date (Old Format)",
    //   dataIndex: "to_date",
    //   sorter: (a, b) => a.to_date.length - b.to_date.length,
    // },
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
    // {
    //   title: "Document Number",
    //   dataIndex: "p_doc",
    //   sorter: (a, b) => a.p_doc.length - b.p_doc.length,
    // },
    {
      title: "Region",
      dataIndex: "region",
      sorter: (a, b) => a.region.length - b.region.length,
    },
    // {
    //   title: "Manager Remark",
    //   dataIndex: "rm_remark",
    //   sorter: (a, b) => a.rm_remark.length - b.rm_remark.length,
    // },
    // {
    //   title: "Head of Department Remark",
    //   dataIndex: "hod_remark",
    //   sorter: (a, b) => a.hod_remark.length - b.hod_remark.length,
    // },
    // {
    //   title: "Financial Remark",
    //   dataIndex: "fi_remark",
    //   sorter: (a, b) => a.fi_remark.length - b.fi_remark.length,
    // },
  ];

  const ShowTravelData = (props) => {
    console.log("Your data in showTable", props);
    const [sapNumber, tripNumber] = [props.pernr, props.reinr];
    console.log("Sap and trip number", sapNumber, tripNumber);
    const fetchData = async () => {
      const value = `${document.cookie}`;
      console.log(value);

      console.log("Printing values in useEffect", sapNumber, tripNumber);
      const url = `${process.env.REACT_APP_BASE_URL}/api/TravelExpense/showExpenseUsingSapAndCode?value=${value}&sapNumber=${sapNumber}&tripNumber=${tripNumber}`;
      console.log(url);
      fetch(url, { headers: { "Access-Control-Allow-Origin": "*" } })
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

  const DeleteData = (props) => {
    console.log(props);
    console.log("Your data in showTable", props);
    const [sapNumber, tripNumber] = [props.pernr, props.reinr];
    console.log("Sap and trip number", sapNumber, tripNumber);
    const fetchData = async () => {
      const value = `${document.cookie}`;
      console.log(value);

      console.log("Printing values in useEffect", sapNumber, tripNumber);
      const url = `${process.env.REACT_APP_BASE_URL}/api/TravelExpense/deleteExpenseUsingSapAndCode?value=${value}&sapNumber=${sapNumber}&tripNumber=${tripNumber}`;
      console.log(url);
      fetch(url, { headers: { "Access-Control-Allow-Origin": "*" } })
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
          // console.log("Helo data", data.travel_data);
          // setDdataFetched(data.travel_data);
          console.log(data);
          Toastify({
            text: data.message,
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          }).showToast();
          return data;
        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  };

  const CreateTripData = (props, purposeText, outComingText) => {
    if (purposeText == "" || outComingText == "") {
      Toastify({
        text: "Some field is Remaing",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff4e4e, #c60000)",
      }).showToast();
    } else {
      console.log(typeof props);
      console.log("Your data in CreateTrip", props, purposeText, outComingText);
      const [sapNumber, tripNumber] = [props.pernr, props.reinr];
      console.log("Sap and trip number", sapNumber, tripNumber);
      const fetchData = async () => {
        const value = `${document.cookie}`;
        console.log(value);

        console.log("Printing values in useEffect", sapNumber, tripNumber);
        const url = `${process.env.REACT_APP_BASE_URL}/api/TravelExpense/createRequestExpenseUsingSapAndCode?value=${value}&sapNumber=${sapNumber}&tripNumber=${tripNumber}&objectText=${purposeText}&outcomeText=${outComingText}`;
        console.log(url);
        fetch(url, { headers: { "Access-Control-Allow-Origin": "*" } })
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
            console.log(data);
            Toastify({
              text: data.message,
              duration: 3000,
              close: true,
              gravity: "top",
              position: "center",
              backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            }).showToast();
            return data;
          })
          .catch((error) => {
            console.log("Error");
          });
      };
      fetchData();
    }
  };

  const [dataFetched, setDataFetched] = useState([]);
  const columns = [
    // {
    //   title: "Employee Number",
    //   dataIndex: "pernr",
    //   sorter: (a, b) => a.pernr.length - b.pernr.length,
    // },
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
            // data-bs-toggle="dropdown"
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
    // {
    //   title: "check status",
    //   dataIndex: "antrg_text",
    //   sorter: (a, b) => a.pernr.length - b.pernr.length,
    // },
    {
      title: "Action",
      id: "pernr",
      render: (id) =>
        id.antrg_text == "Trip Completed" ||
        id.antrg_text == "Trip Approved" ? (
          ""
        ) : (
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
                  setCreateTrip(id);
                }}
              >
                {" "}
                Create trip
              </button>
              <button
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#delete"
                onClick={() => {
                  setDeleteData(id);
                }}
              >
                {" "}
                Delete
              </button>
            </div>
          </div>
        ),
    },
    {
      title: "Reimbursement Number",
      dataIndex: "reinr",
      sorter: (a, b) => a.reinr.length - b.reinr.length,
    },
    {
      title: "Travel Start Date",
      dataIndex: "datv1",
      sorter: (a, b) => a.datv1.length - b.datv1.length,
    },
    {
      title: "Travel End Date",
      dataIndex: "datb1",
      sorter: (a, b) => a.datb1.length - b.datb1.length,
    },
    // {
    //   title: "Travel Start Time",
    //   dataIndex: "uhrv1",
    //   sorter: (a, b) => a.uhrv1.length - b.uhrv1.length,
    // },

    // {
    //   title: "Travel End Time",
    //   dataIndex: "uhrb1",
    //   sorter: (a, b) => a.uhrb1.length - b.uhrb1.length,
    // },
    {
      title: "Travel Locations",
      dataIndex: "zort1",
      sorter: (a, b) => a.zort1.length - b.zort1.length,
    },
    // {
    //   title: "Customer",
    //   dataIndex: "kunde",
    //   sorter: (a, b) => a.kunde.length - b.kunde.length,
    // },
    // {
    //   title: "HDVRS",
    //   dataIndex: "hdvrs",
    //   sorter: (a, b) => a.hdvrs.length - b.hdvrs.length,
    // },
    // {
    //   title: "Application Number",
    //   dataIndex: "antrg",
    //   sorter: (a, b) => a.antrg.length - b.antrg.length,
    // },
    {
      title: "Application Text",
      dataIndex: "antrg_text",
      sorter: (a, b) => a.antrg_text.length - b.antrg_text.length,
    },

    {
      title: "Trip Total",
      dataIndex: "trip_total",
      sorter: (a, b) => a.trip_total.length - b.trip_total.length,
    },
    {
      title: "Currency",
      dataIndex: "waers",
      sorter: (a, b) => a.waers.length - b.waers.length,
    },
    {
      title: "Purpose Text",
      dataIndex: "pur_txt",
      sorter: (a, b) => a.pur_txt.length - b.pur_txt.length,
    },
    {
      title: "Out Text",
      dataIndex: "out_txt",
      sorter: (a, b) => a.out_txt.length - b.out_txt.length,
    },
  ];
  const [setApi, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const value = `${document.cookie}`;
      console.log(value);
      const url = `${process.env.REACT_APP_BASE_URL}/api/TravelExpense/showExpenseUsingSap?value=${value}`;
      console.log(url);
      await fetch(url, { headers: { "Access-Control-Allow-Origin": "*" } })
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
          console.log(data.travel_data);
          setDataFetched(data.travel_data.data);
          setApiData(data.travel_data.data);
          return data;
        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  }, []);
  const [selectedDate, setSelectedDate] = useState([]);
  // const handleFilter = (value) => {
  //   console.log(value);
  //   console.log(dataFetched);
  //   const res = setApi.filter((f) =>
  //     f.reinr.toLowerCase().includes(value.toLowerCase())
  //   );
  //   console.log(res);
  //   setDataFetched(res);
  // };
  // const handleDateFilterFrom = (dateValue) => {
  //   console.log(dateValue);
  //   console.log(dataFetched);

  //   if (!Array.isArray(dataFetched)) {
  //     console.error("dataFetched is not an array");
  //     return;
  //   }
  //   const formatDateForComparison = (date) => {
  //     const d = new Date(date);
  //     const day = `0${d.getDate()}`.slice(-2);
  //     const month = `0${d.getMonth() + 1}`.slice(-2); // Months are zero-indexed
  //     const year = d.getFullYear();
  //     return `${year}${month}${day}`;
  //   };
  //   const convertJsonDateForComparison = (jsonDate) => {
  //     const [day, month, year] = jsonDate.split(".");
  //     return `${year}${month}${day}`;
  //   };
  //   const formattedDate = formatDateForComparison(dateValue);
  //   console.log("Formatted Date for Comparison:", formattedDate);
  //   const res = dataFetched.filter((f) => {
  //     const startDate = convertJsonDateForComparison(f.datv1);
  //     return startDate >= formattedDate;
  //   });
  //   console.log(res);
  //   setDataFetched(res);
  // };

  // const handleDateFilterTo = (dateValue) => {
  //   console.log(dateValue);
  //   console.log(dataFetched);

  //   if (!Array.isArray(dataFetched)) {
  //     console.error("dataFetched is not an array");
  //     return;
  //   }
  //   const formatDateForComparison = (date) => {
  //     const d = new Date(date);
  //     const day = `0${d.getDate()}`.slice(-2);
  //     const month = `0${d.getMonth() + 1}`.slice(-2); // Months are zero-indexed
  //     const year = d.getFullYear();
  //     return `${year}${month}${day}`;
  //   };
  //   const convertJsonDateForComparison = (jsonDate) => {
  //     const [day, month, year] = jsonDate.split(".");
  //     return `${year}${month}${day}`;
  //   };
  //   const formattedDate = formatDateForComparison(dateValue);
  //   console.log("Formatted Date for Comparison:", formattedDate);
  //   const res = dataFetched.filter((f) => {
  //     const startDate = convertJsonDateForComparison(f.datb1);
  //     return startDate <= formattedDate;
  //   });
  //   console.log(res);
  //   setDataFetched(res);
  // };

  //   const formatDateForComparison = (date) => {
  //     const d = new Date(date);
  //     return d.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  // };

  // const parseDate = (dateStr) => {
  //     const d = new Date(dateStr);
  //     return d.toISOString().split('T')[0]; // Convert to YYYY-MM-DD for comparison
  // };

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
                  // onChange={handleDateChange}
                  onChange={(e) => {
                    setEnd(e);
                    // handleDateFilterTo(e);
                    // console.log(e);
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
      {/* <Breadcrumbs
        maintitle="Travel Expense"
        title="Travel Dashboard"
        // modal = "#add_salary"
        name="Add Travel Expense"
        modal="#show_travel_data"
      /> */}
      {/* <EditSalaryModal /> */}
      {/* <ShowTravelData /> */}
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
      {/* Pop up for delete */}
      <div className="modal custom-modal fade" id="delete" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Are you sure want to delete?</h3>
                <p>Reimbursement Number : {setDelete.reinr}</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    {/* <Link to="#" className="btn btn-primary continue-btn">
                      Delete
                    </Link> */}
                    <button
                      className="btn btn-primary continue-btn"
                      onClick={() => {
                        console.log(setDelete);
                        DeleteData(setDelete);
                      }}
                    >
                      Delete Expense
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
      {/* Pop up for trip create start*/}
      <div className="modal custom-modal fade" id="create" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Are you sure want to create trip for?</h3>
                <p>Reimbursement Number : {createTrip.reinr}</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="input-block mb-3 row">
                    Purpose Text
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="type your purpose"
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              purposeText: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
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
                              outComingText: event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    {/* <Link to="#" className="btn btn-primary continue-btn">
                      Delete
                    </Link> */}

                    <button
                      className="btn btn-primary continue-btn"
                      onClick={() => {
                        // console.log(setDelete);
                        CreateTripData(
                          createTrip,
                          formData.purposeText,
                          formData.outComingText
                        );
                      }}
                      
                    >
                    Create Trip
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
      {/* Pop up for trip create end */}
    </>
  );
};

export default TravelExpenseDataTable;
