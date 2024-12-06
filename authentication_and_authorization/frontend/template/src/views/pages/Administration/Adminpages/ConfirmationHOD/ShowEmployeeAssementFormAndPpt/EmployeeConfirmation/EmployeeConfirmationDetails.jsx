import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Table } from "antd";
import axios from "axios";
import useAuth from "../../../../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ShaktiLoader from "../../../../../../../components/ShaktiLoader";

const EmployeeConfirmationDetails = () => {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const { checkCookie , isLoading, setIsLoading} = useAuth();
  const [formData,setFormData] = useState({
    employeeSapNumber:"",
    remarkText:"",
  });
  //Use effect for showing data just for testing
  useEffect(() => {
    console.log("Showing data to be send", apiData);
  }, [apiData]);

  useEffect(() => {
    setIsLoading(true);
    console.log("In useEffect");
    const checkCk = checkCookie("accessToken");
    if (checkCk.status === false) {
      return navigate("/");
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
          console.log(
            "Printing travel data in data.travel_data :: ",
            typeof data.data.data
          );
          setIsLoading(false);
          setApiData(data.data.data);
          return data;
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
    fetchData();
  }, []);

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
      dataIndex: "pernr",
      render: (text) => (
        <Link className="btn btn-sm btn-primary" to="/assesment-view" state={text + '-ppt'}>
          Generate PPT
        </Link>
      ),
    },
    {
      title: "Assessment Form",
      dataIndex: "pernr",
      render: (text) => (
        <Link className="btn btn-sm btn-primary" to="/assesment-view" state={text + '-assessment'}>
          Generate Form
        </Link>
      ),
    },
    {
      title: "Action",
      dataIndex: "pernr",
      render: (text) => (
        
        <Link
          className="btn btn-sm btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#create"
          onClick={() => {
            setFormData(
              () => (
                
                {
                  ...formData,
                  employeeSapNumber : text,
                }
              )
            );
          }}
        >
          Final Approval
        </Link>
      ),
    },
  ];

  async function sendRemarkAndConfirmation (event){
    setIsLoading(true);
    
    event.preventDefault();
   
    const cookieExists = checkCookie("accessToken");
    let cookieValue = cookieExists.cookie;
    cookieValue = cookieValue.split('=').at(1);
    console.log(JSON.stringify(formData));

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/admin/final-hod-remark`,
      headers: {
        'accesstoken': cookieValue,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(formData)
    };

    axios.request(config)
      .then((response) => {
        if(response.status == 200){
          console.log(response);
          withReactContent(Swal).fire({
            title: response.data.message,
            confirmButtonText: "Ok",
            cancelButtonText: "No",
            showCancelButton: false,
            preConfirm: () => {
              // trigger parent component re-rendering
              window.location.reload();
            },
          });
        }
        console.log(response.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    
  };

  return (


    <>

    {
      isLoading && <ShaktiLoader/>
    }
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            {apiData.length > 0 ? (
              <Table
                className="table-striped"
                style={{ overflowX: "auto" }}
                columns={columns}
                dataSource={apiData}
                // rowKey={(record) => record.id}
              />
            ) : (
              "Loading"
            )}
          </div>
        </div>
      </div>
      <div className="modal custom-modal fade" id="create" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Hod Remark</h3>
                <p>Sap Number : </p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="input-block mb-3 row">
                    Remark for final approval
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="type here"
                      onChange={(event) => {
                        setFormData(
                          () => (
                            console.log(event.target.value),
                            {
                              ...formData,
                              remarkText : event.target.value,
                            }
                          )
                        );
                      }}
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-6">
                    <button className="btn btn-primary continue-btn"
                    onClick={(event) => {
                      
                    
                      sendRemarkAndConfirmation(event); 
                    }}>
                      Approve
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
      {/* <EditSalaryModal />
      <DeleteModal Name="Delete Salary" /> */}
    </div>

    </>
  );
};

export default EmployeeConfirmationDetails;
