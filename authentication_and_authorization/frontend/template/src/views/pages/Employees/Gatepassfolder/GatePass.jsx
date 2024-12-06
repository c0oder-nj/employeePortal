import React, { useEffect, useState } from "react";
import Header from "../../../layout/Header";
import Sidebar from "../../../layout/Sidebar";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Link , useNavigate } from "react-router-dom";
import { Avatar_02 } from "../../../../Routes/ImagePath";
import { Table } from "antd";
import DeleteModal from "../../../../components/modelpopup/DeleteModal";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import EditPfModal from "../../HR/Sales/ProvidentFund/EditPfModal";
import AddPfModal from "../../HR/Sales/ProvidentFund/AddPfModal";

import CreateGatePass from "./CreateGatePass";
import ShaktiLoader from "../../../../components/ShaktiLoader";

const GatePass = () => {
const {checkCookie, isLoading, setIsLoading} = useAuth();
const navigate = useNavigate();
const [gatePassData, setGatePassData] = useState([]);
const [isCreated, setIsCreated] = useState(false);

const changeParentState = () => {
  console.log("Inside parent componet called from child component")
  setIsCreated(prev => !prev);
}

  useEffect(() => {

    setIsLoading(true);

    const fetchData = async () => {
      const tokenResult = checkCookie('accessToken');
      if (!tokenResult.status) {
        navigate('');
        return false;
      }

      let cookie = tokenResult.cookie;
      cookie = cookie.split('=').at(1);

      console.log("Printing cookie at gatepass component :: ", cookie);

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/employee/gatepass-listing`, {
          method: 'GET',
          headers: {
            'accesstoken': cookie,
            'Access-Control-Allow-Origin' : '*'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data", error);
        return false;
      }
    };

    fetchData().then((data)=>{
      console.log("Printing data after fetch :: ", data);
      setIsLoading(false);
      setGatePassData(data.data)
    })
    
    
  }, []);


  const data = [
    {
      id: 1,
      image: Avatar_02,
      name: "John Doe",
      role: "Web Designer",
      fundtype: "Percentage of Basic Salary",
      employeeshare: "2%",
      organizationshare: "2%",
      status: "Pending",
    },
  ];

  const columns = [
    {
      title: "GatePass No",
      dataIndex: "GPNO",
      // sorter: (a, b) => a.GPNO.length - b.GPNO.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <div className="dropdown action-label btn btn-white btn-sm btn-rounded">
            <i
              className={
                text.isApproved === "X"
                ? "far fa-dot-circle text-success"
                : ((text.isRejected === 'X') 
                ? "far fa-dot-circle text-danger" 
                : "far fa-dot-circle text-info")
              }
            />{" "}
            {text.isApproved === 'X' ? 'Approved' : (text.isRejected === 'X' ? 'Rejected' : 'Pending')}
        </div>
      ),
      // sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "GatePass Type",
      dataIndex: "GPTYP",
      // sorter: (a, b) => a.GPTYP.length - b.GPTYP.length,
    },
    {
      title: "Request Type",
      dataIndex: "REQTYP",
      // sorter: (a, b) => a.employeeshare.length - b.employeeshare.length,
    },
    {
      title: "Date",
      dataIndex: "GPDA",
      // sorter: (a, b) => a.organizationshare.length - b.organizationshare.length,
    },
    {
      title: "Time",
      dataIndex: "GPTIME",
      // sorter: (a, b) => a.organizationshare.length - b.organizationshare.length,
    },
    {
      title: "Expected Comeback Date",
      dataIndex: "EINDA",
      // sorter: (a, b) => a.organizationshare.length - b.organizationshare.length,
    },
    {
      title: "Time",
      dataIndex: "EINTIME",
      // sorter: (a, b) => a.organizationshare.length - b.organizationshare.length,
    },
    {
      title: "Visit Place",
      dataIndex: "VPLACE",
      // sorter: (a, b) => a.organizationshare.length - b.organizationshare.length,
    },
    {
      title: "Purpose",
      dataIndex: "PURPOSE1",
      // sorter: (a, b) => a.organizationshare.length - b.organizationshare.length,
    },
    {
      title: "Closed Date",
      dataIndex: "CLOSED_DATE",
      // sorter: (a, b) => a.organizationshare.length - b.organizationshare.length,
    }
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
    //           data-bs-target="#edit_pf"
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


  var table = [];

  gatePassData?.forEach((val, index) => {
    var temp = {};
    (temp.id = index);
      (temp.GPNO = val.GPNO);
      (temp.GPTYP = val.GPTYP);
      (temp.GPDA = val.GPDA);
      (temp.GPTIME = val.GPTIME);
      (temp.EINDA = val.EINDA);
      (temp.EINTIME = val.EINTIME);
      (temp.REQTYP = val.REQTYP);
      (temp.GPTYP = val.GPTYP);
      (temp.CLOSED_DATE = val.CLOSED_DATE);
      (temp.VPLACE = val.VPLACE);
      (temp.PURPOSE1 = val.PURPOSE1);
      (temp.status = {'isApproved' : val.APPROVE , 'isRejected' : val.REJECTED , 'isDeleted' : val.DEL}); // isDeleted will use later if need | exist in sap but not in portal
      table.push(temp);
  });

  

  return (
    <div className="main-wrapper">

      {
        isLoading && <ShaktiLoader/>
      }
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Gate Pass"
            // title="Dashboard"
            // subtitle="Provident Fund"
            modal="#create_gate_pass"
            name="Create Gate Pass"
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  className="table-striped mb-0"
                  columns={columns}
                  dataSource={table}
                  // rowKey={(record) => record.id}
                  pagination={{pageSize : '10'}}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>

      <CreateGatePass stateChange={changeParentState}/>
      {/* <EditPfModal /> */}
      {/* <DeleteModal Name="Delete Provident Fund" /> */}
    </div>
  );
};

export default GatePass;
