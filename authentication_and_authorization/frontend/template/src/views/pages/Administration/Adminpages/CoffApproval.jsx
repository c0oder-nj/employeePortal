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

const CoffApproval = () => {
  const { checkCookie, isLoading, setIsLoading } = useAuth();
  const navigate = useNavigate();
  var dataFetchedThroughApi = null;
  const [coffData, setCoffData] = useState([]);
  const [odData, setOdData] = useState([]);



  useEffect(() => {
    let cookieExists = checkCookie("accessToken");
    if (!cookieExists.status) {
      navigate("/");
    }

    const fetchData = async () => {
      setIsLoading(true);
      let value = cookieExists.cookie;
      value = value.split('=').at(1);
      const url = `${process.env.REACT_APP_BASE_URL}/api/admin/coff-listing`;

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
            if(response.response?.length == 0){
                withReactContent(Swal).fire({
                    title: "Right now, no Coff's are available for approval",
                    preConfirm: () => {
                      navigate("/employee-dashboard");
                    },
                  });
            }else{
              setIsLoading(false);
                setCoffData(response.response);
            }
          }

        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  }, []);





  async function fetchDataFromApproveReject(param) { 
    setIsLoading(true);

    const value = checkCookie('accessToken').cookie.split('=').at(1);

    console.log("Printing params here :: ", param);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/admin/coff-approval`,
      headers: { 
        'accesstoken': value, 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(param)
    };
    
    axios.request(config)
    .then((response) => {
      console.log("Printing response :: ", response.data);
      if(response.status == 200){
        withReactContent(Swal).fire({
          title : response.data.message,
          showCancelButton : false,
          showConfirmButton : true,
          confirmButtonText : "Ok",
          preConfirm : () => {
            window.location.reload();
          }
        })
      }else{
        withReactContent(Swal).fire({
          title : "Some error occured",
          showCancelButton : false,
          showConfirmButton : true,
          confirmButtonText : "Ok",
          preConfirm : () => {
            window.location.reload();
          }
        }) 
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
        title: "Name",
        dataIndex: "ename",
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
                    const params = {
                      "status" : 'X',
                      "applier" : text[3],
                      "coffDate" : text[4],
                      "applyDate" : text[5]
                    }
                    fetchDataFromApproveReject(params);
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
                    const params = {
                      "status" : 'Y',
                      "applier" : text[3],
                      "coffDate" : text[4],
                      "applyDate" : text[5]
                    }
                    fetchDataFromApproveReject(params);
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
      title: "Coff Date",
      dataIndex: "coff_date",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.from.length - b.from.length,
    },

    {
        title: "Apply Date",
        dataIndex: "apply_date",
        render: (text) => <span>{text}</span>,
        sorter: (a, b) => a.leavetype.length - b.leavetype.length,
    },

    {
      title: "Charge given to",
      dataIndex: "pernr2",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Create Date",
      dataIndex: "crt_dat",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Create Time",
      dataIndex: "crt_tims",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Leave Type",
      dataIndex: "leavetype",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
  ];

  var table = [];

  coffData?.forEach((val, index) => {
    var temp = {};
    (temp.id = index+1),
      (temp.ename = val.ename),
      (temp.pernr = val.pernr),
      (temp.coff_date = val.coff_date),
      (temp.apply_date = val.apply_date),
      (temp.indz = val.indz),
      (temp.iodz = val.iodz),
      (temp.totdz = val.totdz),
      (temp.pernr2 = val.pernr2),
      (temp.reason = val.reason),
      (temp.crt_dat = val.crt_dat),
      (temp.crt_tims = val.crt_tims),
      (temp.app_by = val.app_by),
      (temp.app = val.app),
      (temp.rej = val.rej),
      (temp.app_rej_dat = val.app_rej_dat),
      (temp.app_rej_tims = val.app_rej_tims),
      (temp.leavetype = val.leavetype),
      (temp.hr_tims = val.hr_tims),
      (temp.hr_dat = val.hr_dat),
      (temp.hr_id = val.hr_id),
      (temp.hr_terminal = val.hr_terminal),
      (temp.hr_app = val.hr_app),
      (temp.status = ["Pending", "Approve", "Reject", val.pernr, val.coff_date, val.apply_date]),
      table.push(temp);
  });
  return (
    <>

    {
      isLoading && <ShaktiLoader/>
    }
      {coffData?.length > 0 &&
        <div className="page-wrapper">
          <div className="content container-fluid">
            <Breadcrumbs
              maintitle="C-off"
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

export default CoffApproval;
