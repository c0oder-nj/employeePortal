/* eslint-disable no-unused-expressions */

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Table } from "antd";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import JwtTokenTimeExpire from "../../../../cookieTimeOut/jwtTokenTime";
import useAuth from "../../../../hooks/useAuth";
import axios from 'axios'
import ShaktiLoader from "../../../../components/ShaktiLoader";

const OdOtApproval = () => {
  const { checkCookie, isLoading, setIsLoading } = useAuth();
  const navigate = useNavigate();
  var dataFetchedThroughApi = null;
  const [odData, setOdData] = useState([]);
  const [gatePassData, setGatePassData] = useState([]);




  useEffect(() => {
    setIsLoading(true);
    let cookieExists = checkCookie("accessToken");
    if (!cookieExists.status) {
      navigate("/");
    }

    const fetchData = async () => {
      console.log("Printing Token :: ", cookieExists.cookie);
      let value = cookieExists.cookie;
      value = value.split('=').at(1);
      const url = `${process.env.REACT_APP_BASE_URL}/api/admin/odot-listing`;

      dataFetchedThroughApi = await fetch(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'accesstoken': value
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          
          if (response.status == false) {
            if (response.type == "Token Expired") {
              // handleLogout();
              JwtTokenTimeExpire();
              navigate('/logout');
              return;
            }else{
                console.log(response.data);
                withReactContent(Swal).fire({
                    title: response.data,
                    preConfirm: () => {
                      navigate("/employee-dashboard");
                    },
                  });
            }
          }else{
            if(response.data?.length == 0){
                withReactContent(Swal).fire({
                    title: "Right now, no Od/Ot trip are availabe for approval.",
                    preConfirm: () => {
                      navigate("/employee-dashboard");
                    },
                  });
            }else{
                setIsLoading(false);
                setOdData(response.data);
            }
          }

        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  }, []);





  async function fetchDataFromApproveReject(action, odplant) { 
    setIsLoading(true);
    console.log("Flow come here, printing params :: ", action, odplant);
    let isCookie = checkCookie('accessToken');
    let value = isCookie.cookie;
    value = value.split('=').at(1); // since it is in the form of accessToken=the_access_token | so we split it and get token only
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/admin/odot-approval?odplant=${odplant}&action=${action}`,
      headers: {
        'accessToken': value
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if(response.status == 200){
          setIsLoading(false);
            withReactContent(Swal).fire({
                title: response.data.msg,
                confirmButtonText: "Ok",
                cancelButtonText: "No",
                showCancelButton: false,
                preConfirm: () => {
                  window.location.reload();
                },
              });
        }else{
          setIsLoading(false);
            withReactContent(Swal).fire({
                title: "Some Error Occured",
                confirmButtonText: "Ok",
                cancelButtonText: "No",
                showCancelButton: false
              });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const columns = [
    {
      title: "Index",
      dataIndex: "id",
      render: (text, record) => <span className="table-avatar">{text}</span>, //{text.replace(/^0+/, '')}
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: "Application No",
        dataIndex: "odno",
        render: (text) => <span>{text}</span>,
        sorter: (a, b) => a.leavetype.length - b.leavetype.length,
    },

    {
      title: "Action",
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
                text[0] === "Pending"
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
            <button
              className="dropdown-item"
              onClick={(event) => {

                withReactContent(Swal).fire({
                  title: "Do you want to Approve Od/Ot?",
                  confirmButtonText: "Yes, Approve it",
                  cancelButtonText: "No",
                  showCancelButton: true,
                  preConfirm: () => {
                    fetchDataFromApproveReject("approve", text[3]);
                  },
                });

              }}
            >
              <i className="far fa-dot-circle text-success" /> Approve
            </button>
            <button
              className="dropdown-item"
              onClick={() => {
                withReactContent(Swal).fire({
                  title: "Do you want to Reject Od/Ot?",
                  confirmButtonText: "Yes, Reject it.",  // Custom confirm button text
                  cancelButtonText: "No",        // Custom cancel button text
                  showCancelButton: true,                 // Shows the cancel button
                  preConfirm: () => {
                    fetchDataFromApproveReject("reject", text[3]);
                  },
                });

              }}
            >
              <i className="far fa-dot-circle text-danger" /> Reject
            </button>
          </div>
        </div>
      ),
      sorter: (a, b) => a.status.length - b.status.length,
    },
    
    {
      title: "Name",
      dataIndex: "ename",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.from.length - b.from.length,
    },

    {
        title: "Plant",
        dataIndex: "plant",
        render: (text) => <span>{text}</span>,
        sorter: (a, b) => a.leavetype.length - b.leavetype.length,
    },
    
    
    // {
    //   title: "Count",
    //   dataIndex: "horo",
    //   render: (text) => <span>{text}</span>,
    //   sorter: (a, b) => a.to.length - b.to.length,
    // },

    {
      title: "Start Date",
      dataIndex: "odstdateC",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.noofdays.length - b.noofdays.length,
    },

    {
      title: "End Date",
      dataIndex: "odedateC",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Attendance Status",
      dataIndex: "atnStatus",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Visit Place",
      dataIndex: "vplace",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Purpose",
      dataIndex: "purpose1",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    // {
    //   title: "Direct/Indirect",
    //   dataIndex: "directIndirect",
    //   render: (text) => <span>{text}</span>,
    //   sorter: (a, b) => a.reason.length - b.reason.length,
    // }
  ];

  var table = [];

  odData.forEach((val, index) => {
    var temp = {};
    (temp.id = index+1),
      (temp.odno = val.odno.split('/').at(0)),
      (temp.plant = val.odno.split('/').at(1)),
      (temp.ename = val.ename),
      (temp.horo = val.horo),
      (temp.odstdateC = val.odstdateC),
      (temp.odedateC = val.odedateC),
      (temp.atnStatus = val.atnStatus),
      (temp.vplace = val.vplace),
      (temp.purpose1 = val.purpose1),
      (temp.purpose2 = val.purpose2),
      (temp.purpose3 = val.purpose3),
      (temp.remark = val.remark),
      (temp.directIndirect = val.directIndirect),
      (temp.status = ["Pending", "Approve", "Reject", val.odno]),
      table.push(temp);
  });
  return (
    <>

    {
      isLoading && <ShaktiLoader/>
    }

      {odData?.length > 0 &&
        <div className="page-wrapper">
          <div className="content container-fluid">
            <Breadcrumbs
              maintitle="Od/Ot"
              title="Dashboard"
              subtitle="Approval"
            // modal="#add_leave"
            // name="Add Leave"
            />
            {/* /Leave Statistics */}
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  {/* <SearchBox /> */}
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
        </div>
      }
    </>
  );
};

export default OdOtApproval;
