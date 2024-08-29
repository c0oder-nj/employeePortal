/* eslint-disable no-unused-expressions */

import { Table } from "antd";
import { AddHoliday } from "../../../components/modelpopup/AddHoliday";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import DeleteModal from "../../../components/modelpopup/DeleteModal";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { base_url } from "../../../base_urls";
import user from "../../../user";
import { AuthProvider } from "../../../cookieTimeOut/jwtTokenTime";
import JwtTokenTimeExpire from "../../../cookieTimeOut/jwtTokenTime";
const Holidays = () => {
  const [users, setUsers] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const navigate = useNavigate();
  var holidaysArray;

    function checkCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
        const accesstoken = cookie.split('=')[1];
        return { status: true, accesstoken };
      }
    }
    return { status: false, accesstoken: null };
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      const tokenResult = checkCookie('accessToken');
      if (!tokenResult.status) {
        navigate('');
        return false;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/employee/holidays`, {
          method: 'GET',
          headers: {
            'accesstoken': tokenResult.accesstoken,
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
      if(data.status==false){
        if(data.type=="Token Expired"){
          console.log("Line 305",data);
            // handleLogout();
            JwtTokenTimeExpire();
            navigate('/logout');
            return;
        }
      }
      console.log("when fetchdata completes :: ", data.data);
      setHolidays(data.data)
    })
    
    
  }, []);

  console.log("Printing holidays :: ", holidaysArray);
  var userElements;
  if(holidays.length > 0){
    userElements = holidays?.map((holiday, index) => (
      {
      key: index,
      // id: holiday.,
      id: index+1, 
      Title: holiday.LTEXT,
      HolidayDate: holiday.DATUM,
      Day: holiday.DAY,
    }));
    
  }


  const columns = [
    {
      title: "Index",
      dataIndex: "id",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "Title",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.Title.length - b.Title.length,
    },
    {
      title: "HolidayDate",
      dataIndex: "HolidayDate",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.HolidayDate.length - b.HolidayDate.length,
    },
    {
      title: "Day",
      dataIndex: "Day",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.Day.length - b.Day.length,
    },
    // {
    //   title: "Action",
    //   render: () => (
    //     <div className="dropdown dropdown-action ">
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
    //           data-bs-target="#edit_holiday"
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

  return (
    <>
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Holidays"
            title="Dashboard"
            subtitle="Holidays"
          />

          {/* /Page Header */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={userElements?.length > 0 ? userElements : []}
                  className="table-striped"
                  rowKey={(record) => record.id}
                  pagination={{pageSize : '15'}}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
      <AddHoliday />
      <DeleteModal Name="Delete Holiday" />
    </>
  );
};

export default Holidays;
