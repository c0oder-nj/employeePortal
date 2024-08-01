import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import Breadcrumbs from "../../../components/Breadcrumbs";
// import AttendanceEmployeeFilter from "../../../components/AttendanceEmployeeFilter";
import { base_url } from "../../../base_urls";
import { useNavigate } from "react-router-dom";
import AllEmployeeAddPopup from "../../../components/modelpopup/AttendanceCorrection";
// import AttendaceCorrection from "../../../../../template/src/components/modelpopup/AttendenceModelPopup"
const AttendanceEmployee = () => {
  const [users, setUsers] = useState([]);
  const [activity, setActivity] = useState([]);
  const [dailyPunchIn, setDailyPunchIn] = useState([]);
  const [data, setData] = useState([]);
  const [sap, setSap] = useState(null);
  const navigate = useNavigate();
  var dataFetchedThroughApi = null;

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
      navigate("react/template/");
    }

    const fetchData = async () => {
      //Fetching data for attendance
      const value = `${document.cookie}`;
      console.log(value);

      const url = `http://localhost:3000/api/DailyAttendance/employeeDailyAttendnceStatus?value=${value}`;
      console.log(url);

      dataFetchedThroughApi = await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data.employeeAttendance);
          setSap(data.sapNumber);

          return data;
        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  }, []);

  if (data.length > 0) {
    fetchWeekData();
    fetchMonthData();
    fetchreaminingtime();
  }

  // const userElements = data?.map((user, index) => ({
  //   key: index,
  //   id: user.id,
  //   Date: user.Date,
  //   PunchIn: user.PunchIn,
  //   PunchOut: user.PunchOut,
  //   Production: user.Production,
  //   Break: user.Break,
  //   Overtime: user.Overtime,
  // }));

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
  // useEffect(() => {
  //   axios
  //     .get(base_url + "/api/attendenceemployeedatatable.json")
  //     .then((res) => setData(res.data));
  // }, []);

  useEffect(() => {
    axios.get(base_url + "/api/attendenceemployee.json").then((res) => {
      // Assuming the API response is an array of objects
      const apiData = res.data;
      // Map the API data to the statisticsData format
      const mappedData = apiData?.map((data) => ({
        title: data.title,
        value: data.value,
        valuespan: data.valuespan,
        progressWidth: data.progressWidth,
        progressBarColor: data.progressBarColor,
      }));
      setUsers(mappedData);
    });
  }, []);

  useEffect(() => {
    axios
      .get(base_url + "/api/attendenceemployeeactivity.json")
      .then((res) => setActivity(res.data));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:3002/emp-todays-punch?sapId=5054`;
      console.log(url);
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Daily pucnh in data", data);
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
          {/* <Breadcrumbs
            // maintitle="Attendance"
            title="Leave Correction"
            modal="#attendace_correction"
            // subtitle="Attendance"
          /> */}
          <Breadcrumbs
            // maintitle="Employee Attendance Correction"
            // title="Attendance Correction Dashboard"
            // subtitle="Attendance Correction of Employee"
            modal="#add_employee_attendance_correction"
            name="Attendance Correction Request"
            Linkname="/attendance-employee"
            // Linkname1="/employees-list"
          />
          {/* <AttendenceModelPopup/> */}
          {/* <EmployeeLeaveModelPopup data1={"Hello"} data2={"Hello"}/> */}
          {/* /Page Header */}
          <div className="row">
            <div className="col-md-4">
              <div className="card punch-status">
                <div className="card-body">
                  <h5 className="card-title">
                    Timesheet{" "}
                    <small className="text-muted">
                      {dailyPunchIn.punch1_date}
                    </small>
                  </h5>
                  <div className="punch-det">
                    <h6>Punch In at</h6>
                    {/* <p>Wed, 11th Mar 2023 10.00 AM</p> */}
                    <p>Date : {dailyPunchIn.punch1_date}</p>
                    <p>Time : {dailyPunchIn.punch1_time}</p>
                  </div>
                  <div className="punch-info" >
                    <div className="punch-hours" style={{color: "red",border:"5px solid #E2E536"}}>
                      <span>
                        {parseInt(showTime) -
                          parseInt(dailyPunchIn.punch1_time)}{" "}
                        hrs
                      </span>
                    </div>
                  </div>
                  {/* <div className="punch-btn-section">
                    <button type="button" className="btn btn-primary punch-btn">
                      Punch Out
                    </button>
                  </div> */}
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
                        <div className="stats-info" key={index}>
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
                        {dailyPunchIn.punch1_time}
                      </p>
                    </li>
                    <li>
                      <p className="mb-0"> Lunch Break</p>
                      <p className="res-activity-time">
                        <i className="fa-regular fa-clock"></i> 1:00 pm
                      </p>
                    </li>
                    <li>
                      <p className="mb-0"> Punch Out</p>
                      <p className="res-activity-time">
                        <i className="fa-regular fa-clock"></i>{" "}
                        {dailyPunchIn.outpunch_time}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <AllEmployeeAddPopup data={sap} />
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={userElements?.length > 0 ? userElements : []}
                    className="table-striped"
                    rowKey={(record) => record.id}
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
