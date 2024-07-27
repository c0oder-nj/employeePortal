/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { avatar1, avatar13, avatar16, avatar18, avatar19, avatar2, avatar20, avatar21, avatar23, avatar26, avatar4, avatar6, avatar8, clockin, employeeimg, holidaycalendar } from "../../../../../Routes/ImagePath";
import Chart from "react-apexcharts";
import Pie from 'react-chartjs-2'
import Slider from "react-slick";
import { ArrowRightCircle } from "react-feather";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import '../../../../../customFiles/customStyles.css';

const EmployeeDashboard = () => {
  const [pageDispaly, setPageDisplay] = useState('none');
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const [holidays, setHolidays] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const [completedTask, setCompletedTask] = useState([]);
  const [pendingTask , setPendingTask] = useState([]);
  const [empAttendance, setEmpAttendance] = useState([]);
  const [timeFrame, setTimeFrame] = useState("Week");

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

  const [chartOptions, setChartOptions ] = useState({
    series: [],
    colors: [ '#55CE63'], //'#FC133D',
    chart: {
      type: 'bar',
      height: 210,
      stacked: true,

      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 280,
        options: {
          legend: {
            position: "bottom",
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        borderRadiusApplication: "end", // "around" / "end" 
        borderRadiusWhenStacked: "all", // "all"/"last"
        columnWidth: '30%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      min: -0,
      max: 10,
      tickAmount: 5,
    },
    xaxis: {
      categories: [ ], // set day wise category from api
      // categories: [ "S","M","T","W","T","F","S",],
    },
    legend: { show: false },
    fill: {
      opacity: 1,
    },
    
  });



const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  marginrigth: 10,
};
const settingsprojectslide = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,

};
const settingsprojectslide1 = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,

};

const handleTimeFrameChange  = (val) => {
  setTimeFrame(val);
}



