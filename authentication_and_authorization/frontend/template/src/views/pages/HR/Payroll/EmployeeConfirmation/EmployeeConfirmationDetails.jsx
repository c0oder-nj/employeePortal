import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Salary from "../../../../../assets/json/employeeSalary";
import { Table } from "antd";
import EditSalaryModal from "../../../../../components/modelpopup/EditSalaryModal";
import DeleteModal from "../../../../../components/modelpopup/deletePopup";
import useAuth from "../../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import JwtTokenTimeExpire from "../../../../../cookieTimeOut/jwtTokenTime";

const EmployeeConfirmationDetails = () => {
  const data = Salary.Salary;
  // Function for checking a cookie 
  const navigate = useNavigate();
  const [apiData,setApiData] = useState({});
  const {checkCookie} = useAuth(); 
  
  //Use effect for showing data just for testing

  useEffect(()=>{
    console.log("Showing data to be send",apiData);
  },[apiData])
  
  useEffect(()=>{
    const checkCk = checkCookie('accessToken');
    if(checkCk.status === false){
      return navigate('/');
    }

    const fetchData = async () => {
      
      const value = checkCookie("accessToken").cookie.split("=").at(1);
      console.log(
        "Printing value at 478 for travelexpense data in local :: ",
        value
      );
      const url = `${process.env.REACT_APP_BASE_URL}/api/admin/hod-show-form-ppt-details`;
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
              JwtTokenTimeExpire();
              navigate("/logout");
              return;
            }
          }
          console.log("Printing travel data in data.travel_data :: ", typeof(data.data.data));
          setApiData(data.data.data);
          return data;
          
        })
        .catch((error) => {
          console.log("Error",error);
        });
    };
    fetchData();

  },[]);

  const columns = [
    {
      title: "Sap ID",
      dataIndex: "pernr",
      sorter: (a, b) => a.employeeId.length - b.employeeId.length,
    },
    {
      title: "Name",
      dataIndex: "ename",
      render: (text, record) => (
        <div className="table-avatar">
          {text} <span>{record.position}</span>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Joining Date",
      dataIndex: "joini_date",
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "Confirmation Due Date",
      dataIndex: "confir_date",
      sorter: (a, b) => a.joiningDate.length - b.joiningDate.length,
    },
    
    {
      title: "Hod Name",
      dataIndex: "hod_name",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.salary.length - b.salary.length,
    },
    {
      title: "Hod Remark",
      dataIndex: "hod_remark",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.salary.length - b.salary.length,
    },


    {
      title: "Confirmation Form(PPT)",
      render: () => (
        <Link className="btn btn-sm btn-primary" to="/salary-view">
          Generate Slip
        </Link>
      ),
    },
    {
      title: "Assessment Form",
      render: () => (
        <Link className="btn btn-sm btn-primary" to="/salary-view">
          Generate Slip
        </Link>
      ),
    },
    {
      title: "Action",
      render: () => (
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
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit_salary"
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete"
            >
              <i className="fa fa-trash m-r-5" /> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <Table
              className="table-striped"
              style={{ overflowX: "auto" }}
              columns={columns}
              dataSource={apiData}
              // rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>

      {/* <EditSalaryModal />
      <DeleteModal Name="Delete Salary" /> */}
    </>
  );
};

export default EmployeeConfirmationDetails;
