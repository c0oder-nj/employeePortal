import React, { useEffect, useState } from "react";
import axios from "axios";
import Charts from "./charts";
import Reports from "./Reports";
import Statistics from "./statistics";
import InvoiceTable from "./invoiceTable";
import PaymentTable from "./paymentTable";
import ClientTable from "./clientTable";
import RecentTable from "./recentTable";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import { base_url } from "../../../../../base_urls";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    
    let cookieExists = checkCookie('accessToken');
    if(!cookieExists){
      navigate("react/template/");
    }

    axios.get(base_url + "/api/dash.json").then(async (res) => setUsers(res.data));
  }, []);
  function checkCookie(cookieName) {
    // Split cookie string and iterate over each cookie pair
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Check if the cookie name matches the parameter
      if(cookie.startsWith(cookieName + '=')) {
        // Cookie found
        // console.log(cookie);
        return true;
      }
    }
    // Cookie not found
    return false;
  }

  

  return (
    <div>
    <div className="main-wrapper" >
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs maintitle="Welcome Admin!" title="Dashboard" />
          {/* /Page Header */}
          <div className="row">
            {Array.isArray(users) && users.length > 0 ? (
              users.map((item, index) => (
                <div
                  className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                  key={index}
                >
                  <div className="card dash-widget">
                    <div className="card-body">
                      <span className={`dash-widget-icon ${item.icon}`} />
                      <div className="dash-widget-info">
                        <h3>{item.number}</h3>
                        <span>{item.label}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
          {/* /Charts */}
          <Charts />
          {/* /Charts */}
          <Reports />
          <Statistics />
          <div className="row">
            <InvoiceTable />
            <PaymentTable />
          </div>

          <div className="row">
            <ClientTable />
            <RecentTable />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
