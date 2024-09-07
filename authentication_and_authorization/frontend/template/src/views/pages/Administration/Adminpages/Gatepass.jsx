/* eslint-disable no-unused-expressions */

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Table } from "antd";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import JwtTokenTimeExpire from "../../../../cookieTimeOut/jwtTokenTime";
import useAuth from "../../../../hooks/useAuth";
import axios from 'axios'

const GatePass = () => {
  const { checkCookie } = useAuth();
  const navigate = useNavigate();
  var dataFetchedThroughApi = null;
  const [gatePassData, setGatePassData] = useState([]);




  useEffect(() => {
    let cookieExists = checkCookie("accessToken");
    if (!cookieExists.status) {
      navigate("/");
    }

    const fetchData = async () => {
      console.log("Printing Token :: ", cookieExists.cookie);
      let value = cookieExists.cookie;
      value = value.split('=').at(1);
      const url = `${process.env.REACT_APP_BASE_URL}/api/admin/gate-pass-listing`;

      dataFetchedThroughApi = await fetch(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'accesstoken': value
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.DATA, typeof data.DATA);
          if (data.status == false) {
            if (data.type == "Token Expired") {
              // handleLogout();
              JwtTokenTimeExpire();
              navigate('/logout');
              return;
            }
          };
          if (data.DATA.length == 0) {
            withReactContent(Swal).fire({
              title: "Right now, no Gatepasses are availabe for approval",
              preConfirm: () => {
                navigate("/employee-dashboard");
              },
            });
          }
          setGatePassData(data.DATA);

        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  }, []);





  async function fetchDataFromApproveReject(option, type) { // 1 stands to approve | 0 stands to reject the gate pass
    console.log("Flow come here, printing params :: ", option, type);
    let isCookie = checkCookie('accessToken');
    let value = isCookie.cookie;
    value = value.split('=').at(1); // since it is in the form of accessToken=the_access_token | so we split it and get token only
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/admin/approve-reject?status=${option}&pernr=${type[2]}&gpno=${type[3]}`,
      headers: {
        'accessToken': value
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.status) {
          // Toastify({
          //   text: response.data.msg,
          //   duration: 3000,
          //   close: true,
          //   gravity: "top",
          //   position: "center",
          //   backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          // }).showToast();

          withReactContent(Swal).fire({
            title: response.data.msg,
            confirmButtonText: "Ok",
            cancelButtonText: "No",
            showCancelButton: false,
            preConfirm: () => {
              window.location.reload();
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const columns = [
    {
      title: "Gate Pass Number",
      dataIndex: "gpno",
      render: (text, record) => <span className="table-avatar">{text}</span>, //{text.replace(/^0+/, '')}
      sorter: (a, b) => a.name.length - b.name.length,
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
            <button
              className="dropdown-item"
              onClick={(event) => {

                withReactContent(Swal).fire({
                  title: "Do you want to Approve GatePass?",
                  confirmButtonText: "Yes, Approve it",
                  cancelButtonText: "No",
                  showCancelButton: true,
                  preConfirm: () => {
                    fetchDataFromApproveReject(1, text);
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
                  title: "Do you want to Reject Gate pass?",
                  confirmButtonText: "Yes, Reject it.",  // Custom confirm button text
                  cancelButtonText: "No",        // Custom cancel button text
                  showCancelButton: true,                 // Shows the cancel button
                  preConfirm: () => {
                    fetchDataFromApproveReject(0, text);
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
      title: "Plant",
      dataIndex: "werks",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.leavetype.length - b.leavetype.length,
    },
    {
      title: "Name",
      dataIndex: "ename",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.leavetype.length - b.leavetype.length,
    },

    {
      title: "SAP Id",
      dataIndex: "pernr",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.from.length - b.from.length,
    },
    {
      title: "Gate Pass Date",
      dataIndex: "gpdat1",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.to.length - b.to.length,
    },

    {
      title: "Gate Pass Time",
      dataIndex: "gptime1",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.noofdays.length - b.noofdays.length,
    },

    {
      title: "Expected return date",
      dataIndex: "eindat",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Expected Return Time",
      dataIndex: "eintime",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Request Type",
      dataIndex: "reqtype_txt",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Gate Pass Type",
      dataIndex: "gptype_txt",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Charge Given",
      dataIndex: "charge_given",
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
  ];

  var table = [];

  gatePassData.forEach((val, index) => {
    var temp = {};
    (temp.id = index),
      (temp.ename = val.ename),
      (temp.gpno = val.gpno),
      (temp.gpdat1 = val.gpdat1),
      (temp.gptime1 = val.gptime1),
      (temp.pernr = val.pernr),
      (temp.status = ["Pending", "Approved", val.pernr, val.gpno]),
      (temp.werks = val.werks),
      (temp.eindat = val.eindat),
      (temp.eintime = val.eintime),
      (temp.reqtype_txt = val.reqtype_txt),
      (temp.gptype_txt = val.gptype_txt),
      (temp.charge_given = val.charge_given),
      (temp.vplace = val.vplace),
      (temp.purpose1 = val.purpose1),
      table.push(temp);
  });
  return (
    <>
      {gatePassData?.length > 0 &&
        <div className="page-wrapper">
          <div className="content container-fluid">
            <Breadcrumbs
              maintitle="Gate Pass"
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

export default GatePass;