function parseDate(d) {
  const [day, month, year] = d.split(".");
  return new Date(`${year}-${month}-${day}T00:00:00Z`);
}


  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      const tokenResult = checkCookie('accessToken');
      if (!tokenResult.status) {
        navigate('/react/template');
        return false;
      }

      try {
        console.log(tokenResult.accesstoken);
        const response = await fetch('http://localhost:3000/api/employee/employee_dashboard', {
          method: 'GET',
          headers: {
            'accesstoken': tokenResult.accesstoken
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
      console.log("Printing api response in fetchData.then function :: ",data);
      setDashboardData(data);  
      setEmpData(data.empDetails[0]);
      setHolidays(data.holidays);
      setCompletedTask(data.completedtask);
      setPendingTask(data.pendingtask);
      setEmpAttendance(data.attendanceemp);

      // custom implementation of chart
      const customChart = {
        'last7DaysLateMin': [],
        'last7DaysWorkingHour' : [],
        'categories' : [],
      }

      if(data.status){
          const today = new Date();
          const currentDay = today.getDay();
          const lastMon = new Date(today);
          lastMon.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
          lastMon.setUTCHours(0, 0, 0, 0);

          const endD = new Date(today);
          endD.setDate(today.getDate() - 1);
          endD.setUTCHours(0, 0, 0, 0);

          const oneWeekOnly = data.attendanceemp.filter((val,index)=>{
            const date = parseDate(val.begdat);
            return date >= lastMon && date <= endD;
          })

          let day;
          oneWeekOnly.map((val,index)=>{
            console.log(val.day)
            switch (val.day) {  
              case '1':
                day = 'Mon';
                break;
              case '2':
                day = 'Tue';
                break;
              case '3':
                day = 'Wed';
                break;
              case '4':
                day = 'Thu';
                break;
              case '5':
                day = 'Fri';
                break;
              case '6':
                day = 'Sat';
            }

            console.log(day);
            customChart.categories.push(day);

            let workingHours = val.totdz.split(':');
            workingHours = (parseFloat(workingHours.at(0))  + parseFloat((parseFloat(workingHours.at(1))) / 60)).toFixed(2);
            customChart.last7DaysWorkingHour.push(workingHours);
            // customChart.categories.push(val.begdat); // date wise showing working hour
          })

        // data.attendanceemp.map((val,index)=>{
        //   if(val.begdat)
        //   if(index > 26){
        //     return;
        //   }else{
        //     // let lateMin = val.late_min.split(':');
        //     // let late_min_minutes =  ((parseInt(lateMin.at(0)) * 60) + parseInt(lateMin.at(1))) *-1 ;
        //     // customChart.last7DaysLateMin.push(late_min_minutes);

        //     let workingHours = val.totdz.split(':');
        //     let workingHoursInMinutes = (parseFloat(workingHours.at(0))  + parseFloat((parseFloat(workingHours.at(1))) / 60)).toFixed(2);
        //     customChart.last7DaysWorkingHour.push(workingHoursInMinutes);
        //     customChart.categories.push(val.begdat); // date wise showing working hour

        //     // let day;
        //     // console.log(val.day)
        //     // switch (val.day) {  
        //     //   case '1':
        //     //     day = 'Mon';
        //     //     break;
        //     //   case '2':
        //     //     day = 'Tue';
        //     //     break;
        //     //   case '3':
        //     //     day = 'Wed';
        //     //     break;
        //     //   case '4':
        //     //     day = 'Thu';
        //     //     break;
        //     //   case '5':
        //     //     day = 'Fri';
        //     //     break;
        //     //   case '6':
        //     //     day = 'Sat';
        //     // }
        //     // console.log(day)
        //     // customChart.categories.push(day)
        //   }
        //   return val;
        // })




        customChart.last7DaysWorkingHour = customChart.last7DaysWorkingHour.reverse();
        customChart.categories = customChart.categories.reverse();
      }


      

      // set the values 
      const updatedSeries = [
        {
          name: "Total Working Hours",
          // data: [-50, -120, -80, -180, -80, -70, -100], // set last 7 days data here
          data : customChart.last7DaysWorkingHour,
        },
      ]

      const updatedCategories = {
        categories : customChart.categories
      }

      setChartOptions({
        ...chartOptions,
        series : updatedSeries,
        xaxis : updatedCategories
      })


      setPendingTask([{
        "asgnr1": "5053-Om Ganesh Khodke",
        "asgnr": "5053",
        "srno": "1",
        "mrc_date1": "22.07.2024",
        "com_date_from1": "22.07.2024",
        "com_date_to1": "31.07.2024",
        "mrct1": "DRC-Daily Review Committee (YTT)",
        "chker1": "00000000-",
        "dno": "10029534",
        "dep_name": "SAP/IT",
        "agenda": "TEST",
        "agenda1": "",
        "com_date_from": "22.07.2024",
        "com_date_to": "31.07.2024",
        "res_person_id": "00005053",
        "rpn": "Om Ganesh Khodke",
        "mrc_date": "22.07.2024",
        "mrct": "DRC",
        "status": "",
        "sta": "",
        "request": "Task",
        "chker": "00000000"
    }])
      setPageDisplay('block')
    });
  },[]);


  const atnAndLeaveCard = {
    'total_leaves' : 0,
    'withoutPay' : 0 ,
    'pendingApproval': 0,
    'total_workingDays' : 0
  }


  if(dashboardData.status){
    dashboardData.leaveemp.map((val,index)=>{
      atnAndLeaveCard.total_leaves += parseInt(val.horo)
      if(val.lev_typ === "WithoutPay Leave"){
        atnAndLeaveCard.withoutPay += (parseInt(val.horo)*1)
      }
      if(val.apphod === ""){
        atnAndLeaveCard.pendingApproval += (parseInt(val.horo)*1)
      }
    })

    atnAndLeaveCard.total_workingDays = dashboardData.working_days;
  }

  const recentHoliday = {
    'holiday_text' : '',
    'date' : ''
  }

  const today = new Date().toLocaleDateString('de-DE');
  
  

  holidays.some((holiday, index)=>{
    let holidayDateArr = holiday.datum.split('.');
    let holidayDateDay = parseInt(holidayDateArr[0]);
    let holidayMonth = parseInt(holidayDateArr[1]);

    let currentDateArr = today.split('.');
    let currentDateDay = parseInt(currentDateArr[0]);
    let currentDateMonth = parseInt(currentDateArr[1]);

    // if upcoming holiday exist in the same month then 
    if((holidayMonth === currentDateMonth) && (holidayDateDay >= currentDateDay)){
      recentHoliday.holiday_text = holiday.ltext
      recentHoliday.date = holiday.datum
      return true;
    }else if(holidayMonth > currentDateMonth){ // when upcoming holidays are not in same month
      recentHoliday.holiday_text = holiday.ltext
      recentHoliday.date = holiday.datum
      return true;
    }
  })



  const weeklyStatisticsCard = {
    'in_time' : '',
    'working_hour' : 0,
    'used_late_min' : 0,
    'remaining_late_min' : 0
  }

  if(empAttendance.length > 0) {
    // calculate total working hour in week
    let total_working_hour = 0;
    let total_working_minutes = 0;
    let total_late_min = 0;
    empAttendance.map((val,index)=>{
      if(index>6){
        return;
      }
      total_working_hour += parseInt(val.totdz.split(':').at(0));
      total_working_minutes += parseInt(val.totdz.split(':').at(1));
      // total_late_min += (parseInt(val.late_min.split(':').)  parseInt(val.late_min.split(':').at(1)))
    })

    // if(total_working_minutes > 60){
    //   total_working_hour += (total_working_minutes/60);
    // }

    // set total working hours of last 7 days
    weeklyStatisticsCard.in_time = empAttendance[0].indz;
    weeklyStatisticsCard.working_hour = total_working_hour;

  }
  

  
  return (
    <>
      {/* Page Wrapper */}
      { 
        !dashboardData && <div className="loader">Loading Data</div>
      }
      {
        dashboardData && 
      
      <div className="page-wrapper" style={{display: pageDispaly}}>
        {/* Page Content */}
        <div className="content container-fluid pb-0">
          {/* Leave Alert */}
          {/* <div className="row">
            <div className="col-md-12">
              <div className="employee-alert-box">
                <div className="alert alert-outline-success alert-dismissible fade show">
                  <div className="employee-alert-request">
                    <i className="far fa-circle-question" />
                    Your Leave Request on <span>“24th April 2024”</span> has been
                    Approved!!!
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  >
                    <i className="fas fa-xmark" />
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          {/* /Leave Alert */}
          <div className="row">
            <div className="col-xxl-8 col-lg-12 col-md-12">
              <div className="row">
                {/* Employee Details */}
                <div className="col-lg-6 col-md-12">
                  <div className="card employee-welcome-card flex-fill">
                    <div className="card-body">
                      <div className="welcome-info">
                        <div className="welcome-content">
                          <h4>Welcome Back, {empData.ename}</h4>
                          <p>
                            You have been missed,
                          </p>
                        </div>
                        <div className="welcome-img">
                          <img
                            src={avatar19}
                            className="img-fluid"
                            alt="User"
                          />
                        </div>
                      </div>
                      <div className="welcome-btn">
                        <Link to="/profile" className="btn" state={{empData}}>
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="statistic-header">
                        <h4>Statistics</h4>
                        <div className="dropdown statistic-dropdown">
                          <Link
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            to="#"
                          >
                            {timeFrame}
                          </Link>
                          <div className="dropdown-menu dropdown-menu-end">
                            <button className="dropdown-item" onClick={() => {handleTimeFrameChange('Week')}} >
                              Week
                            </button>
                            <button className="dropdown-item" onClick={() => {handleTimeFrameChange('Month')}}>
                              Month
                            </button>
                            {/* <Link to="#" className="dropdown-item">
                              Week
                            </Link>
                            <Link to="#" className="dropdown-item">
                              Month
                            </Link> */}
                          </div>
                        </div>
                      </div>
                      {timeFrame==='Week' && 
                        <div className="week-time-info">
                          <div className="clock-in-info">
                            <div className="clock-in-content">
                              <p>Work Time</p>
                              <h4>6 Hrs : 54 Min</h4>
                            </div>
                            <div className="clock-in-btn">
                              <Link to="#" className="btn btn-primary">
                                <img src={clockin} alt="Icon" />{" "}
                                Clock-In
                              </Link>
                            </div>
                          </div>
                          <div className="clock-in-list">
                            <ul className="nav">
                              <li>
                                <p>Remaining</p>
                                <h6>2 Hrs 36 Min</h6>
                              </li>
                              <li>
                                <p>Overtime</p>
                                <h6>0 Hrs 00 Min</h6>
                              </li>
                              <li>
                                <p>Break</p>
                                <h6>1 Hrs 20 Min</h6>
                              </li>
                            </ul>
                          </div>
                        </div>
                      }
                      {timeFrame==='Month' && 
                        <p>Attendance Month Data</p>
                      }
                      <div className="view-attendance">
                        <Link to="/adminattendance">
                          View Attendance <i className="fe fe-arrow-right-circle" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card info-card flex-fill">
                    <div className="card-body">
                      <h4>Upcoming Holidays</h4>
                      <div className="holiday-details">
                        <div className="holiday-calendar">
                          <div className="holiday-calendar-icon">
                            <img
                              src={holidaycalendar}
                              alt="Icon"
                            />
                          </div>
                          <div className="holiday-calendar-content">
                            <h6>{recentHoliday.holiday_text}</h6>
                            <p>{recentHoliday.date}</p>
                          </div>
                        </div>
                        <div className="holiday-btn">
                          <Link to="/holidays" className="btn" state={{holidays}}>
                            View All
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Employee Details */}
                {/* Attendance & Leaves */}
                <div className="col-lg-6 col-md-12">
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="statistic-header">
                        <h4>Attendance &amp; Leaves</h4>
                        <div className="dropdown statistic-dropdown">
                          {/* <span>2024</span> */}
                          <div className="border rounded p-2 text-card-hover">
                            2024
                          </div>
                          {/* <Link
                            className="dropdown-toggle"
                            to="#"
                          >
                            2024
                          </Link> */}
                          {/* <div className="dropdown-menu dropdown-menu-end">
                            <Link to="#" className="dropdown-item">
                              2025
                            </Link>
                            <Link to="#" className="dropdown-item">
                              2026
                            </Link>
                            <Link to="#" className="dropdown-item">
                              2027
                            </Link>
                          </div> */}
                        </div>
                      </div>
                      <div className="attendance-list">
                        <div className="row">
                        {/* loop based approach */}
                        {dashboardData.leavebalance && dashboardData.leavebalance.map((val, index)=> (
                          <div className="col-md-4" key={index}>
                            <div className="attendance-details">
                              <h4 className="text-primary">{val.leaveBal}</h4>
                              <p>{val.leaveType.split('-').at(0)}</p>
                            </div>
                          </div>
                        ))}




                          {/* <div className="col-md-4">
                            <div className="attendance-details">
                              <h4 className="text-primary">{atnAndLeave.total_leaves}</h4>
                              <p>Total Leaves</p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="attendance-details">
                              <h4 className="text-primary">{atnAndLeave.total_leaves}</h4>
                              <p>Total Leaves</p>
                            </div>
                          </div> */}
                          <div className="col-md-4">
                            <div className="attendance-details">
                              <h4 className="text-pink">{atnAndLeaveCard.total_leaves}</h4>
                              <p>Leaves Taken</p>
                            </div>
                          </div>
                          {/* <div className="col-md-4">
                            <div className="attendance-details">
                              <h4 className="text-success">04</h4>
                              <p>Leaves Absent</p>
                            </div>
                          </div> */}
                          <div className="col-md-4">
                            <div className="attendance-details">
                              <h4 className="text-purple">{atnAndLeaveCard.pendingApproval}</h4>
                              <p>Pending Approval</p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="attendance-details">
                              <h4 className="text-info">{atnAndLeaveCard.total_workingDays}</h4>
                              <p>Working Days</p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="attendance-details">
                              <h4 className="text-danger">{atnAndLeaveCard.withoutPay}</h4>
                              <p>Loss of Pay</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="view-attendance">
                        <Link to="/leaves-employee">
                          Apply Leave
                          <i className="fe fe-arrow-right-circle" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="statistic-header">
                        <h4>Working hours</h4>
                        <div className="dropdown statistic-dropdown">
                          <Link
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            to="#"
                          >
                            This Week
                          </Link>
                          <div className="dropdown-menu dropdown-menu-end">
                            <Link to="#" className="dropdown-item">
                              Last Week
                            </Link>
                            <Link to="#" className="dropdown-item">
                              This Month
                            </Link>
                            <Link to="#" className="dropdown-item">
                              Last 30 Days
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="working-hour-info">
                        <div id="working_chart" />
                        <Chart
                          options={chartOptions}
                          series={chartOptions.series}
                          type="bar"
                          height={210}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Attendance & Leaves */}
              </div>
            </div>
            {/* Employee Notifications */}
            <div className="col-xxl-4 col-lg-12 col-md-12 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="statistic-header">
                    <h4>Important</h4>
                    <div className="important-notification">
                      <Link to="/activities">
                        <span className="me-1">View All</span>
                        <ArrowRightCircle size={15} />
                      </Link>
                    </div>
                  </div>
                  <div className="notification-tab">
                    <ul className="nav nav-tabs">
                      <li>
                        <Link
                          to="#"
                          className="active"
                          data-bs-toggle="tab"
                          data-bs-target="#notification_tab"
                        >
                          <i className="la la-bell" /> Notifications
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="tab"
                          data-bs-target="#schedule_tab"
                        >
                          <i className="la la-list-alt" /> Schedules
                        </Link>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane active" id="notification_tab">
                        <div className="employee-noti-content">
                          <ul className="employee-notification-list">
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="badge-soft-danger rounded-circle">
                                    HR
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    Your leave request has been
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>02:10 PM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="badge-soft-info rounded-circle">
                                    ER
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    You’re enrolled in upcom....
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>12:40 PM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="badge-soft-warning rounded-circle">
                                    SM
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    Your annual compliance trai
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>11:00 AM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="rounded-circle">
                                    <img
                                      src={avatar1}
                                      className="img-fluid rounded-circle"
                                      alt="User"
                                    />
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    Jessica has requested feedba
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>10:30 AM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="badge-soft-warning rounded-circle">
                                    DT
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    Gentle remainder about train
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>09:00 AM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="badge-soft-danger rounded-circle">
                                    AU
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    Our HR system will be down
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>11:50 AM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="schedule_tab">
                        <div className="employee-noti-content">
                          <ul className="employee-notification-list">
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="rounded-circle">
                                    <img
                                      src={avatar2}
                                      className="img-fluid rounded-circle"
                                      alt="User"
                                    />
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    John has requested feedba
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>10:30 AM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="badge-soft-danger rounded-circle">
                                    HR
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    Your leave request has been
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>02:10 PM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="badge-soft-info rounded-circle">
                                    ER
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    You’re enrolled in upcom....
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>12:40 PM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="badge-soft-warning rounded-circle">
                                    SM
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    Your annual compliance trai
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>11:00 AM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="badge-soft-warning rounded-circle">
                                    DT
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    Gentle remainder about train
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>09:00 AM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                            <li className="employee-notification-grid">
                              <div className="employee-notification-icon">
                                <Link to="/activities">
                                  <span className="badge-soft-danger rounded-circle">
                                    AU
                                  </span>
                                </Link>
                              </div>
                              <div className="employee-notification-content">
                                <h6>
                                  <Link to="/activities">
                                    Our HR system will be down
                                  </Link>
                                </h6>
                                <ul className="nav">
                                  <li>11:50 AM</li>
                                  <li>21 Apr 2024</li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Employee Notifications */}
          </div>






          {/* completed Task */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-sm-8">
                      <div className="statistic-header">
                        <h4>Task Completed</h4>
                      </div>
                  </div>
                    <div className="col-sm-4 text-sm-end">
                      <div className="owl-nav project-nav nav-control" />
                    </div>
                  </div>
                  <Slider {...settingsprojectslide} className="project-slider owl-carousel">
                    {/* Project Grid */}
                    

                    {completedTask && completedTask.map((task,index)=>(
                        <div className="project-grid" key={index}>
                        <div className="project-top">
                          <h6>Doc number: {task.dno}</h6>
                          <div className="mb-2"><b>Type:</b> {task.mrct1} </div>
                          <div><b>Agenda: </b>{task.agenda}</div>
                          <div><b>Status: </b>{task.status}</div>
                          <div><b>Task/Request: </b>{task.request}</div>
                        </div>
                        <div className="project-middle">
                          <h4 className="text-decoration-underline mb-2">Assigner Info:</h4>
                          <ul className="nav">
                            <li>
                              <div className="project-tasks">
                                <div className="row">
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Assigner: </div>
                                  <div className="col-md-6 col-sm-12 col-lg-6">{task.asgnr1.split('-').at(1)}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">SAP: </div>
                                  <div className="col-md-6 col-sm-12 col-lg-6">{task.asgnr}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Department</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 ">{task.dep_name}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Checked By: </div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 ">{task.chker1.split('-').at(0).replace(/^0+/,'')}-{task.chker1.split('-').at(1)}</div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="project-middle">
                          <h4 className="text-decoration-underline mb-2">Responsible Person info:</h4>
                          <ul className="nav">
                            <li>
                              <div className="project-tasks">
                                <div className="row">
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Name: </div>
                                  <div className="col-md-6 col-sm-12 col-lg-6">{task.rpn}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">SAP: </div>
                                  <div className="col-md-6 col-sm-12 col-lg-6">{task.res_person_id.replace(/^0+/, '')}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Task from date:</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 ">{task.com_date_from1}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Task to date:</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 ">{task.com_date_to1}</div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="project-bottom"></div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
          {/* End Completed Task */}



          {/* Pending Task */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-sm-8">
                      <div className="statistic-header">
                        <h4>Task Pending</h4>
                      </div>
                  </div>
                    <div className="col-sm-4 text-sm-end">
                      <div className="owl-nav project-nav nav-control" />
                    </div>
                  </div>
                  <Slider {...settingsprojectslide1} className="project-slider owl-carousel">
                    
                    

                    {pendingTask  && pendingTask.map((task,index)=>(
                        <div className="project-grid" key={index}>
                        <div className="project-top">
                          <h6>Doc number: {task.dno}</h6>
                          <div className="mb-2"><b>Type:</b> {task.mrct1} </div>
                          <div><b>Agenda: </b>{task.agenda}</div>
                          <div><b style={{color:'red'}}>Deadline: </b>{task.com_date_to1}</div>
                          <div><b>Task/Request: </b>{task.request}</div>
                        </div>
                        <div className="project-middle">
                          <h4 className="text-decoration-underline mb-2">Assigner Info:</h4>
                          <ul className="nav">
                            <li>
                              <div className="project-tasks">
                                <div className="row">
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Assigner: </div>
                                  <div className="col-md-6 col-sm-12 col-lg-6">{task.asgnr1.split('-').at(1)}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">SAP: </div>
                                  <div className="col-md-6 col-sm-12 col-lg-6">{task.asgnr}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Department</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 ">{task.dep_name}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Checked By: </div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 ">{task.chker1.split('-').at(0).replace(/^0+/,'')}-{task.chker1.split('-').at(1)}</div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="project-middle">
                          <h4 className="text-decoration-underline mb-2">Responsible Person info:</h4>
                          <ul className="nav">
                            <li>
                              <div className="project-tasks">
                                <div className="row">
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Name: </div>
                                  <div className="col-md-6 col-sm-12 col-lg-6">{task.rpn}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">SAP: </div>
                                  <div className="col-md-6 col-sm-12 col-lg-6">{task.res_person_id.replace(/^0+/, '')}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Task from date:</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 ">{task.com_date_from1}</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 fw-bold">Task to date:</div>
                                  <div className="col-md-6 col-sm-12 col-lg-6 ">{task.com_date_to1}</div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="project-bottom"></div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
          {/* End pending Task */}


          {/* <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-sm-8">
                      <div className="statistic-header">
                        <h4>On Going Projects</h4>
                      </div>
                  </div>
                    <div className="col-sm-4 text-sm-end">
                      <div className="owl-nav project-nav nav-control" />
                    </div>
                  </div>
                  <Slider {...settingsprojectslide} className="project-slider owl-carousel">
                    {/* Project Grid */}
                    {/* <div className="project-grid">
                      <div className="project-top">
                        <h6>
                          <Link to="/project-view">Deadline : 10 Feb 2024</Link>
                        </h6>
                        <h5>
                          <Link to="/project-view">Office Management</Link>
                        </h5>
                        <p>
                          Creating an online platform that enables various
                          administrative tasks within an organization
                        </p>
                      </div>
                      <div className="project-middle">
                        <ul className="nav">
                          <li>
                            <div className="project-tasks">
                              <h4>20</h4>
                              <p>Total Tasks</p>
                            </div>
                          </li>
                          <li>
                            <div className="project-tasks">
                              <h4>15</h4>
                              <p>Total Completed</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="project-bottom">
                        <div className="project-leader">
                          <ul className="nav">
                            <li>Project Leader :</li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Jeffery Lalor"
                                data-bs-original-title="Jeffery Lalor"
                              >
                                <img
                                  src={avatar19}
                                  alt="User"
                                />
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="project-leader">
                          <ul className="nav">
                            <li>Members :</li>
                            <li>

                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar20}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip1}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar19}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip2}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar20}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip3}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar16}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip4}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar23}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="more-team-members"
                              >
                                +16
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    {/* /Project Grid */}
                    {/* Project Grid */}
                    {/* <div className="project-grid">
                      <div className="project-top">
                        <h6>
                          <Link to="/project-view">Deadline : 15 Feb 2024</Link>
                        </h6>
                        <h5>
                          <Link to="/project-view">Video Calling App</Link>
                        </h5>
                        <p>
                          Design and developing a software application that enables
                          users to make video calls over the internet.
                        </p>
                      </div>
                      <div className="project-middle">
                        <ul className="nav">
                          <li>
                            <div className="project-tasks">
                              <h4>30</h4>
                              <p>Total Tasks</p>
                            </div>
                          </li>
                          <li>
                            <div className="project-tasks">
                              <h4>12</h4>
                              <p>Total Completed</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="project-bottom">
                        <div className="project-leader">
                          <ul className="nav">
                            <li>Project Leader :</li>
                            <li>
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip5}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar18}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                          </ul>
                        </div>
                        <div className="project-leader">
                          <ul className="nav">
                            <li>Members :</li>
                            <li>
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip6}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar21}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip7}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar16}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip8}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar20}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>

                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip9}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar1}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip10}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar23}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="more-team-members"
                              >
                                +10
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    {/* /Project Grid */}
                    {/* Project Grid */}
                    {/* <div className="project-grid">
                      <div className="project-top">
                        <h6>
                          <Link to="/project-view">Deadline : 12 Apr 2024</Link>
                        </h6>
                        <h5>
                          <Link to="/project-view">Hospital Administration</Link>
                        </h5>
                        <p>
                          Creating an online platform that serves as a central hub
                          for hospital admin, staff, patients.
                        </p>
                      </div>
                      <div className="project-middle">
                        <ul className="nav">
                          <li>
                            <div className="project-tasks">
                              <h4>40</h4>
                              <p>Total Tasks</p>
                            </div>
                          </li>
                          <li>
                            <div className="project-tasks">
                              <h4>02</h4>
                              <p>Total Completed</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="project-bottom">
                        <div className="project-leader">
                          <ul className="nav">
                            <li>Project Leader :</li>
                            <li>

                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip11}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar4}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                          </ul>
                        </div>
                        <div className="project-leader">
                          <ul className="nav">
                            <li>Members :</li>
                            <li>

                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip12}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar6}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>

                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip13}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar13}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>

                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip14}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar18}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip15}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar23}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                             
                              <OverlayTrigger
                                placement="top"
                                overlay={tooltip16}
                              >
                                <Link to="/project-view">
                                  <img
                                    src={avatar1}
                                    alt="User"
                                  />
                                </Link>
                              </OverlayTrigger>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="more-team-members"
                              >
                                +12
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    {/* /Project Grid */}
                    {/* Project Grid */}
                    {/* <div className="project-grid">
                      <div className="project-top">
                        <h6>
                          <Link to="/project-view">Deadline : 25 Apr 2024</Link>
                        </h6>
                        <h5>
                          <Link to="/project-view">Digital Marketpace</Link>
                        </h5>
                        <p>
                          Creating an online platform that connects sellers with
                          buyers, facilitating the exchange of goods,
                        </p>
                      </div>
                      <div className="project-middle">
                        <ul className="nav">
                          <li>
                            <div className="project-tasks">
                              <h4>50</h4>
                              <p>Total Tasks</p>
                            </div>
                          </li>
                          <li>
                            <div className="project-tasks">
                              <h4>10</h4>
                              <p>Total Completed</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="project-bottom">
                        <div className="project-leader">
                          <ul className="nav">
                            <li>Project Leader :</li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Jeffery Lalor"
                                data-bs-original-title="Jeffery Lalor"
                              >
                                <img
                                  src={avatar1}
                                  alt="User"
                                />
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="project-leader">
                          <ul className="nav">
                            <li>Members :</li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Loren Gatlin"
                                data-bs-original-title="Loren Gatlin"
                              >
                                <img
                                  src={avatar26}
                                  alt="User"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Lesley Grauer"
                                data-bs-original-title="Lesley Grauer"
                              >
                                <img
                                  src={avatar18}
                                  alt="User"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Richard Miles"
                                data-bs-original-title="Richard Miles"
                              >
                                <img
                                  src={avatar6}
                                  alt="User"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Jeffery Lalor"
                                data-bs-original-title="Jeffery Lalor"
                              >
                                <img
                                  src={avatar13}
                                  alt="User"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Tarah Shropshire"
                                data-bs-original-title="Tarah Shropshire"
                              >
                                <img
                                  src={avatar8}
                                  alt="User"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="more-team-members"
                              >
                                +13
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    {/* /Project Grid */}
                    {/* Project Grid */}
                    {/* <div className="project-grid">
                      <div className="project-top">
                        <h6>
                          <Link to="/project-view">Deadline : 15 Feb 2024</Link>
                        </h6>
                        <h5>
                          <Link to="/project-view">Video Calling App</Link>
                        </h5>
                        <p>
                          Design and developing a software application that enables
                          users to make video calls over the internet.
                        </p>
                      </div>
                      <div className="project-middle">
                        <ul className="nav">
                          <li>
                            <div className="project-tasks">
                              <h4>30</h4>
                              <p>Total Tasks</p>
                            </div>
                          </li>
                          <li>
                            <div className="project-tasks">
                              <h4>12</h4>
                              <p>Total Completed</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="project-bottom">
                        <div className="project-leader">
                          <ul className="nav">
                            <li>Project Leader :</li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Catherine Manseau"
                                data-bs-original-title="Catherine Manseau"
                              >
                                <img
                                  src={avatar18}
                                  alt="User"
                                />
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="project-leader">
                          <ul className="nav">
                            <li>Members :</li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Richard Miles"
                                data-bs-original-title="Richard Miles"
                              >
                                <img
                                  src={avatar21}
                                  alt="User"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Jeffery Lalor"
                                data-bs-original-title="Jeffery Lalor"
                              >
                                <img
                                  src={avatar16}
                                  alt="User"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Lesley Grauer"
                                data-bs-original-title="Lesley Grauer"
                              >
                                <img
                                  src={avatar20}
                                  alt="User"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Loren Gatlin"
                                data-bs-original-title="Loren Gatlin"
                              >
                                <img
                                  src={avatar1}
                                  alt="User"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/project-view"
                                data-bs-toggle="tooltip"
                                aria-label="Tarah Shropshire"
                                data-bs-original-title="Tarah Shropshire"
                              >
                                <img
                                  src={avatar23}
                                  alt="User"
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="more-team-members"
                              >
                                +10
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    {/* /Project Grid */}
                  {/*</Slider>
                </div>
              </div>
            </div>
          </div> */}


          <div className="row">
            {/* Employee Month */}
            <div className="col-xl-6 col-md-12 d-flex">
              <div className="card employee-month-card flex-fill">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-lg-9 col-md-12">
                      <div className="employee-month-details">
                        <h4>Employee of the month</h4>
                        <p>
                          We are really proud of the difference you have made which
                          gives everybody the reason to applaud &amp; appreciate
                        </p>
                      </div>
                      <div className="employee-month-content">
                        <h6>Congrats, Hanna</h6>
                        <p>UI/UX Team Lead</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-12">
                      <div className="employee-month-img">
                        <img
                          src={employeeimg}
                          className="img-fluid"
                          alt="User"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Employee Month */}
            {/* Company Policy */}
            <div className="col-xl-6 col-md-12 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-sm-8">
                      <div className="statistic-header">
                        <h4>Company Policy</h4>
                      </div>
                    </div>
                    <div className="col-sm-4 text-sm-end">
                      <div className="owl-nav company-nav nav-control" />
                    </div>
                  </div>
                  <Slider {...settings} className="company-slider owl-carousel owl-loaded owl-drag">
                    {/* Company Grid */}
                    <div className="owl-item active" style={{ width: '199.667px', marginRight: '20px' }}>
                      <div className="company-grid company-soft-tertiary">
                        <div className="company-top">
                          <div className="company-icon">
                            <span className="company-icon-tertiary rounded-circle">
                              HR
                            </span>
                          </div>
                          <div className="company-link">
                            <Link to="/companies">HR Policy</Link>
                          </div>
                        </div>
                        <div className="company-bottom d-flex">
                          <ul>
                            <li>Policy Name : Work policy</li>
                            <li>Updated on : Today</li>
                          </ul>
                          <div className="company-bottom-links">
                            <Link to="#">
                              <i className="la la-download" />
                            </Link>
                            <Link to="#">
                              <i className="la la-eye" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Company Grid */}
                    {/* Company Grid */}
                    <div className="owl-item active" style={{ width: '199.667px', marginRight: '20px' }}>
                      <div className="company-grid company-soft-success">
                        <div className="company-top">
                          <div className="company-icon">
                            <span className="company-icon-success rounded-circle">
                              EP
                            </span>
                          </div>
                          <div className="company-link">
                            <Link to="/companies">Employer Policy</Link>
                          </div>
                        </div>
                        <div className="company-bottom d-flex">
                          <ul>
                            <li>Policy Name : Parking</li>
                            <li>Updated on : 25 Jan 2024</li>
                          </ul>
                          <div className="company-bottom-links">
                            <Link to="#">
                              <i className="la la-download" />
                            </Link>
                            <Link to="#">
                              <i className="la la-eye" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Company Grid */}
                    {/* Company Grid */}
                    <div className="owl-item active" style={{ width: '199.667px', marginRight: '20px' }}>
                      <div className="company-grid company-soft-info">
                        <div className="company-top">
                          <div className="company-icon">
                            <span className="company-icon-info rounded-circle">
                              LP
                            </span>
                          </div>
                          <div className="company-link">
                            <Link to="/companies">Leave Policy</Link>
                          </div>
                        </div>
                        <div className="company-bottom d-flex">
                          <ul>
                            <li>Policy Name : Annual Leave</li>
                            <li>Updated on : 25 Jan 2023</li>
                          </ul>
                          <div className="company-bottom-links">
                            <Link to="#">
                              <i className="la la-download" />
                            </Link>
                            <Link to="#">
                              <i className="la la-eye" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Company Grid */}
                  </Slider>
                </div>
              </div>
            </div>
            {/* /Company Policy */}
          </div>
        </div>
        {/* /Page Content */}
      </div>
      }
      {/* /Page Wrapper */}
    </>

  );
};

export default EmployeeDashboard;
