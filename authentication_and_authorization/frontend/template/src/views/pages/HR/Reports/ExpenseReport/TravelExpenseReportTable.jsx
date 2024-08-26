import { Table, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar_03, Avatar_04 } from "../../../../../Routes/ImagePath";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DatePicker from "react-datepicker";
import JwtTokenTimeExpire from "../../../../../cookieTimeOut/jwtTokenTime";
const TravelExpenseReportTable = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [setApprove, setApproveData] = useState([]);
  function checkCookie(cookieName) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + "=")) {
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

    const fetchData = async () => {
      const value = `${document.cookie}`;
      const url = `${process.env.REACT_APP_BASE_URL}/api/TravelExpense/showTravelExpenseToHOD?value=${value}`;
      await fetch(url, {headers : {'Access-Control-Allow-Origin' : '*'}})
        .then((response) => response.json())
        .then((data) => {
          if(data.status==false){
            if(data.type=="Token Expired"){
              console.log("Line 305",data);
                // handleLogout();
                JwtTokenTimeExpire();
                navigate('/logout');
                return;
            }
          }
          setApiData(data.data);
          setFilterData(data.data);
          console.log(data.data);
          if (data.data.length == 0) {
            console.log("Line 86");
            withReactContent(Swal).fire({
              title: "You are not an Admin !!!",
              preConfirm: () => {
                navigate("/employee-dashboard");
              },
            });
          }

        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("At line 45", setApprove);
  }, [setApprove]);

  const [filterData, setFilterData] = useState([]);
  const data = [
    // {
    //   id: 1,
    //   item: "Dell Laptop",
    //   purchasefrom: "Amazon",
    //   purchasedate: "5 Jan 2019",
    //   image: Avatar_03,
    //   name: "John Doe",
    //   amount: "1215",
    //   paidby: "Cash",
    //   status: "Pending",
    // },
    // {
    //   id: 2,
    //   item: "Mac System",
    //   purchasefrom: "Amazon",
    //   purchasedate: "5 Jan 2019",
    //   image: Avatar_04,
    //   name: "Richard Miles",
    //   amount: "1215",
    //   paidby: "Cheque",
    //   status: "Approved",
    // },
    {
      REINR: 7441,
      DATV1: "2024-04-10",
      UHRV1: "00:00:00",
      DATB1: "2024-04-12",
      UHRB1: "00:00:00",
      ZORT1: "DIG Office Chindwara",
      KUNDE: "",
      HDVRS: 99,
      ANTRG: "3",
      ANTRG_TEXT: "Trip Completed",
      WAERS: "INR",
      TRIP_TOTAL: 15077.0,
      PUR_TXT: "Meeting with DIG",
      OUT_TXT: "Meeting Done and Required  information shared",
    },
  ];

  // const columns = [
  //   {
  //     title: "Item",
  //     dataIndex: "item",
  //     render: (text) => <strong>{text}</strong>,
  //     sorter: (a, b) => a.item.length - b.item.length,
  //   },
  //   {
  //     title: "Purchase From",
  //     dataIndex: "purchasefrom",
  //     sorter: (a, b) => a.purchasefrom.length - b.purchasefrom.length,
  //   },
  //   {
  //     title: "Purchase Date",
  //     dataIndex: "purchasedate",
  //     sorter: (a, b) => a.purchasedate.length - b.purchasedate.length,
  //   },
  //   {
  //     title: "Purchased By",
  //     dataIndex: "name",
  //     render: (text, record) => (
  //       <div className="table-avatar">
  //         <Link to="/profile" className="avatar">
  //           <img alt="" src={record.image} />
  //         </Link>
  //         <Link to="/profile">
  //           {text} <span>{record.role}</span>
  //         </Link>
  //       </div>
  //     ),
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: "Amount",
  //     dataIndex: "amount",
  //     render: (text) => <span>$ {text}</span>,
  //     sorter: (a, b) => a.amount.length - b.amount.length,
  //   },

  //   {
  //     title: "Paid By",
  //     dataIndex: "paidby",
  //     sorter: (a, b) => a.paidby.length - b.paidby.length,
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     render: (text) => (
  //       <div className="dropdown action-label">
  //         <Link
  //           className="btn btn-white btn-sm btn-rounded dropdown-toggle"
  //           to="#"
  //           data-bs-toggle="dropdown"
  //           aria-expanded="false">
  //           <i
  //             className={
  //               text === "Pending"
  //                 ? "far fa-dot-circle text-danger"
  //                 : "far fa-dot-circle text-success"
  //             }
  //           />{" "}
  //           {text}
  //         </Link>
  //         <div className="dropdown-menu">
  //           <Link className="dropdown-item" to="#">
  //             <i className="far fa-dot-circle text-success" /> Approved
  //           </Link>
  //           <Link className="dropdown-item" to="#">
  //             <i className="far fa-dot-circle text-danger" /> Pending
  //           </Link>
  //         </div>
  //       </div>
  //     ),
  //     sorter: (a, b) => a.status.length - b.status.length,
  //   },
  //   {
  //     title: "Action",
  //     render: () => (
  //       <div className="dropdown dropdown-action text-end">
  //         <Link
  //           to="#"
  //           className="action-icon dropdown-toggle"
  //           data-bs-toggle="dropdown"
  //           aria-expanded="false">
  //           <i className="material-icons">more_vert</i>
  //         </Link>
  //         <div className="dropdown-menu dropdown-menu-right">
  //           <Link className="dropdown-item" to="#">
  //             <i className="fa fa-pencil m-r-5" /> Edit
  //           </Link>
  //           <Link className="dropdown-item" to="#">
  //             <i className="fa fa-trash m-r-5" /> Delete
  //           </Link>
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];
  const columns = [
    {
      title: "Status",
      dataIndex: "ANTRG_TEXT",
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
                text === "Pending"
                  ? "far fa-dot-circle text-danger"
                  : "far fa-dot-circle text-success"
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
      id: "PERNR",
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
            {/* <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit_salary"
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link> */}
            <button
              className="dropdown-item "
              data-bs-toggle="modal"
              data-bs-target="#approvedtrip"
              onClick={() => {
                console.log(id);
                setApproveData(id);
              }}
            >
              {" "}
              Approve Trip
            </button>
          </div>
        </div>
      ),
    },
    // {
    //   title: "Request Description",
    //   dataIndex: "ANTRG_TEXT",
    //   sorter: (a, b) => a.ANTRG_TEXT.length - b.ANTRG_TEXT.length,
    // },
    {
      title: "Reimbursement Number",
      dataIndex: "REINR",
      render: (text) => <strong>{text}</strong>,
      sorter: (a, b) => a.REINR - b.REINR,
    },
    
    {
      title: "Employee Sap Number",
      dataIndex: "PERNR",
      render: (text) => <strong>{text}</strong>,
      sorter: (a, b) => a.REINR - b.REINR,
    },
    {
      title: "Employee Name",
      dataIndex: "ENAME",
      render: (text) => <strong>{text}</strong>,
      sorter: (a, b) => a.REINR - b.REINR,
    },
    {
      title: "Start Date",
      dataIndex: "DATV1",
      sorter: (a, b) => new Date(a.DATV1) - new Date(b.DATV1),
    },
    // {
    //   title: "Start Time",
    //   dataIndex: "UHRV1",
    //   sorter: (a, b) => a.UHRV1.localeCompare(b.UHRV1),
    // },
    {
      title: "End Date",
      dataIndex: "DATB1",
      sorter: (a, b) => new Date(a.DATB1) - new Date(b.DATB1),
    },
    // {
    //   title: "End Time",
    //   dataIndex: "UHRB1",
    //   sorter: (a, b) => a.UHRB1.localeCompare(b.UHRB1),
    // },
    {
      title: "Location",
      dataIndex: "ZORT1",
      sorter: (a, b) => a.ZORT1.length - b.ZORT1.length,
    },
    // {
    //   title: "Customer",
    //   dataIndex: "KUNDE",
    //   sorter: (a, b) => a.KUNDE.length - b.KUNDE.length,
    // },
    // {
    //   title: "Supervisor",
    //   dataIndex: "HDVRS",
    //   sorter: (a, b) => a.HDVRS - b.HDVRS,
    // },
    // {
    //   title: "Request",
    //   dataIndex: "ANTRG",
    //   sorter: (a, b) => a.ANTRG - b.ANTRG,
    // },
    
    {
      title: "Currency",
      dataIndex: "WAERS",
      sorter: (a, b) => a.WAERS.length - b.WAERS.length,
    },
    {
      title: "Total Amount",
      dataIndex: "TRIP_TOTAL",
      render: (text) => <span>₹ {text}</span>,
      sorter: (a, b) => a.TRIP_TOTAL - b.TRIP_TOTAL,
    },
    {
      title: "Purpose",
      dataIndex: "PUR_TXT",
      sorter: (a, b) => a.PUR_TXT.length - b.PUR_TXT.length,
    },
    {
      title: "Outcome",
      dataIndex: "OUT_TXT",
      sorter: (a, b) => a.OUT_TXT.length - b.OUT_TXT.length,
    },

    // {
    //   title: "Action",
    //   render: () => (
    //     <div className="dropdown dropdown-action text-end">
    //       <Link
    //         to="#"
    //         className="action-icon dropdown-toggle"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false">
    //         <i className="material-icons">more_vert</i>
    //       </Link>
    //       <div className="dropdown-menu dropdown-menu-right">
    //         <Link className="dropdown-item" to="#">
    //           <i className="fa fa-pencil m-r-5" /> Edit
    //         </Link>
    //         <Link className="dropdown-item" to="#">
    //           <i className="fa fa-trash m-r-5" /> Delete
    //         </Link>
    //       </div>
    //     </div>
    //   ),
    // },
    
  ];

  const handleFilter = (value) => {
    console.log(value);
    console.log(filterData);
    const res = filterData.filter((f) => f.ENAME.toLowerCase().includes(value));
    console.log(res);
    setApiData(res);
  };

  const approveTrip = (props) => {
    const [sapNumber, tripNumber] = [props.PERNR, props.REINR];
    console.log("In hod travel approval", sapNumber, tripNumber);
    const fetchData = async () => {
      const value = `${document.cookie}`;
      console.log(value);
      const url = `${process.env.REACT_APP_BASE_URL}/api/TravelExpense/approveTravelExpenseByHOD?value=${value}&sapNumber=${sapNumber}&tripNumber=${tripNumber}`;
      console.log(url);
      fetch(url, {
        headers : {'Access-Control-Allow-Origin' : '*'}
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {

          console.log(data);
          if(data.status==false){
            if(data.type=="Token Expired"){
              console.log("Line 305",data);
                // handleLogout();
                JwtTokenTimeExpire();
                navigate('/logout');
                return;
            }
          }
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
  };

  const handleDateFilterFrom = (dateValue) => {
    console.log(dateValue);
    console.log(apiData);
    console.log(dateValue);
    // console.log(dataFetched);

    if (!Array.isArray(apiData)) {
      console.error("api Data is not an array");
      return;
    }
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = `0${d.getMonth() + 1}`.slice(-2);
      const day = `0${d.getDate()}`.slice(-2);
      return `${year}-${month}-${day}`;
    };

    const formattedDate = formatDate(dateValue);
    console.log("Formatted Date:", formattedDate);

    const res = apiData.filter((f) => f.DATV1 >= formattedDate);

    console.log(res);
    setApiData(res);
  };
  const handleDateFilterTo = (dateValue) => {
    console.log(dateValue);
    console.log(apiData);
    console.log(dateValue);
    // console.log(dataFetched);

    if (!Array.isArray(apiData)) {
      console.error("api Data is not an array");
      return;
    }
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = `0${d.getMonth() + 1}`.slice(-2);
      const day = `0${d.getDate()}`.slice(-2);
      return `${year}-${month}-${day}`;
    };

    const formattedDate = formatDate(dateValue);
    console.log("Formatted Date:", formattedDate);

    const res = apiData.filter((f) => f.DATB1 <= formattedDate);

    console.log(res);
    setApiData(res);
  };
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive" style={{ "overflow-x": "hidden" }}>
            {/* <input type="text" placeholder="search here ..." className="form-control" onChange={e=>{
                handleFilter(e.target.value)
          }}></input> */}
            {/* <Table
            className="table-striped"
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
          /> */}

            {/* {
            apiData.forEach((d,i)=>(
                // console.log(d)
                <Table
            className="table-striped"
            style={{ overflowX: "auto" }}
            columns={columns}
            dataSource={d}
            rowKey={(record) => record.id}
          />
            ))
          } */}
            <div className="row filter-row">
              <div className="col-sm-6 col-md-3">
                <div className="input-block form-focus select-focus">
                  <input
                    type="text"
                    placeholder="search here ..."
                    className="form-control"
                    onChange={(e) => {
                      handleFilter(e.target.value);
                    }}
                  ></input>
                  <label className="focus-label">Employee Name</label>
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
                        handleDateFilterFrom(e);
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
                        handleDateFilterTo(e);
                      }}
                      dateFormat="dd-MM-yyyy"
                    />
                  </div>
                  <label className="focus-label">To</label>
                </div>
              </div>
              

              {/* <div className="col-sm-6 col-md-3">
                <Link to="#" className="btn btn-success btn-block w-100">
                  {" "}
                  Search{" "}
                </Link>
              </div> */}
            </div>

            <Table
              className="table-striped"
              style={{ overflowX: "auto" }}
              columns={columns}
              dataSource={apiData}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>
      <>
        {/* Delete Performance Indicator Modal */}
        <div
          className="modal custom-modal fade"
          id="approvedtrip"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Trip Approving</h3>
                  <p>Are you sure want to Approve trip : {setApprove.REINR}?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <button
                        className="btn btn-primary continue-btn"
                        onClick={() => {
                          console.log(setApprove);
                          approveTrip(setApprove);
                          // CreateTripData(createTrip,formData.purposeText,formData.outComingText);
                        }}
                      >
                        Approve Trip
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
        {/* /Delete Performance Indicator Modal */}
      </>
    </>
  );
};

export default TravelExpenseReportTable;
