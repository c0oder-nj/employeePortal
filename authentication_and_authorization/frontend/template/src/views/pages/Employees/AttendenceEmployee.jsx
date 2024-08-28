import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import SearchBox from "../../../components/SearchBox";
import Breadcrumbs from "../../../components/Breadcrumbs";
// import AttendanceEmployeeFilter from "../../../components/AttendanceEmployeeFilter";
import { base_url } from "../../../base_urls";
import { useNavigate } from "react-router-dom";
import AllEmployeeAddPopup from "../../../components/modelpopup/AttendanceCorrection";
import JwtTokenTimeExpire from "../../../cookieTimeOut/jwtTokenTime";

const AttendanceEmployee = () => {
  const [users, setUsers] = useState([]);
  const [dailyPunchIn, setDailyPunchIn] = useState([]);
  const [data, setData] = useState([]);
  const [sap, setSap] = useState(null);
  const [isData, setIsData] = useState(false);
  const [today, setToday] = useState({});
  const [page,setPage] = useState(10);
  var todayDate, todayPunchIn, todayPunchOut;
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();
  var dataFetchedThroughApi;

  function checkCookie(cookieName) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + "=")) {
        return true;
      }
    }
    return false;
  }
  function fetchWeekData() {
    function parseDate(d) {
      const [day, month, year] = d.split(".");
      return new Date(`${year}-${month}-${day}T00:00:00Z`);
    }

    const today = new Date();
    const currentDay = today.getDay();
    const lastMon = new Date(today);
    lastMon.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    lastMon.setUTCHours(0, 0, 0, 0);

    const endD = new Date(today);
    endD.setDate(today.getDate() - 1);
    endD.setUTCHours(0, 0, 0, 0);

    const filtData = data.filter((entry) => {
      const entryDate = parseDate(entry.begdat);
      const dayOfWeek = entryDate.getDay();
      return entryDate >= lastMon && entryDate <= endD && dayOfWeek !== 0;
    });

    function parseTotSeconds(tot) {
      const [h, m, s] = tot.split(":").map(Number);
      return h * 3600 + m * 60 + s;
    }

    function calcTotalSeconds(filtData) {
      let totSecs = 0;

      filtData.forEach((entry) => {
        const workedSecs = parseTotSeconds(entry.totdz);
        totSecs += workedSecs;
      });

      return totSecs;
    }

    const totSecs = calcTotalSeconds(filtData);
    const totHours = Math.floor(totSecs / 3600);
    const remSecsAfterHours = totSecs % 3600;
    const totMins = Math.floor(remSecsAfterHours / 60);
    const remSecs = remSecsAfterHours % 60;

    console.log(
      `Total hours worked this week: ${String(totHours).padStart(
        2,
        "0"
      )}:${String(totMins).padStart(2, "0")}:${String(remSecs).padStart(
        2,
        "0"
      )}`
    );
    users.push({
      title: "This Week",
      value: String(totHours).padStart(2, "0"),
      valuespan: "/48 hrs",
      // progressWidth: "30%",
      // progressBarColor: "bg-success"
      progressWidth: String((totHours / 48) * 100) + "%",
      progressBarColor:
        (totHours / 48) * 100 > 75
          ? "bg-success"
          : (totHours / 48) * 100 > 50
          ? "bg-primary"
          : "bg-danger",
    });
  }

  function fetchMonthData() {
    function parseDate(d) {
      const [day, month, year] = d.split(".");
      return new Date(`${year}-${month}-${day}T00:00:00Z`);
    }

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const filtData = data.filter((entry) => {
      const entryDate = parseDate(entry.begdat);
      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear &&
        entryDate < today
      );
    });

    function parseTotSeconds(tot) {
      const [h, m, s] = tot.split(":").map(Number);
      return h * 3600 + m * 60 + s;
    }

    function calcTotalSeconds(filtData) {
      let totSecs = 0;

      filtData.forEach((entry) => {
        const workedSecs = parseTotSeconds(entry.totdz);
        totSecs += workedSecs;
      });

      return totSecs;
    }

    const totSecs = calcTotalSeconds(filtData);
    const totHours = Math.floor(totSecs / 3600);
    const remSecsAfterHours = totSecs % 3600;
    const totMins = Math.floor(remSecsAfterHours / 60);
    const remSecs = remSecsAfterHours % 60;

    // console.log(`Total hours worked this month (excluding today): ${String(totHours).padStart(2, '0')}:${String(totMins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`);
    users.push({
      title: "This Month",
      value: String(totHours).padStart(2, "0"),
      valuespan: "/240 hrs",
      // progressWidth: "30%",
      progressWidth: String((totHours / 240) * 100) + "%",
      progressBarColor:
        (totHours / 240) * 100 > 75
          ? "bg-success"
          : (totHours / 240) * 100 > 50
          ? "bg-primary"
          : "bg-danger",
    });
  }

  function fetchreaminingtime() {
    function parseDate(d) {
      const [day, month, year] = d.split(".");
      return new Date(`${year}-${month}-${day}T00:00:00Z`);
    }

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const filtData = data.filter((entry) => {
      const entryDate = parseDate(entry.begdat);
      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear &&
        entryDate < today
      );
    });

    function parseTotSeconds(tot) {
      const [h, m, s] = tot.split(":").map(Number);
      return h * 3600 + m * 60 + s;
    }

    function calcTotalSeconds(filtData) {
      let totSecs = 0;
      let bucket = 120 * 60; // 120 minutes in seconds

      filtData.forEach((entry) => {
        const workedSecs = parseTotSeconds(entry.totdz);
        const expectedSecs = 8 * 3600; // 8 hours in seconds

        if (workedSecs > 0 && workedSecs < expectedSecs) {
          const deficit = expectedSecs - workedSecs;
          if (bucket >= deficit) {
            bucket -= deficit;
          }
        }
        totSecs += workedSecs;
      });

      return { totSecs, bucket };
    }

    const { totSecs, bucket } = calcTotalSeconds(filtData);
    const totHours = Math.floor(totSecs / 3600);
    const remSecsAfterHours = totSecs % 3600;
    const totMins = Math.floor(remSecsAfterHours / 60);
    const remSecs = remSecsAfterHours % 60;
    const remBucketMins = Math.floor(bucket / 60);

    console.log(
      `Total hours worked this month (excluding today): ${String(
        totHours
      ).padStart(2, "0")}:${String(totMins).padStart(2, "0")}:${String(
        remSecs
      ).padStart(2, "0")}`
    );
    console.log(`Remaining minutes in the bucket: ${remBucketMins}`);
    users.push({
      title: "Remaining Time",
      value: String(remBucketMins).padStart(2, "0"),
      valuespan: "/120 hrs",
      // progressWidth: "30%",
      progressWidth: String((remBucketMins / 120) * 100) + "%",
      progressBarColor:
        (totHours / 120) * 100 > 75
          ? "bg-success"
          : (totHours / 120) * 100 > 50
          ? "bg-primary"
          : "bg-danger",
    });
  }
  useEffect(() => {
    let cookieExists = checkCookie("accessToken");
    if (!cookieExists) {
      navigate("/");
    }

    const fetchData = async () => {
      //Fetching data for attendance
      const value = `${document.cookie}`;
      console.log(value);

      const url = `${process.env.REACT_APP_BASE_URL}/api/DailyAttendance/employeeDailyAttendnceStatus?value=${value}`;
      console.log("Base uri for daily attendance:: ", url);

      dataFetchedThroughApi = await fetch(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status == false) {
            if (data.type == "Token Expired") {
              console.log("Line 305", data);
              // handleLogout();
              JwtTokenTimeExpire();
              navigate("/logout");
              return;
            }
          }

          setData(data.employeeAttendance);
          setSap(data.sapNumber);
          setIsData(true);

          return data;
        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  }, []);

  if (data.length > 0 && isData) {
    console.log(data[0]);
    todayDate = data[0].begdat;
    todayPunchIn = data[0].indz;
    todayPunchOut = data[0].iodz;
    setToday({
      todayDate: data[0].begdat,
      todayPunchIn: data[0].indz,
      todayPunchOut: data[0].iodz,
    });
    console.log(todayDate, todayPunchIn, todayPunchOut);
    fetchWeekData();
    fetchMonthData();
    fetchreaminingtime();
    setIsData(false);
  }

  const userElements = data?.map((user, index) => ({
    key: index,
    // id: user.id,
    id:
      user.day === "1"
        ? "Monday"
        : user.day === "2"
        ? "Tuesday"
        : user.day === "3"
        ? "Wednesday"
        : user.day === "4"
        ? "Thursday"
        : user.day === "5"
        ? "Friday"
        : user.day === "6"
        ? "Saturday"
        : user.day === "7"
        ? "Sunday"
        : "Other Day",
    Date: user.begdat,
    PunchIn: user.indz,
    PunchOut: user.iodz,
    Production: user.Production,
    // Break: user.Break,
    attendanceStatus:
      "" === user.atn_status
        ? "Absent (" + user.leave_typ + ")"
        : user.atn_status,
    Break: "Half Hour",
    // Overtime: user.Overtime,
    LateMin: user.late_min,
  }));
  // let newUserElement = userElements;
  const [newUserElement,setNewUserElement] = useState(userElements);
  
  const entriesChange = (e) => {
    const newFilteredData = userElements.slice(0, e.target.value);
    setPage(e.target.value);
    // newUserElement = newFilteredData;
    setNewUserElement(newFilteredData);
    console.log("Filter value and data ", e.target.value, newFilteredData);
  };

  const columns = [
    {
      title: "Day",
      dataIndex: "id",
      sorter: (a, b) => a.id.length - b.id.length,
    },
    {
      title: "Date",
      dataIndex: "Date",
      sorter: (a, b) => a.Date.length - b.Date.length,
    },
    {
      title: "PunchIn",
      dataIndex: "PunchIn",
      sorter: (a, b) => a.PunchIn.length - b.PunchIn.length,
    },
    {
      title: "PunchOut",
      dataIndex: "PunchOut",
      sorter: (a, b) => a.PunchOut.length - b.PunchOut.length,
    },
    // {
    //   title: "Break",
    //   dataIndex: "Break",
    //   sorter: (a, b) => a.Break.length - b.Break.length,
    // },
    {
      title: "Late Minute",
      dataIndex: "LateMin",
      sorter: (a, b) => a.Overtime.length - b.Overtime.length,
    },
    {
      title: "Attendance status",
      dataIndex: "attendanceStatus",
      sorter: (a, b) => a.Overtime.length - b.Overtime.length,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_BASE_URL}/api/job/emp-punch-data?sapId=5054`;
      // console.log("Attendance employee url :: ",url);
      await fetch(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setDailyPunchIn(data);
          return data;
        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  }, []);
  const date = new Date();
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  return (
    <>
      <div className="page-wrapper">
        {/* /Page Header */}
        <div className="content container-fluid">
          <Breadcrumbs
            modal="#add_employee_attendance_correction"
            name="Attendance Correction Request"
            Linkname="/attendance-employee"
          />

          {/* /Page Header */}
          <div className="row">
            <div className="col-md-4">
              <div className="card punch-status">
                <div className="card-body">
                  <h5 className="card-title">
                    Timesheet{" "}
                    <small className="text-muted">{today.todayDate}</small>
                  </h5>
                  <div className="punch-det">
                    <h6>Punch In at</h6>
                    {/* <p>Wed, 11th Mar 2023 10.00 AM</p> */}
                    <p>Date : {today.todayDate}</p>
                    <p>Time : {today.todayPunchIn}</p>
                  </div>
                  <div className="punch-info">
                    <div
                      className="punch-hours"
                      style={{ color: "red", border: "5px solid #E2E536" }}
                    >
                      <span>
                        {parseInt(showTime) -
                          parseInt(dailyPunchIn.punch1_time)}{" "}
                        hrs
                      </span>
                    </div>
                  </div>

                  <div className="statistics">
                    <div className="row">
                      <div className="col-md-6 col-6 text-center">
                        <div className="stats-box">
                          <p>Lunch Break</p>
                          <h6>30 min</h6>
                        </div>
                      </div>
                      <div className="col-md-6 col-6 text-center">
                        <div className="stats-box">
                          <p>Office hrs</p>
                          <h6>8 hrs</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card att-statistics">
                <div className="card-body">
                  <h5 className="card-title">Statistics</h5>
                  <div className="stats-list">
                    {Array.isArray(users) && users.length > 0 ? (
                      users.map((data, index) => (
                        <div
                          className="stats-info"
                          id="stats-info-primary"
                          key={index}
                        >
                          <p>
                            {data.title}{" "}
                            <strong>
                              {data.value} <small>{data.valuespan}</small>
                            </strong>
                          </p>
                          <div className="progress">
                            <div
                              className={`progress-bar ${data.progressBarColor}`}
                              role="progressbar"
                              style={{ width: data.progressWidth }}
                              aria-valuenow={data.progressWidth}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No data availble</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card recent-activity">
                <div className="card-body">
                  <h5 className="card-title">Today Activity</h5>
                  <ul className="res-activity-list">
                    {/* {Array.isArray(activity) && activity.length > 0 ? (
                      activity.map((activity, index) => (
                        <li key={index}>
                          <p className="mb-0">{activity.title}</p>
                          <p className="res-activity-time">
                            <i className="fa-regular fa-clock"></i>{" "}
                            {activity.time}
                          </p>
                        </li>
                      ))
                    ) : (
                      <p>No activities available.</p>
                    )} */}

                    <li>
                      <p className="mb-0">Punch In Time</p>
                      <p className="res-activity-time">
                        <i className="fa-regular fa-clock"></i>{" "}
                        {today.todayPunchIn}
                      </p>
                    </li>
                    <li>
                      <p className="mb-0"></p>
                      <p className="res-activity-time">
                        <i className="fa-regular "></i>
                      </p>
                    </li>
                    <li>
                      <p className="mb-0"> Lunch Break</p>
                      <p className="res-activity-time">
                        <i className="fa-regular fa-clock"></i> 1:00 pm
                      </p>
                    </li>
                    <li>
                      <p className="mb-0"> </p>
                      <p className="res-activity-time">
                        <i className="fa-regular "></i>
                      </p>
                    </li>

                    <li>
                      <p className="mb-0"> Punch Out</p>
                      <p className="res-activity-time">
                        <i className="fa-regular fa-clock"></i>{" "}
                        {today.todayPunchOut}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <AllEmployeeAddPopup data={sap} />
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="dataTables_length d-flex">
                  <label className="d-flex">
                    Show{" "}
                    <select
                      name="DataTables_Table_0_length"
                      aria-controls="DataTables_Table_0"
                      className="custom-select custom-select-sm form-control form-control-sm me-1 ms-1 mb-2"
                      onChange={entriesChange}
                      
                    >
                      <option value="">Select</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                      <option value="30">30</option>
                    </select>{" "}
                    entries
                  </label>
                </div>
              </div>
              <div className="col-sm-12 col-md-6"></div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    //Data for showing the number of data on the basis of slice menas first n data
                    // dataSource={
                    //   newUserElement?.length > 0 ? newUserElement : []
                    // }
                    dataSource={
                        userElements?.length > 0 ? userElements : []
                      }
                    // dataSource={filteredData?.length > 0 ? filteredData : []}
                    pagination={{ pageSize: page }}
                    className="table-striped"
                    // rowKey={(record) => record.id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceEmployee;
