import { Table } from "antd";
import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import EmployeeLeaveModelPopup from "../../../components/modelpopup/EmployeeLeaveModelPopup";
import SearchBox from "../../../components/SearchBox";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../../base_urls";
import JwtTokenTimeExpire from "../../../cookieTimeOut/jwtTokenTime";
import useAuth from "../../../hooks/useAuth";
import ShaktiLoader from "../../../components/ShaktiLoader";
// import { TokenExpiredError } from "jsonwebtoken";

const EmployeeLeave = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [displayVariable, displayVariableSet] = useState("none");
  const [leaveInfo,leaveSet] = useState([]);
  const [casualLeave,setCasualLeave]  = useState("");
  const [allEmp,allEmpFunction]  = useState([]);
  const [page,setPage] = useState(10);
  const [isFetchedData,isFetchedDataFunction] = useState(false);
  const navigate = useNavigate();
  var dataFetchedThroughApi = null;

  const { checkCookie } = useAuth();
  



  useEffect(() => {

    setIsLoading(true);
    
    var cookieExists = checkCookie('accessToken');
    if(!cookieExists.status){
      navigate("/");
    }

    const fetchData = async ()=>{

        //Fetching data for attendance
    
        let cookieExist = checkCookie('accessToken')
        console.log("Printing response of cookie exist :: ", cookieExist)
        let value = cookieExist.cookie;
        value = value.split('=').at(1);
        
        // const url = `http://localhost:3000/api/auth/home?value=${value}`;
        //Value dena padega kynoki uske basis p[ar hi user ki info identify kar rahe hai
        const url = `${process.env.REACT_APP_BASE_URL}/api/employee/employeeAttendance`;
        console.log(url);

        console.log("Printing token before fetch :: ", value);
        
        dataFetchedThroughApi = await fetch
        (url, {headers: {'Access-Control-Allow-Origin' : '*', 'accesstoken' : value}}).then((response)=>{
          return response.json();
        }).then((data) => {
          
          if(data.status==false){
            if(data.type=="Token Expired"){
              console.log("Line 305",data);
                // handleLogout();
                JwtTokenTimeExpire();
                navigate('/logout');
                return;
            }
          }

          //Value will be initialized after getting a response
          console.log("Printing data after fetch :: ", data);
          leaveSet(data.leave)
          console.log("Printing")
          setUsers(data.leaveInfo)
          // console.log()
          setCasualLeave(data.leave);
          allEmpFunction(data.companyEmployee)
          displayVariableSet("block");
          setIsLoading(false);
          isFetchedDataFunction(true);
          return data;
          
        }).catch((error)=>{
          console.log("Error");
        });
    }
    fetchData();
  }, []);

  if(dataFetchedThroughApi){
    isFetchedDataFunction(true);
    // console.log(dataFetchedThroughApi.companyEmployee)
  }
  console.log(casualLeave)
  console.log("All emp value : ",allEmp)

 
  const userElements = users?.map((user, index) => ({
    key: index,
    leavetype: user.lev_typ,
    from: user.lev_frm,
    to: user.lev_to,
    noofdays: user.horo,
    reason: user.reason,
    role: user.role,
    status: (user.apphod)?"Approved":(user.dele)?"Decline":"Pending",
    approvedby: user.approvedby,
  }));
  const columns = [
    {
      title: "Leave Type",
      dataIndex: "leavetype",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.leavetype.length - b.leavetype.length,
    },

    {
      title: "From",
      dataIndex: "from",
      render: (text) => <span>{text}</span>,

      sorter: (a, b) => a.from.length - b.from.length,
    },
    {
      title: "To",
      dataIndex: "to",
      render: (text) => <span>{text}</span>,

      sorter: (a, b) => a.to.length - b.to.length,
    },

    {
      title: "No Of Days",
      dataIndex: "noofdays",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.noofdays.length - b.noofdays.length,
    },

    {
      title: "Reason",
      dataIndex: "reason",
      render: (text) => <span>{text}</span>,

      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: (text) => (
        <div className="dropdown action-label text-center">
          <Link
            className="btn btn-white btn-sm btn-rounded "
            to="#"
            
            aria-expanded="false"
          >
            <i
              className={
                text === "New"
                  ? "far fa-dot-circle text-purple"
                  : text === "Pending"
                  ? "far fa-dot-circle text-info"
                  : text === "Approved"
                  ? "far fa-dot-circle text-success"
                  : "far fa-dot-circle text-danger"
              }
            />{" "}
            {text}
          </Link>

          {/* <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="#">
              <i className="far fa-dot-circle text-purple" /> New
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="far fa-dot-circle text-info" /> Pending
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="far fa-dot-circle text-success" /> Approved
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="far fa-dot-circle text-danger" /> Declined
            </Link>
          </div> */}
        </div>
      ),
    }
    // ,
    // {
    //   title: "Action",
    //   className: "text-end",
    //   sorter: true,
    //   render: () => (
    //     <div className="dropdown dropdown-action text-end">
    //       <Link
    //         to="#"
    //         className="action-icon dropdown-toggle"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <i className="material-icons">more_vert</i>
    //       </Link>
    //       <div className="dropdown-menu dropdown-menu-right">
    //         <Link
    //           className="dropdown-item"
    //           to="#"
    //           data-bs-toggle="modal"
    //           data-bs-target="#edit_leave"
    //         >
    //           <i className="fa fa-pencil m-r-5" /> Edit
    //         </Link>
    //         <Link
    //           className="dropdown-item"
    //           to="#"
    //           data-bs-toggle="modal"
    //           data-bs-target="#delete"
    //         >
    //           <i className="fa fa-trash m-r-5" /> Delete
    //         </Link>
    //       </div>
    //     </div>
    //   ),
    // },
  ];
  const leaveStats = [
    {
      id: 1,
      title: "Annual Leave",
      value: 123,
    },
    {
      id: 2,
      title: "Medical Leave",
      value: 123,
    },
    {
      id: 3,
      title: "Other Leave",
      value: 123,
    },
    {
      id: 4,
      title: "Remaining Leave",
      value: 123,
    },
  ];

  const entriesChange = (e) => {
    const newFilteredData = userElements.slice(0, e.target.value);
    setPage(e.target.value);
    // newUserElement = newFilteredData;
    // setNewUserElement(newFilteredData);
    // console.log("Filter value and data ", e.target.value, newFilteredData);
  };

  return (
<>
    {
      isLoading && <ShaktiLoader/>
    }


    <div className="blockingOrNot" style= {{display:displayVariable}}>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Leaves"
            title="Dashboard"
            subtitle="Leaves"
            modal="#add_leave"
            name="Add Leave"
          />

          <div className="row">
            {leaveInfo?.map((stat, index) => (
              console.log(stat),
              <div className="col-md-3" key={index}>
                <div className="stats-info">
                  <h6>{stat.leaveType.split('-')[0]} LEAVE</h6>
                  <h4>{stat.leaveBal}</h4>
                  {/* <h4>{leave}</h4> */}
                </div>
              </div>
            ))}
          </div>
          <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="dataTables_length d-flex">
                  <label className="d-flex">
                    Show{" "}
                    <select
                      name="DataTables_Table_0_length"
                      aria-controls="DataTables_Table_0"
                      className="custom-select custom-select-sm form-control form-control-sm me-1 ms-1 mb-2"
                      onChange={entriesChange}
                      
                    >
                      <option value="">Select</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                      <option value="30">30</option>
                    </select>{" "}
                    entries
                  </label>
                </div>
              </div>
              <div className="col-sm-12 col-md-6"></div>
            </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                {/* <SearchBox /> */}
                <Table
                  columns={columns}
                  dataSource={userElements?.length > 0 ? userElements : []}
                  pagination={{ pageSize: page }}
                  className="table-striped"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Leave Modal */}
      
      {
        // isFetchedData && 
        // <EmployeeLeaveModelPopup data={"Hello"}/>
        casualLeave? <EmployeeLeaveModelPopup data1={casualLeave} data2={allEmp}/> : <p>Loading...</p>
      }
      {/* {dataFetchedThroughApi ? <EmployeeLeaveModelPopup data={dataFetchedThroughApi}/> : <p>Loading...</p>} */}
      {/* Add Leave Modal */}
      {/* Delete Modal */}
      <DeleteModal Name="Delete Leaves" />
      {/* Delete Modal */}
    </div>
    </>
  );
};

export default EmployeeLeave;
