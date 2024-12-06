import React, { useEffect } from "react";
import TableAvatar from "./TableAvatar";
import Breadcrumbs from "../../../components/Breadcrumbs";
import JwtTokenTimeExpire from "../../../cookieTimeOut/jwtTokenTime";
const AttendenceAdmin = () => {

  
  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Attendance"
            title="Dashboard"
            subtitle="Attendance"
          />
          {/* /Page Header */}

          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
              <TableAvatar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendenceAdmin;
