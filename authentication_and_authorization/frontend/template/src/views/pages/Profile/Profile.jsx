/* eslint-disable jsx-a11y/img-redundant-alt */
import { Avatar_02, Avatar_16 } from "../../../Routes/ImagePath";
import { Link,  useLocation } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import Breadcrumbs from "../../../components/Breadcrumbs";

const Profile = () => {
  const location = useLocation();
  const {empData} = location.state; // destructred if pass multiple values in state attribute

  // function checkCookie(cookieName) {
  //   const cookies = document.cookie.split(';');
  //   for (let i = 0; i < cookies.length; i++) {
  //     let cookie = cookies[i].trim();
  //     if (cookie.startsWith(cookieName + '=')) {
  //       const accesstoken = cookie.split('=')[1];
  //       return { status: true, accesstoken };
  //     }
  //   }
  //   return { status: false, accesstoken: null };
  // }


  return (
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
                            {empData.ename}
                          </h3>
                          <h6 className="text-muted">{empData.btext}</h6>
                          {/* <small className="text-muted">
                            {empData.btext }
                          </small> */}
                          <div className="staff-id">
                            Employee ID : {empData.pernr}
                          </div>
                          <div className="small doj text-muted">
                            Date of Join : {empData.begda}
                          </div>
                           {/* <div className="staff-msg">
                            <Link className="btn btn-custom" to="/call/chat">
                              Send Message
                            </Link>
                          </div>  */}
                        </div>
                      </div>
                      <div className="col-md-7">
                        <ul className="personal-info">
                          <li>
                            <div className="title">Phone:</div>
                            <div className="text">
                              <Link to={`tel:${empData.telnr}`}>
                                {empData.telnr}
                              </Link>
                            </div>
                          </li>
                          <li>
                            <div className="title">Email Personal:</div>
                            <div className="text">
                              <Link to={`mailto:${empData.usrid}`}>
                                {empData.usrid}
                              </Link>
                            </div>
                          </li>
                          <li>
                            <div className="title">Email Company:</div>
                            <div className="text">
                              <Link to={`mailto:${empData.usrid_long}`}>
                                {empData.usrid_long}
                              </Link>
                            </div>
                          </li>
                          <li>
                            <div className="title">Birthday:</div>
                            <div className="text">{empData.gbdat}</div>
                          </li>
                          <li>
                            <div className="title">Address:</div>
                            <div className="text">{empData.stras + empData.ort02 + ' ' + empData.pstlz + ' ' + empData.land1}</div>
                          </li>
                          <li>
                            <div className="title">Gender:</div>
                            <div className="text">{empData.gender_text}</div>
                          </li>
                          <li>
                            <div className="title">Reports to:</div>
                            <div className="text">
                              <Link to="profile">
                                {empData.f_ename}
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
        <ProfileTab profile={empData}/>
      </div> 
    </div>
  );
};

export default Profile;
