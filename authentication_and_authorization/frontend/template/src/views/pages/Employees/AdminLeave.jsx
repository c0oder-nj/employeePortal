/* eslint-disable no-unused-expressions */

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Table } from "antd";
import {
  Avatar_01,
  Avatar_02,
  Avatar_03,
  Avatar_05,
  Avatar_06,
  Avatar_07,
  Avatar_08,
  Avatar_09,
  Avatar_10,
  Avatar_11,
  Avatar_12,
} from "../../../Routes/ImagePath";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { AdminLeaveAddModelPopup } from "../../../components/modelpopup/AdminLeaveModelPopup";
import SearchBox from "../../../components/SearchBox";
import LeaveFilter from "../../../components/LeaveFilter";
const AdminLeave = () => {
  
  const [setPendingLeaves, setPendingLeavesFunction ] = useState([]);
  const [displayVariable, displayVariableSet] = useState("none");
  const [leaveInfo,leaveSet] = useState([]);
  const [casualLeave,setCasualLeave]  = useState("");
  const [allEmp,allEmpFunction]  = useState([]);
  const [isFetchedData,isFetchedDataFunction] = useState(false);
  const navigate = useNavigate();
  var dataFetchedThroughApi = null;

  //Cookie checking 
  
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
  useEffect(() => {
    let cookieExists = checkCookie('accessToken');
    if(!cookieExists){
      navigate("react/template/");
    }
    const fetchData = async ()=>{

        //Fetching data for attendance
        const value = `${document.cookie}`;
        console.log(value)
        
        // const url = `http://localhost:3000/api/auth/home?value=${value}`;
        // Value dena padega kynoki uske basis p[ar hi user ki info identify kar rahe hai
        // const url = `http://localhost:3000/api/employee/employeeAttendance?value=${value}`;

        const url = `http://localhost:3000/api/employee/employeeLeaveApproval?value=${value}`;
        console.log(url);
        
        dataFetchedThroughApi = await fetch
        (url).then((response)=>{
          return response.json();
        }).then((data) => {
          
          //Value will be initialized after getting a response
          // leaveSet(data.leave)
          console.log(data)
          console.log("Printing")
          setPendingLeavesFunction(data.employeePendingLeave)
          // setUsers(data.leaveInfo)
          // console.log()
          // setCasualLeave(data.leave);
          // allEmpFunction(data.companyEmployee)
          // displayVariableSet("block");
          
          isFetchedDataFunction(true);
          return data;
          
        }).catch((error)=>{
          console.log("Error");
        });
    }
    fetchData();
  }, []);


  if(setPendingLeaves.length>0){
    console.log("You are in frontend posrtion ",setPendingLeaves)
  }
  
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <div className="dropdown action-label text-center">
          <Link
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            to="#"
            data-bs-toggle="dropdown"
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
            {text[0]}
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            
            
            <Link
              className="dropdown-item"
              to= {`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/leave_apporvereject.htm?leave_no=${text[1]}&approver=5089&sign=1`}
              // to="https://www.google.com/"
              // data-bs-toggle="modal"
              data-bs-target="#approve_leave"
            >
              <i className="far fa-dot-circle text-success"/> Approved
            </Link>
            <Link className="dropdown-item" 
            to={`https://spquasrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/leave_apporvereject.htm?leave_no=${text[1]}&approver=5089&sign=2`}>
              <i className="far fa-dot-circle text-danger"/> Declined
            </Link>
          </div>
        </div>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Employee",
      dataIndex: "name",
      render: (text, record) => (   
          <span className="table-avatar">
            {text}
          </span>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Leave Application Number",
      dataIndex: "leaveapplicationbnumber",
      render: (text) => <span>{text}</span>,

      sorter: (a, b) => a.leavetype.length - b.leavetype.length,
    },
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
      title: "Time From",
      dataIndex: "Timefrom",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Time To",
      dataIndex: "Timeto",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    // {
    //   title: "Action",
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
    //           <i className="fa-regular fa-trash-can m-r-5" /> Delete
    //         </Link>
    //       </div>
    //     </div>
    //   ),
    //   sorter: true,
    // },
  ];
  
  var table =[]

  setPendingLeaves.forEach((emp,index)=>{
    var temp = {}
    temp.id = index,
    temp.name = emp.name,
    temp.leaveapplicationbnumber = emp.leavNo,
    temp.leavetype = emp.dedQuta1,
    temp.noofdays = emp.horo,
    temp.reason = emp.reason,
    temp.status = ["Pending",emp.leavNo],
    temp.Timefrom = emp.timFrm,
    temp.Timeto = emp.timTo,
    temp.from = emp.levFr,
    temp.to = emp.levT,
    table.push(temp);
  })

  // const table = [
  //   {
  //     id: 1,
  //     image: Avatar_02,
  //     name: "John Doe",
  //     role: "Web Designer",
  //     leavetype: "Medical Leave",
  //     from: "27 Feb 2023",
  //     to: "27 Feb 2023",
  //     noofdays: "1 day",
  //     reason: "Going to Hospital",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2,
  //     image: Avatar_01,
  //     name: "Buster Wigton",
  //     role: "Web Developer",
  //     leavetype: "Hospitalisation",
  //     from: "15 Jan 2023",
  //     to: "25 Jan 2023",
  //     noofdays: "10 days",
  //     reason: "Going to Hospital",
  //     status: "Approved",
  //   },
  //   {
  //     id: 3,
  //     image: Avatar_03,
  //     name: "Catherine Manseau",
  //     role: "Web Developer",
  //     leavetype: "Maternity Leave",
  //     from: "5 Jan 2023",
  //     to: "15 Jan 2023",
  //     noofdays: "10 days",
  //     reason: "Going to Hospital",
  //     status: "Approved",
  //   },
  //   {
  //     id: 4,
  //     image: Avatar_05,
  //     name: "Domenic Houston",
  //     role: "Web Developer",
  //     leavetype: "Casual Leave",
  //     from: "10 Jan 2023",
  //     to: "11 Jan 2023",
  //     noofdays: "2 days",
  //     reason: "Going to Hospital",
  //     status: "Approved",
  //   },
  //   {
  //     id: 5,
  //     image: Avatar_06,
  //     name: "John Doe",
  //     role: "Web Designer",
  //     leavetype: "Casual Leave",
  //     from: "9 Jan 2023",
  //     to: "10 Jan 2023",
  //     noofdays: "2 days",
  //     reason: "Going to Hospital",
  //     status: "Approved",
  //   },
  //   {
  //     id: 6,
  //     image: Avatar_07,
  //     name: "John Smith",
  //     role: "Andro id Developer",
  //     leavetype: "LOP",
  //     from: "24 Feb 2023",
  //     to: "25 Feb 2023",
  //     noofdays: "2 days",
  //     reason: "Personnal",
  //     status: "Approved",
  //   },
  //   {
  //     id: 7,
  //     image: Avatar_08,
  //     name: "Melita Faucher",
  //     role: "Web Developer",
  //     leavetype: "Casual Leave",
  //     from: "13 Jan 2023",
  //     to: "14 Jan 2023",
  //     noofdays: "2 days",
  //     reason: "Going to Hospital",
  //     status: "Declined",
  //   },
  //   {
  //     id: 8,
  //     image: Avatar_02,
  //     name: "Mike Litorus",
  //     role: "IOS Developer",
  //     leavetype: "Paternity Leave",
  //     from: "13 Feb 2023",
  //     to: "17 Feb 2023",
  //     noofdays: "5 days",
  //     reason: "Going to Hospital",
  //     status: "Declined",
  //   },
  //   {
  //     id: 9,
  //     image: Avatar_09,
  //     name: "Richard Miles",
  //     role: "Web Designer",
  //     leavetype: "Casual Leave",
  //     from: "8 Mar 2023",
  //     to: "9 Mar 2023",
  //     noofdays: "2 days",
  //     reason: "Going to Hospital",
  //     status: "New",
  //   },
  //   {
  //     id: 10,
  //     image: Avatar_10,
  //     name: "Richard Parker",
  //     role: "Web Developer",
  //     leavetype: "Casual Leave",
  //     from: "30 Jan 2023",
  //     to: "31 Jan 2023",
  //     noofdays: "2 days",
  //     reason: "Personnal",
  //     status: "New",
  //   },
  //   {
  //     id: 11,
  //     image: Avatar_11,
  //     name: "Rolland Webber",
  //     role: "Web Developer",
  //     leavetype: "Casual Leave",
  //     from: "7 Jan 2023",
  //     to: "8 Jan 2023",
  //     noofdays: "2 days",
  //     reason: "Going to Hospital",
  //     status: "Declined",
  //   },
  //   {
  //     id: 12,
  //     image: Avatar_12,
  //     name: "Tarah Shropshire",
  //     role: "Web Developer",
  //     leavetype: "Paternity Leave",
  //     from: "10 Jan 2023",
  //     to: "10 Jan 2023",
  //     noofdays: "1 day",
  //     reason: "Going to Hospital",
  //     status: "New",
  //   },
  // ];
  const statsData = [
    {
      id: 1,
      title: "Today Presents",
      value: "12 / 60",
    },
    {
      id: 2,
      title: "Planned Leaves",
      value: "8",
      subText: "Today",
    },
    {
      id: 3,
      title: "Unplanned Leaves",
      value: "0",
      subText: "Today",
    },
    {
      id: 4,
      title: "Pending Requests",
      value: "12",
    },
  ];
  return (
    <>
    {setPendingLeaves.length>0 &&
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Leaves"
            title="Dashboard"
            subtitle="Leaves"
            modal="#add_leave"
            name="Add Leave"
          />
          {/* /Page Header */}
          {/* Leave Statistics */}
          {/* <div className="row">
            {statsData.map((stat, index) => (
              <div className="col-md-3 d-flex" key={index}>
                <div className="stats-info w-100">
                  <h6>{stat.title}</h6>
                  {stat.subText ? (
                    <h4>
                      {stat.value} <span>{stat.subText}</span>
                    </h4>
                  ) : (
                    <h4>{stat.value}</h4>
                  )}
                </div>
              </div>
            ))}
          </div> */}
          <LeaveFilter />
          {/* /Leave Statistics */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <SearchBox />
                <Table
                  columns={columns}
                  dataSource={table}
                  className="table-striped"
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Leave Modal */}
        <AdminLeaveAddModelPopup />
        {/* /Add Leave Modal */}

        {/* Delete Modal */}
        <DeleteModal Name="Delete Leaves" />
        {/* Delete Modal */}
      </div>
  }
  </>
  );
};

export default AdminLeave;
