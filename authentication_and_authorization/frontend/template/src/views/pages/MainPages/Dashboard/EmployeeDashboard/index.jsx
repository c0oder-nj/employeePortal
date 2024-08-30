/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { avatar1, avatar13, avatar16, avatar18, avatar19, avatar2, avatar20, avatar21, avatar23, avatar26, avatar4, avatar6, avatar8, clockin, employeeimg, holidaycalendar } from "../../../../../Routes/ImagePath";
import Chart from "react-apexcharts";
import Slider from "react-slick";
import { ArrowRightCircle } from "react-feather";
import '../../../../../customFiles/customStyles.css';
import ChartHeirarichy from "./ChartHeirarichy";
import './oc_style.css'
// import {JwtTokenTimeExpire} from "../../../../../cookieTimeOut/JwtTokenTimeExpire.jsx";
import JwtTokenTimeExpire from "../../../../../cookieTimeOut/jwtTokenTime";
// import jwt from "jsonwebtoken"

const EmployeeDashboard = () => {
  const [pageDispaly, setPageDisplay] = useState('none');
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  const [holidays, setHolidays] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const [completedTask, setCompletedTask] = useState([]);
  const [pendingTask, setPendingTask] = useState([]);
  const [empAttendance, setEmpAttendance] = useState([]);
  const [statisticsTimeFrame, setStatisticsTimeFrame] = useState("Week");
  const [workingHoursTimeFrame, setWorkingHoursTimeFrame] = useState("Week");
  const [heirarchyData, setHeirarchyData] = useState([]);

  const [chartOptions, setChartOptions] = useState({
    series: [],
    colors: ['#55CE63', '#FC133D'], //'#FC133D',
    chart: {
      type: 'bar',
      height: 210,
      stacked: false,

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
      enabled: true,
    },
    yaxis: {
      min: -0,
      max: 10,
      tickAmount: 5,
    },
    xaxis: {
      categories: [], // set day wise category from api
      // categories: [ "S","M","T","W","T","F","S",],
    },
    legend: { show: true },
    fill: {
      opacity: 1,
    },

  });

  const [chartOptions1, setChartOptions1] = useState({
    series: [],
    colors: ['#55CE63'], //'#FC133D',   
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
        columnWidth: '50%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: true,
    },
    yaxis: {
      min: -0,
      max: 10,
      tickAmount: 5,
    },
    xaxis: {
      categories: [], // set day wise category from api
      // categories: [ "S","M","T","W","T","F","S",],
    },
    legend: { show: false },
    fill: {
      opacity: 1,
    },

  });


  // All global variables start 
  // Weekly and monthly statistics card
  var weeklyStatisticsCard;
  var monthlyStatisticsCard;
  var heirarchy;
  // All Global variable end




  // function definition and declaration
  // ---------- Checkcookie function -----------------
  function checkCookie(cookieName) {
    const cookies = document.cookie.split(';');
    console.log(document.cookie);
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
        const accesstoken = cookie.split('=')[1];
        return { status: true, accesstoken };
      }
    }
    return { status: false, accesstoken: null };
  }

  // ------------ check cookie function end--------------------




  // ----------- timeFrameChange for statistics card --------------
  const handleTimeFrameChange = (val) => {
    setStatisticsTimeFrame(val);
  }
  // ----------- timeFrameChange end for statistics card --------------




  // ----------- timeFrameChange for working hours card --------------
  const handleTimeFrameChangeWorkingHour = (val) => {
    setWorkingHoursTimeFrame(val);
  }
  // ----------- timeFrameChange end for working hours card --------------


  // ---------- Parse date function start for date formatting--------------
  function parseDate(d) {
    const [day, month, year] = d.split(".");
    return new Date(`${year}-${month}-${day}T00:00:00Z`);
  }
  // ---------- Parse date function end for date formatting--------------




  // ---------------------- custom monthly chart implementation function start --------------------
  const updateMonthlyChart = (series, categories) => {
    setChartOptions1({
      ...chartOptions1,
      series: series,
      xaxis: categories
    })
  }
  // ---------------------- custom monthly chart implementation function end --------------------


  // --------- heirarchy building function which changes the response--------------------------
  function buildHierarchy(data, parentPernr = "00000000") {
    return data
      .filter(item => item.f_pernr === parentPernr)
      .map(item => {
        const children = buildHierarchy(data, item.pernr);
        return {
          ...item,
          children: children.length ? children : undefined
        };
      });
  }
  // --------- heirarchy building function which changes the response--------------------------

  // All custom built objects
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

  const atnAndLeaveCard = {
    'total_leaves': 0,
    'withoutPay': 0,
    'pendingApproval': 0,
    'total_workingDays': 0
  }

  const recentHoliday = {
    'holiday_text': '',
    'date': ''
  }

  // custom implementation of monthly hour chart
  const customMonthlyChart = {
    'working_hours': [],
    'categories': []
  }
  // All custom built objects end



  useEffect(() => {
    // const checkCk = checkCookie('accessToken');
    // if(checkCk.status === false){
    //   return navigate('/');
    // }


    const fetchData = async () => {

      console.log("Fetching data...");
      const tokenResult = checkCookie('accessToken');
      console.log("Printing token at employee dashbaord :: ", tokenResult);
      if (!tokenResult.status) {
        console.log(tokenResult)
        navigate('/');
        return false;
      }

      try {
        console.log(tokenResult.accesstoken);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/employee/employee_dashboard`, {
          method: 'GET',
          headers: {
            'accesstoken': tokenResult.accesstoken,
            'Access-Control-Allow-Origin': '*'
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

    fetchData().then((data) => {

      // console.log("Printing api response in fetchData.then function :: ", data);

      // const deleteCookie = (cookieName) => {
      //  console.log(document.cookie);
      //  const [key, value] = document.cookie.split("=");
      //  document.cookie = key+"="+value+";expires=22 Aug 1999 12:00:00 UTC;";    
      // };

      // const handleLogout = ()=>{
      //   deleteCookie('accessToken');
      //   localStorage.clear();
      //   window.location.href = '/'; //new login endpoint
      // }

      if(data.status==false){
        if(data.type=="Token Expired"){
          console.log("Line 305",data);
            // handleLogout();
            JwtTokenTimeExpire();
            navigate('/logout');
            return;
        }
      }
     

      setDashboardData(data);
      setEmpData(data?.empDetails[0]);
      setHolidays(data?.holidays);
      setCompletedTask(data?.completedtask);
      setPendingTask(data?.pendingtask);
      setEmpAttendance(data?.attendanceemp);
      // console.log("Updating heirarchy data in fetchData.then function");
      // console.log(data.hierarchyData)
      setHeirarchyData(data?.hierarchyData);


      // custom implementation of weekly hour chart
      const customChart = {
        'last7DaysLateMin': [],
        'last7DaysWorkingHour': [],
        'categories': [],
      }


      const customChartMonthly = {
        'working_hours': [],
        'categories': []
      }




      if (data?.status) {
        console.log("Inside data.status part ",data);
        const today = new Date();
        const currentDay = today.getDay();
        var currentMonth = today.getMonth() + 1;
        if (currentMonth < 10) {
          currentMonth = '0' + currentMonth;
        }
        const lastMon = new Date(today);
        lastMon.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
        lastMon.setUTCHours(0, 0, 0, 0);

        const endD = new Date(today);
        endD.setDate(today.getDate() - 1);
        endD.setUTCHours(0, 0, 0, 0);

        const oneWeekOnly = data.attendanceemp.filter((val, index) => {
          const date = parseDate(val.begdat);
          return date >= lastMon && date <= endD;
        })


        console.log(oneWeekOnly)

        var oneMonthData = data.attendanceemp.filter((val, index) => {
          return (parseInt(val.begdat.split('.').at(1)) === parseInt(currentMonth));
        })

        let day;
        oneWeekOnly.map((val, index) => {
          console.log("Weekly data at day :: ", val.day ,"  ", val ) 
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

          // if(val.)

          let workingHours = val.totdz.split(':');
          workingHours = (parseFloat(workingHours.at(0)) + parseFloat((parseFloat(workingHours.at(1))) / 60)).toFixed(2);
          customChart.last7DaysWorkingHour.push(workingHours);
          // customChart.categories.push(val.begdat); // date wise showing working hour
        })
        customChart.last7DaysWorkingHour = customChart.last7DaysWorkingHour.reverse();
        customChart.categories = customChart.categories.reverse();


        oneMonthData.map((val, index) => {
          const [hour, minute, second] = val.totdz.split(':');
          let workingHours = (parseFloat(hour) + parseFloat((parseInt(minute) / 60))).toFixed(2);
          customChartMonthly.working_hours.push(workingHours);
          customChartMonthly.categories.push(val.begdat);
        })

      }

      // if(heirarchyData.length > 0){
      //   console.log("Printing Heirarchy data at line 339::",heirarchyData);
      //   heirarchy = buildHierarchy(heirarchyData);
      //   console.log("Printing heirarchy after converstion :: ", heirarchy);
      //   // setHeirarchyData(buildHierarchy(heirarchyData));
      // }



      // set the values 
      const updatedSeries = [
        {
          name: "Total Working Hours",
          // data: [-50, -120, -80, -180, -80, -70, -100], // set last 7 days data here
          data: customChart.last7DaysWorkingHour,
        },
        // {
        //   name: 'Used Late Minutes',
        //   data : [6,5,7,8]
        // }
        // pass multiple values in series in order to pass it to the user
      ]

      const updatedCategories = {
        categories: customChart.categories
      }

      setChartOptions({
        ...chartOptions,
        series: updatedSeries,
        xaxis: updatedCategories
      })

      // set the values for monthly chart
      const updatedSeries1 = [
        {
          name: "Total Working Hours",
          // data: [-50, -120, -80, -180, -80, -70, -100], // set last 7 days data here
          data: customChartMonthly.working_hours,
        },
      ]

      const updatedCategories1 = {
        categories: customChartMonthly.categories
      }

      setChartOptions1({
        ...chartOptions1,
        series: updatedSeries1,
        xaxis: updatedCategories1
      })



      setPageDisplay('block')
    });
  }, []);


  // ----------- Logic for organizational chart -------------------------
  console.log(heirarchyData);
  heirarchy = buildHierarchy(heirarchyData);
  console.log(heirarchy);

  // ----------- Logic for organizational chart -------------------------






  // ---------All logic written after useEffect---------------
  //------------------ Logic to show all available leave to user start---------------------
  if (dashboardData?.status) {
    dashboardData.leaveemp.map((val, index) => {
      atnAndLeaveCard.total_leaves += parseInt(val.horo)
      if (val.lev_typ === "WithoutPay Leave") {
        atnAndLeaveCard.withoutPay += (parseInt(val.horo) * 1)
      }
      if (val.apphod === "") {
        atnAndLeaveCard.pendingApproval += (parseInt(val.horo) * 1)
      }
    })

    atnAndLeaveCard.total_workingDays = dashboardData.working_days;
  }
  //------------------ Logic to show all available leave to user end---------------------




  // -----------------Logic to show upcoming holiday to user start------------------------------
  const today = new Date().toLocaleDateString('de-DE');
  holidays?.some((holiday, index) => {
    let holidayDateArr = holiday.datum.split('.');
    let holidayDateDay = parseInt(holidayDateArr[0]);
    let holidayMonth = parseInt(holidayDateArr[1]);

    let currentDateArr = today.split('.');
    let currentDateDay = parseInt(currentDateArr[0]);
    let currentDateMonth = parseInt(currentDateArr[1]);

    // if upcoming holiday exist in the same month then 
    if ((holidayMonth === currentDateMonth) && (holidayDateDay >= currentDateDay)) {
      recentHoliday.holiday_text = holiday.ltext   
      recentHoliday.date = holiday.datum     
      return true;
    } else if (holidayMonth > currentDateMonth) { // when upcoming holidays are not in same month
      recentHoliday.holiday_text = holiday.ltext
      recentHoliday.date = holiday.datum
      return true;
    }
  })
  // -----------------Logic to show upcoming holiday to user end------------------------------



  // -----------------Logic for showing monthly and weekly attendance statistics to user start ------------------------------
  if (empAttendance?.length > 0) {
    function parseDateUpdated(dateStr) {
      const [day, month, year] = dateStr.split('.');
      return new Date(`${year}-${month}-${day}`);
    }

    // calculate one month data first 
    const today = new Date().toLocaleDateString('de-De')
    const dateArr = today.split('.');
    if (parseInt(dateArr.at(1)) < 10) {
      dateArr[1] = '0' + dateArr[1];
    }
    const oneMonthData = empAttendance.filter((val, index) => {
      return val.begdat.split('.').at(1) === dateArr[1];
    })

    let totalWorkingHoursInMonth = 0;
    let totalLateMinutesInMonth = 0;
    let lunchDurationInMonth = 0;
    // calculating working hours and late minutes
    oneMonthData.map((val, index) => {
      let [hour, minute, second] = val.totdz.split(':');
      var tempVar = (parseInt(hour) + parseFloat(parseInt(minute) / 60)).toFixed(2);
      // console.log(typeof parseInt(hour), parseInt(minute));
      // console.log("Printing one day hour record and its type:: ",tempVar, typeof tempVar);
      tempVar = parseFloat(tempVar);
      // console.log("Printing tempvar type after covnersion:: ",tempVar, typeof tempVar);
      totalWorkingHoursInMonth += tempVar
      customMonthlyChart.working_hours.push(tempVar);
      customMonthlyChart.categories.push(val.begdat);


      let [lateHour, lateMin, lateSec] = val.late_min.split(':');
      totalLateMinutesInMonth += ((parseInt(lateHour) * 60) + parseInt(lateMin))
      lunchDurationInMonth += 30;
    })




    monthlyStatisticsCard = {
      'working_hours': totalWorkingHoursInMonth.toFixed(2),
      'used_late_min': totalLateMinutesInMonth,
      'rem_late_min': 120 - totalLateMinutesInMonth,
      'lunch_duration': lunchDurationInMonth
    }



    // calculate week data
    const today_date = new Date();
    const startOfWeek = new Date(today_date.setDate(today_date.getDate() - today_date.getDay() + 1)).toLocaleDateString('de-DE');
    const specifiedDateObj = parseDateUpdated(startOfWeek);
    const oneWeekData = empAttendance.filter(entry => parseDateUpdated(entry.begdat) >= specifiedDateObj);


    let totalWorkingHoursInWeek = 0;
    let totalLateMinutesInWeek = 0;
    let lunchDurationInWeek = 0;
    oneWeekData.filter((val, index) => {
      let workingHoursArray = val.totdz.split(':');
      var tempVar = ((parseInt(workingHoursArray.at(0)) + parseFloat((parseInt(workingHoursArray.at(1))) / 60)).toFixed(2));
      tempVar = parseFloat(tempVar);
      totalWorkingHoursInWeek += tempVar;
      let lateMinutesArray = val.late_min.split(':');
      totalLateMinutesInWeek += ((parseInt(lateMinutesArray.at(0)) * 60) + parseInt(lateMinutesArray.at(1)))
      lunchDurationInWeek += 30;
    })

    weeklyStatisticsCard = {
      'working_hours': totalWorkingHoursInWeek.toFixed(2),
      'used_late_min': totalLateMinutesInWeek,
      'rem_late_min': monthlyStatisticsCard.rem_late_min,
      'lunch_duration': lunchDurationInWeek,
    }
  }
  // ----------------Logic for showing monthly and weekly attendance statistics to user end ------------------------------











  // ------------------Logic to update custom monthly chart start -------------------------------------------------
  // set the values 
  // const updatedSeries = [
  //   {
  //     name: "Total Working Hours",
  //     // data: [-50, -120, -80, -180, -80, -70, -100], // set last 7 days data here
  //     data: customMonthlyChart.working_hours,
  //   },
  // ]

  // const updatedCategories = {
  //   categories: customMonthlyChart.categories
  // }
  // console.log("printing too many re-renders");
  // updateMonthlyChart(updatedSeries, updatedCategories);
  // ------------------Logic to update custom monthly chart end -------------------------------------------------


  return (
    <>
      {/* Page Wrapper */}
      {
        !dashboardData && <div className="loader">Loading Data</div>
      }
      {
        dashboardData &&

        <div className="page-wrapper" style={{ display: pageDispaly }}>
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
                            <h4>Welcome Back, {empData?.ename}</h4>
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
                          <Link to="/profile" className="btn" state={{ empData }}>
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
                              {statisticsTimeFrame}
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                              <button className="dropdown-item" onClick={() => { handleTimeFrameChange('Week') }} >
                                Week
                              </button>
                              <button className="dropdown-item" onClick={() => { handleTimeFrameChange('Month') }}>
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
                        {statisticsTimeFrame === 'Week' &&
                          <div className="week-time-info">
                            <div className="clock-in-info">
                              <div className="clock-in-content">
                                <p>Total working hours</p>
                                <h4>{weeklyStatisticsCard?.working_hours} Hrs</h4>
                              </div>
                              {/* <div className="clock-in-btn">
                              <Link to="#" className="btn btn-primary">
                                <img src={clockin} alt="Icon" />{" "}
                                Clock-In
                              </Link>
                            </div> */}
                            </div>
                            <div className="clock-in-list">
                              <ul className="nav">
                                <li>
                                  <p>Used Late Minutes</p>
                                  <h6>{weeklyStatisticsCard?.used_late_min} Minutes</h6>
                                </li>
                                <li>
                                  <p>Remaining Minutes</p>
                                  <h6>{weeklyStatisticsCard?.rem_late_min} Minutes</h6>
                                </li>
                                {/* commenting lunch duration from dashboard */}
                                {/* <li>
                                  <p>Lunch duration</p>
                                  <h6>{weeklyStatisticsCard?.lunch_duration}</h6>
                                </li> */}
                              </ul>
                            </div>
                          </div>
                        }
                        {statisticsTimeFrame === 'Month' &&
                          <div className="week-time-info">
                            <div className="clock-in-info">
                              <div className="clock-in-content">
                                <p>Total working hours</p>
                                <h4>{monthlyStatisticsCard?.working_hours} Hrs</h4>
                              </div>
                            </div>
                            <div className="clock-in-list">
                              <ul className="nav">
                                <li>
                                  <p>Used Late Minutes</p>
                                  <h6>{monthlyStatisticsCard?.used_late_min} Minutes</h6>
                                </li>
                                <li>
                                  <p>Remaining Minutes</p>
                                  <h6>{monthlyStatisticsCard?.rem_late_min} Minutes</h6>
                                </li>
                                {/* hide lunch duration from month */}
                                {/* <li>
                                  <p>Lunch Duration</p>
                                  <h6>{monthlyStatisticsCard?.lunch_duration} Minutes</h6>
                                </li> */}
                              </ul>
                            </div>
                          </div>
                        }
                        <div className="view-attendance">
                          <Link to="/attendance-employee">
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
                              <h6>{recentHoliday?.holiday_text}</h6>
                              <p>{recentHoliday?.date}</p>
                            </div>
                          </div>
                          <div className="holiday-btn">
                            <Link to="/holidays" className="btn" state={{ holidays }}>
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
                            {dashboardData.leavebalance && dashboardData.leavebalance.map((val, index) => (
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
                                <h4 className="text-pink">{atnAndLeaveCard?.total_leaves}</h4>
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
                                <h4 className="text-purple">{atnAndLeaveCard?.pendingApproval}</h4>
                                <p>Pending Approval</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="attendance-details">
                                <h4 className="text-info">{atnAndLeaveCard?.total_workingDays}</h4>
                                <p>Working Days</p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="attendance-details">
                                <h4 className="text-danger">{atnAndLeaveCard?.withoutPay}</h4>
                                <p>LWPs</p>
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
                              {workingHoursTimeFrame}
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link to="#" className="dropdown-item" onClick={() => { handleTimeFrameChangeWorkingHour("Week") }}>
                                Week
                              </Link>
                              <Link to="#" className="dropdown-item" onClick={() => { handleTimeFrameChangeWorkingHour("Month") }}>
                                Month
                              </Link>
                            </div>
                          </div>
                        </div>
                        {workingHoursTimeFrame === 'Week' &&
                          <div className="working-hour-info">
                            <div id="working_chart" />
                            <Chart
                              options={chartOptions}
                              series={chartOptions.series}
                              type="bar"
                              height={210}
                            />
                          </div>
                        }
                        {workingHoursTimeFrame === 'Month' &&
                          <div className="working-hour-info">
                            <div id="working_chart" />
                            <p>Graph is rendered below for more clarification</p>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  {/* /Attendance & Leaves */}
                </div>
              </div>


              {/* start organization chart */}
              <div className="card col-xxl-4 col-lg-4 col-md-12 d-flex justify-content-center" style={{ flexDirection: "row", paddingBottom: '20px' }}>
                <ChartHeirarichy data={heirarchy} />
              </div>
              {/* end organization chart */}



              {/* Employee Notifications */}
              {/* <div className="col-xxl-4 col-lg-12 col-md-12 d-flex">
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
              </div> */}
              {/* /Employee Notifications */}

              {/* Monthly working hour graph start */}
              {
                workingHoursTimeFrame === 'Month' &&
                <div className="col-xxl-12 col-lg-12 col-md-12 col-sm-12 d-flex">
                  <div className="card flex-fill">
                    <div className="card-body">
                      <div className="statistic-header">
                        <h4>Working hours</h4>
                      </div>
                      <div className="working-hour-info">
                        <div id="working_chart" />
                        <Chart
                          options={chartOptions1}
                          series={chartOptions1.series}
                          type="bar"
                          height={210}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }
              {/* Monthly working hour graph end */}
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


                      {completedTask && completedTask.map((task, index) => (
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
                                    <div className="col-md-6 col-sm-12 col-lg-6 ">{task.chker1.split('-').at(0).replace(/^0+/, '')}-{task.chker1.split('-').at(1)}</div>
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



                      {pendingTask && pendingTask.map((task, index) => (
                        <div className="project-grid" key={index}>
                          <div className="project-top">
                            <h6>Doc number: {task.dno}</h6>
                            <div className="mb-2"><b>Type:</b> {task.mrct1} </div>
                            <div><b>Agenda: </b>{task.agenda}</div>
                            <div><b style={{ color: 'red' }}>Deadline: </b>{task.com_date_to1}</div>
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
                                    <div className="col-md-6 col-sm-12 col-lg-6 ">{task.chker1.split('-').at(0).replace(/^0+/, '')}-{task.chker1.split('-').at(1)}</div>
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
              {/* <div className="col-xl-6 col-md-12 d-flex">
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
              </div> */}
              {/* /Employee Month */}

              {/* Company Policy */}
              {/* <div className="col-xl-6 col-md-12 d-flex">
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
                    </Slider>
                  </div>
                </div>
              </div> */}
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
