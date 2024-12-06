import React, { useEffect, useState } from "react";
import Header from "../../../layout/Header";
import Sidebar from "../../../layout/Sidebar";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import { Table } from "antd";
import { DatePicker } from "antd";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CreateOdOT from "./CreateOdOt";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ShaktiLoader from "../../../../components/ShaktiLoader";
import SweetAlert from "../../Ui_Interface/Components/SweetAlert";
const OdOt = () => {
  const { checkCookie, isLoading, setIsLoading } = useAuth();
  const navigate = useNavigate();
  const [oDoTData, setOdOtData] = useState([]);
  const [isCreated, setIsCreated] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [table, setTable] = useState([]);
  const [showTable, setShowTable] = useState([]);

  const changeParentState = () => {
    console.log("Inside parent component called from child component");
    setIsCreated((prev) => !prev);
  };

  // Fetch data on component mount
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const tokenResult = checkCookie("accessToken");
      if (!tokenResult.status) {
        navigate("/");
        return false;
      }

      let cookie = tokenResult.cookie.split("=").at(1);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/employee/odot-show-employee`,
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
      console.log("Fetched data: ", data);
      setIsLoading(false);
      setOdOtData(data);
    });
  }, []);

  // Build the table data based on the fetched oDoTData
  useEffect(() => {

    let tempTable = [];
    oDoTData?.forEach((val, index) => {
      let temp = {};
      temp.id = index;
      temp.odno = val.odno.split("/")[0];
      temp.odno1 = val.odno.split("/")[1];
      temp.atn_status = val.atn_status;
      temp.odaprdt_c = val.odaprdt_c;
      temp.odstdate_c = val.odstdate_c;
      temp.odedate_c = val.odedate_c;
      temp.vplace = val.vplace;
      temp.purpose1 = val.purpose1;
      tempTable.push(temp);
    });
    setTable(tempTable);
  }, [oDoTData]);

  // Helper function to convert date strings (in DD.MM.YYYY) to Date objects
  const parseDate = (dateString) => {
    console.log("Date string in parsed date :: ", dateString)
    const parts = dateString.split('.');
    // console.log("date parts :: ", parts);
    return new Date(parts[2], parts[1] - 1, parts[0],0, 0, 0, 0); // Convert 'DD.MM.YYYY' to a Date object
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
    if(start > end){
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

  // Re-run the search whenever the start date, end date, or table data changes
  useEffect(() => {
    handleSearch();
  }, [start, end, table]);

  const columns = [
    {
      title: "Od Number",
      dataIndex: "odno",
    },
    {
      title: "Plant Number",
      dataIndex: "odno1",
    },
    {
      title: "Type",
      dataIndex: "atn_status",
      render: (text) => (
        <div className="dropdown action-label btn btn-white btn-sm btn-rounded">
          {text === "T" ? "Tour" : "OD"}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "odaprdt_c",
      render: (text) => (
        <div className="dropdown action-label btn btn-white btn-sm btn-rounded">
          <i
            className={
              text === "Approved"
                ? "far fa-dot-circle text-success"
                : text === "Not App"
                ? "far fa-dot-circle text-danger"
                : "far fa-dot-circle text-info"
            }
          />{" "}
          {text === "Approved"
            ? "Approved"
            : text === "Not App"
            ? "Rejected"
            : "Pending"}
        </div>
      ),
    },
    {
      title: "Date from",
      dataIndex: "odstdate_c",
    },
    {
      title: "Date to",
      dataIndex: "odedate_c",
    },
    {
      title: "Place",
      dataIndex: "vplace",
    },
    {
      title: "Purpose",
      dataIndex: "purpose1",
    },
  ];

  return (
    <div className="main-wrapper">

      {
        isLoading && <ShaktiLoader/>
      }

      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Official Duty/Trip"
            modal="#create_od_ot"
            name="Create OD/OT"
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
                  <>
                    <p>No data found for your record</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateOdOT stateChange={changeParentState} />
    </div>
  );
};

export default OdOt;
