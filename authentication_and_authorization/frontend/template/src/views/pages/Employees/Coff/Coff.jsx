import React, { useEffect, useState } from "react";
import Header from "../../../layout/Header";
import Sidebar from "../../../layout/Sidebar";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Table } from "antd";
import { DatePicker } from "antd";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";


const Coff = () => {
  const { checkCookie } = useAuth();
  const navigate = useNavigate();
  const [cOffData, setcOffData] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [table, setTable] = useState([]);
  const [showTable, setShowTable] = useState([]);
  

  const [formData, setFormData] = useState({
    responsiblePersonSap: "",
    coffDate: "",
    appliedDate: "",
    reason: "",
    leaveType: "",
  });
  const typeSelection = [
    { value: "", label: "Select" },
    { value: "Half Day", label: "Half Day" },
    { value: "Full Day or More", label: "Full Day or More" },
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };
  const changeParentState = () => {
    console.log("Inside parent component called from child component");
    setIsCreated((prev) => !prev);
  };

  
  useEffect(() => {
    const fetchData = async () => {
      const tokenResult = checkCookie("accessToken");
      if (!tokenResult.status) {
        navigate("/");
        return false;
      }

      let cookie = tokenResult.cookie.split("=").at(1);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/employee/coff-list`,
          {
            method: "GET",
            headers: {
              accesstoken: cookie,
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

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

    fetchData().then((data) => {
      console.log("Fetched data: ", data.data.response);
      if(data.data.response.length==0){
        withReactContent(Swal).fire({
          title: "You have no C-OFF in your account",
          preConfirm: () => {
            navigate("/employee-dashboard");
          },
        });
      }
      setcOffData(data.data.response);
    });
  }, []);

  
  useEffect(() => {
    let tempTable = [];
    cOffData?.forEach((val, index) => {
      let temp = {};
      temp.id = index;
      temp.begdat = val.begdat;
      temp.enddat = val.enddat;
      temp.indz = val.indz;
      temp.iodz = val.iodz;
      temp.totdz = val.totdz;
      temp.status_text=val.status_text;
      tempTable.push(temp);
    });
    setTable(tempTable);
  }, [cOffData]);

  
  const parseDate = (dateString) => {
    console.log("Date string in parsed date :: ", dateString);
    const parts = dateString.split(".");
    // console.log("date parts :: ", parts);
    return new Date(parts[2], parts[1] - 1, parts[0], 0, 0, 0, 0); // Convert 'DD.MM.YYYY' to a Date object
  };

  const handleSearch = () => {
    console.log("Start date", start);
    console.log("End date", end);

    let results = table;

    if (start) {
      const formattedStartDate = new Date(start);
      results = results.filter((f) => {
        const recordDate = parseDate(f.odstdate_c);
        return recordDate >= formattedStartDate;
      });
    }

    if (end) {
      const formattedEndDate = new Date(end);
      console.log("Formatted End Date:", formattedEndDate);

      results = results.filter((f) => {
        const recordDate = parseDate(f.odedate_c);
        return recordDate <= formattedEndDate;
      });
    }
    if (start > end) {
      withReactContent(Swal).fire({
        title: "End date is greater than start date",
        preConfirm: () => {
          setStart();
          setEnd();
        },
      });
    }
    console.log("Filtered results length:", results.length);
    setShowTable(results);
  };

  
  useEffect(() => {
    handleSearch();
  }, [start, end, table]);

  const columns = [
    
    {
      title: "Start Date",
      dataIndex: "begdat",
    },
    {
      title: "End Date",
      dataIndex: "enddat",
    },
    ,
    {
      title: "In Time",
      dataIndex: "indz",
    },
    {
      title: "Out Time",
      dataIndex: "iodz",
    },
    {
      title: "Action",
      id: "pernr",
      render: (id) =>
        id.status_text == "Pending"? (
          ""
        ) : (
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
              <button
                className="dropdown-item "
                data-bs-toggle="modal"
                data-bs-target="#create"
                onClick={() => {
                  setFormData(
                    () => (
                      console.log(id.begdat),
                      {
                        ...formData,
                        coffDate: id.begdat.split('.')[2]+id.begdat.split('.')[1]+id.begdat.split('.')[0],
                      }
                    )
                  );
                }}
              >
                {" "}
                Apply for C-OFF
              </button>
            </div>
          </div>
        ),
    },
    {
      title: "Status",
      dataIndex: "status_text",
      render: (text) => (
        <div className="dropdown action-label btn btn-white btn-sm btn-rounded">
          <i
            className={
              text === "New C-off"
                ? "far fa-dot-circle text-success"
                : text === "Pending"
                ? "far fa-dot-circle text-info"
                : "far fa-dot-circle text-danger"
            }
          />{" "}
          {text === "New C-off"
            ? "New C-OFF"
            : text === "Pending"
            ? "Pending"
            : "Rejected"}
        </div>
      ),
    }
  ];

  

  useEffect(()=>{
    console.log(JSON.stringify(formData));
  },[formData]);

  const senddata = async ()=>{
    const tokenResult = checkCookie("accessToken");
      if (!tokenResult.status) {
        navigate("/");
        return false;
      }  
      let cookie = tokenResult.cookie.split("=").at(1);
    
    console.log("You are in send data");
     
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/employee/coff-application`,
      headers: { 
        'accessToken': cookie, 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify(formData)
    };
      axios.request(config)
  .then((response) => {
    // console.log(JSON.stringify(response.data));
    withReactContent(Swal).fire({
      title: response.data.data.message,
      preConfirm: () => {
        navigate("/employee-dashboard");
      },
    });
  })
  }


  return (
    <div className="main-wrapper">
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="C-OFF"
          />
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <div className="input-block form-focus focused">
                <div className="cal-icon focused">
                  <DatePicker
                    className="form-control floating datetimepicker"
                    selected={start}
                    onChange={(e) => setStart(e)}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
                <label className="focus-label">From</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="input-block form-focus focused">
                <div className="cal-icon focused">
                  <DatePicker
                    className="form-control floating datetimepicker"
                    selected={end}
                    onChange={(e) => setEnd(e)}
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
                <label className="focus-label">To</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                {showTable.length > 0 ? (
                  <Table
                    className="table-striped mb-0"
                    columns={columns}
                    dataSource={showTable}
                    pagination={{ pageSize: "10" }}
                  />
                ) : (
                  <>Loading...</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal custom-modal fade" id="create" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Are you sure want to create trip for?</h3>
                <p>C-Off Date : {formData.coffDate} </p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="input-block mb-3 row">
                    Responsible Person
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="type Sap ID"
                      onChange={(event) => {
                        setFormData(() => ({
                          ...formData,
                          responsiblePersonSap: event.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-block mb-3 row">
                    Reason
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Reason"
                      required
                      onChange={(event) => {
                        setFormData(() => ({
                          ...formData,
                          reason: event.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6" >
                    <div className="input-block form-focus focused" style={{marginLeft : "5%"}}>
                      <div className="cal-icon focused">
                        <DatePicker
                          className="form-control floating datetimepicker"
                          selected={end}
                          onChange={(e) => {
                            console.log(e);
                        setFormData(() => ({
                          ...formData,
                          // appliedDate: e.$D+"."+((e.$M + 1).toString().padStart(2, '0'))+"."+e.$y,
                          appliedDate: e.$y+((e.$M + 1).toString().padStart(2, '0'))+e.$D,
                        }));
                      }}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                      <label className="focus-label">Applying Date</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="input-block mb-3" style={{marginLeft : "3%"}}> 
                      <label className="col-form-label">Attendance Status</label>

                      <Select
                        placeholder=""
                        // onChange={setSelectedOption}
                        value={typeSelection.find(option => option.value === formData.leaveType) || typeSelection[0]}
                        options={typeSelection}
                        styles={customStyles}
                        className="select"
                        required
                        onChange={(event) => {
                          setFormData(() => ({
                            ...formData,
                            leaveType: event.value,
                          }));
                        }}
                      />
                    </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    {/* <Link to="#" className="btn btn-primary continue-btn">
                      Delete
                    </Link> */}

                    <button
                      className="btn btn-primary continue-btn"
                      onClick={() => {
                        // console.log(setDelete);
                        // CreateTripData(
                        //   createTrip,
                        //   formData.purposeText,
                        //   formData.outComingText
                        // );
                        senddata();
                      }}
                    >
                      Submit
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

      {/* <CreateOdOT stateChange={changeParentState} /> */}
    </div>
  );
};

export default Coff;
