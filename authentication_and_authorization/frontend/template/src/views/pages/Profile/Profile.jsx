/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Avatar_02, Avatar_16 } from "../../../Routes/ImagePath";
import { Link, useNavigate } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import Breadcrumbs from "../../../components/Breadcrumbs";


const Profile = () => {
  var employeeProfile;
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({});
  employeeProfile = {
    id: 1,
    name: "TEST",
    companyCode: "TEST",
    companyText : "TEST",
    plantCode : "TEST",
    plantName : "TEST",
    departmentCode : "TEST",
    departmentName : "TEST",
    positionCode : "TEST",
    position : "TEST",
    payrollCode : "TEST",
    payrollText : "TEST",
    mobileNo : "TEST",
    companyEmailId : "TEST",
    personalEmailId : "TEST",
    address : "TEST",
    joiningDate : "TEST",
    dateOfBirth : "TEST",
    reportingManagerName : "TEST",
    reportingManagerPernr : "TEST",
    nationality : "TEST",
    noOfChildrens : "TEST",
    maritalStatus : "TEST",
    religion : "TEST"
  };


  function checkCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if(cookie.startsWith(cookieName + '=')) {
        const accesstoken = cookie.split('=').at(1)
        return {"status" : true, accesstoken : accesstoken};
      }
    }
    return {"status" : false, accesstoken : null};
  }
  

  // const getToken = (cookie) => {
  //   let accessToken = cookie.split('=');
  //   if(!(accessToken[0] !== 'accessToken')){
  //     return false;
  //   }else{
  //     return accessToken[1];
  //   }
  // }



  useEffect(() => {
    console.log("Hello how are you ");
    if(!checkCookie('accessToken').status){
      navigate('/react/template');
    }

    const fetchData = async ()=>{
        const url = 'http://localhost:3000/api/employee/employee_profile';
        const accessToken = checkCookie("accessToken").status ? checkCookie('accessToken').accesstoken : null
        
        const apiResponse = await fetch(url,{
          method: 'get',
          headers : {
            'accesstoken': accessToken
          }
        }).then((response)=>{
          return response.json();
        }).then((data) => {
          // console.log(data)
          // console.log(data.data[0]);
          let empDetails = data.data[0];
          setEmpData(empDetails);
          console.log(empData);
          // let empAddress = empDetails.stras + empDetails.ort02 + empDetails.pstlz + empDetails.land1;
          // employeeProfile = {
          //   id: 1,
          //   name: empDetails.ename,
          //   companyCode: empDetails.bukrs,
          //   companyText : empDetails.butxt,
          //   plantCode : empDetails.werks,
          //   plantName : empDetails.name1,
          //   departmentCode : empDetails.btrtl,
          //   departmentName : empDetails.btext,
          //   positionCode : empDetails.persk,
          //   position : empDetails.persk,
          //   payrollCode : empDetails.abkrs,
          //   payrollText : empDetails.atext,
          //   mobileNo : empDetails.telnr,
          //   companyEmailId : empDetails.usrid_long,
          //   personalEmailId : empDetails.usrid,
          //   address : empAddress,
          //   joiningDate : empDetails.begda,
          //   dateOfBirth : empDetails.gbdat,
          //   reportingManagerName : empDetails.f_ename,
          //   reportingManagerPernr : empDetails.f_pernr,
          //   nationality : empDetails.natio,
          //   noOfChildrens : empDetails.anzkd,
          //   maritalStatus : empDetails.ftext,
          //   religion : empDetails.ktext 
          // };
        }).catch((error)=>{
          console.log("Error", error);
        });
    }
    fetchData();
  }, []);


  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs
            maintitle="Profile"
            title="Dashboard"
            subtitle="Profile"
            modal="#add_indicator"
            name="Add New"
          />
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-img-wrap">
                      <div className="profile-img">
                        <Link to="#">
                          <img src={Avatar_02} alt="User Image" />
                        </Link>
                      </div>
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">
                              {/* {userData.name} */} Hello
                            </h3>
                            <h6 className="text-muted">{employeeProfile.positionCode}</h6>
                            <small className="text-muted">
                              {employeeProfile.positionCode}
                            </small>
                            <div className="staff-id">
                              Employee ID : 1 fetch employeeId
                            </div>
                            <div className="small doj text-muted">
                              Date of Join : {employeeProfile.joiningDate}
                            </div>
                            <div className="staff-msg">
                              <Link className="btn btn-custom" to="/call/chat">
                                Send Message
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Phone:</div>
                              <div className="text">
                                <Link to={`tel:${employeeProfile.mobileNo}`}>
                                  {employeeProfile.mobileNo}
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Email Personal:</div>
                              <div className="text">
                                <Link to={`mailto:${employeeProfile.personalEmailId}`}>
                                  {employeeProfile.personalEmailId}
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Email Shakti:</div>
                              <div className="text">
                                <Link to={`mailto:${employeeProfile.companyEmailId}`}>
                                  {employeeProfile.companyEmailId}
                                </Link>
                              </div>
                            </li>
                            <li>
                              <div className="title">Birthday:</div>
                              <div className="text">{employeeProfile.dateOfBirth}</div>
                            </li>
                            <li>
                              <div className="title">Address:</div>
                              <div className="text">{employeeProfile.address}</div>
                            </li>
                            <li>
                              <div className="title">Gender:</div>
                              <div className="text">fetch gender</div>
                            </li>
                            <li>
                              <div className="title">Reports to:</div>
                              <div className="text">
                                <div className="avatar-box">
                                  <div className="avatar avatar-xs">
                                    {employeeProfile.reportingManagerPernr}
                                    <img src={Avatar_16} alt="User Image | " />
                                  </div>
                                </div>
                                <Link to="profile">
                                  {employeeProfile.reportingManagerName}
                                </Link>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="pro-edit">
                      <Link
                        data-bs-target="#profile_info"
                        data-bs-toggle="modal"
                        className="edit-icon"
                        to="#"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card tab-box">
            <div className="row user-tabs">
              <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                <ul className="nav nav-tabs nav-tabs-bottom">
                  <li className="nav-item">
                    <Link
                      to="#emp_profile"
                      data-bs-toggle="tab"
                      className="nav-link active"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#emp_projects"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      Projects
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#bank_statutory"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      Bank &amp; Statutory
                      <small className="text-danger ms-1">(Admin Only)</small>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#emp_assets"
                      data-bs-toggle="tab"
                      className="nav-link"
                    >
                      Assets
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Profile Info Tab */}
          <ProfileTab />
        </div>
      </div>
    </>
  );
};

export default Profile;
