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
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  
  const [users, setUsers] = useState([]);
  
  //This state is used for showing a pop up
  const [popUpvalueState, popUpvalueUpdationState] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    
    let cookieExists = checkCookie('accessToken');
    if(!cookieExists){
      navigate("react/template/");
    }

    axios.get(base_url + "/api/dash.json").then(async (res) => setUsers(res.data));
  });

  function checkCookie(cookieName) {
    // Split cookie string and iterate over each cookie pair
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Check if the cookie name matches the parameter
      if(cookie.startsWith(cookieName + '=')) {
        // Cookie found
        return true;
      }
    }
    // Cookie not found
    return false;
  }

  useEffect(()=>{
    
    if(popUpvalueState===true)
    // alert("Hello : you have updated a value of pop ")
    {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be redirected",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay"
      }).then(function () {
        // Redirect the user
        popUpvalueUpdationState(false)
        window.location.href = "http://localhost:3001/react/template/";
      });    
    }
  },[popUpvalueState])
  
  const handleRequest = async ()=>{
    

    const value = `${document.cookie}`;
    console.log(value);

    //Giving whole value of token here
    const url = `http://localhost:3000/api/auth/home?value=${value}`;
    console.log(url);

    let storeResponse;
    
    await fetch(url).then((response)=>{
      return response.json();
    }).then((data) => {

      storeResponse = data;
      // popUpvalueState=true
      
      console.log(data);
    });
    console.log("Your Response: ",storeResponse.message);

    
    // Uncomment this thing to access the Alert
    // if(storeResponse.status===false){
    //   popUpvalueUpdationState(true)
    // }
    navigate("/admin-dashboard");
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
          <button onClick={handleRequest}>Hello Im am here</button>
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
