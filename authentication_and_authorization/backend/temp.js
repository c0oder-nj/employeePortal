INSERT INTO [dbo].[userTable]
           ([empCode]
           ,[empPassword]
           ,[empName]
           ,[compCode]
           ,[compName]
           ,[plantNo]
           ,[plantName]
           ,[empDesignation]
           ,[payrollArea]
           ,[mobileNo]
           ,[emailIdShakti]
           ,[emailIdPersonal]
           ,[empAddress]
           ,[empStatus]
           ,[createdDate]
		   ,[dateModified]
		   )
     VALUES
           (5054,
			'$2b$10$Idjww2p60H5Dzc.wxbx.6eikQFRPf7kxH3q7WMGPuI/8OupekyVNa',
			'Neeraj Chittodiya',
			'1200',
			'Shakti Pumps India Limited',
			'1170',
			'Head office',
			'Executive',
			'Shakti',
			'9669996569',
			'it.web1@shakti',
			'neerajchittodiya@gmail.com',
			'458 VN colony Near krashi vihar, Indore [M.P.]',
			1,
			'09-07-2024',
			'09-07-2024'
		   )
GO

afdsf


app.get('/api/employee/employeeSapNumber',authUserThoughMiddleware.checkUser,empControllers.employeesapNumber)
app.get('/api/employee/employeeAttendance',authUserThoughMiddleware.checkUser,empControllers.employeeattendance)
app.get('/api/employee/employeeAttendanceApply',authUserThoughMiddleware.checkUser,empControllers.employeeattendanceApply)









eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBDb2RlIjo1MDU0LCJlbXBQYXNzd29yZCI6IiQyYiQxMCQzMDguaU5SdVQ1MHhuWUN4cEFKS25lcGUvdnV2eWZTdmI1NDh1aXFBWFE4Qm1pai80MTlyZSIsImVtcE5hbWUiOiJOZWVyYWogQ2hpdHRvZGl5YSIsImVtcERlc2lnbmF0aW9uIjoiRXhlY3V0aXZlIiwiY29tcE5hbWUiOiJTaGFrdGkgUHVtcHMgSW5kaWEgTGltaXRlZCIsIm1vYmlsZU5vIjoiOTY2OTk5NjU2OSIsImVtYWlsSWRTaGFrdGkiOiJpdC53ZWIxQHNoYWt0aSIsImVtcEFkZHJlc3MiOiI0NTggVk4gY29sb255IE5lYXIga3Jhc2hpIHZpaGFyLCBJbmRvcmUgW00uUC5dIiwiaWF0IjoxNzIxMTIwNzE3fQ.ZdSQOMOYex9eM7MOwhG2iDIQAxD7Zw4ZW1xrCj1Kuk4



import useAuth from "../../hooks/useAuth";
// const {auth} = useAuth();

export const SidebarData = [
{
    tittle: 'MAIN',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'Dashboard',
        hasSubRoute: true,
        showSubRoute: false,
        route: "#",
        icon: "la la-dashcube",
        subMenus: [
          {
            menuValue: 'Admin Dashboard',
            route: "/admin-dashboard",
            visibility : ['admin']
          },
          {
            menuValue: 'Employee Dashboard',
            route: "/employee-dashboard",
            visibility : ['user', 'admin']
          },
        ],
      },
    ],
  },
  {
    tittle: 'EMPLOYEES',
    showAsTab: false,
    separateRoute: false,
    menu: [
      {
        menuValue: 'General',
        hasSubRoute: true,
        showSubRoute: false,
        route: "#",
        icon: "la la-user",
        subMenus: [
          {
            menuValue: 'Holidays',
            route: "/holidays",
            visibility : ['user', 'admin']
          },
          {
            menuValue: 'Leaves(Admin)',
            route: "/adminleaves",
            visibility : ['admin']
          },
          {
            menuValue: 'Leaves(Employee)',
            route: "/leaves-employee",
            visibility : ['user', 'admin']
          },
          {
            menuValue: 'Attendance (Admin)',
            route: "/adminattendance",
            visibility : ['admin']
          },
          {
            menuValue: 'Attendance (Employee)',
            route: "/attendance-employee",
            visibility : ['user', 'admin']
          },
        ],
      },
      {
        menuValue: 'Travel Allownace',
        hasSubRoute: true,
        showSubRoute: false,
        icon: "la la-rocket",
        subMenus: [
          {
            menuValue: 'Travel Reports',
            route: "/travel_expense_table",
            visibility : ['user', 'admin']
          },
          {
            menuValue: 'HOD travel approval',
            route: "/hod_travel_expense_approval",
            visibility : ['admin']
          },
        ],
      },
    ],
  }
];




{auth?.roles.includes('admin') ?
  (<Route element={<RequireAuth allowedRoles={['admin']} />}>
    <Route path="/job-list" element={<JobList />} />
    <Route path="/job-view" element={<JobView />} />
    <Route path="/lock-screen" element={<LockScreen />} />
  </Route>)
  :
  (<Route element={<RequireAuth allowedRoles={['user']} />}>
    <Route path="/job-list" element={<JobList />} />
    <Route path="/job-view" element={<JobView />} />
    <Route path="/lock-screen" element={<LockScreen />} />
    <Route path="/accordion" element={<Accordions />} />
    <Route path="/alerts" element={<Alerts />} />
    {/* </Route> */}
  </Route>)
}






// all specific routes
<>
                <Route element={<RequireAuth allowedRoles={['admin']} />}>
                  <Route path="/admin-dashboard" element={<AdminDashboard/>} /> {/* admin dasboard should not contains for user */}
                  <Route path="/adminleaves" element={<AdminLeave />} />
                  <Route path="/adminattendance" element={<AttendenceAdmin/>} />
                </Route>
                <Route element={<RequireAuth allowedRoles={['user']} />}>
                  <Route path="/employee-dashboard" element={<EmployeeDashboard />} /> {/* admin dasboard should not contains for user */}
                  <Route path="/leaves-employee" element={<EmployeeLeave />} />
                  <Route path="/attendance-employee" element={<AttendanceEmployee />} />
                </Route>
</>






















import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, Outlet } from "react-router-dom";
// import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import AppContainer from "../Appcontainer";
import store from "../../store";
import { Provider } from "react-redux";

import AdminDashboard from "../../views/pages/MainPages/Dashboard/AdminDashboard/adminDashboard";
import AdminLeave from "../../views/pages/Employees/AdminLeave";
import AttendenceAdmin from "../../views/pages/Employees/Attendenceadmin";

import EmployeeDashboard from "../../views/pages/MainPages/Dashboard/EmployeeDashboard";
import EmployeeLeave from "../../views/pages/Employees/EmployeeLeave";
import AttendanceEmployee from "../../views/pages/Employees/AttendenceEmployee";



// auth provider using context api 
// import { AuthProvider } from "../../Context/AuthProvider.jsx";
import RequireAuth from "../../components/RequireAuth.jsx";
import useAuth from "../../hooks/useAuth.jsx";

// copied functions
const SidebarLayout = () => (
  <>
    {/* <RequireAuth /> { /* require auth a component which validates that only authenticated user will go ahead */ } */}
    <Header name="Test"/>
    <Sidebar />
    <OffCanvas />
    <Outlet />
  </>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRouter = () => {
  useEffect(() => {
    // localStorage.setItem("email", "admin@dreamstechnologies.com");
    // localStorage.setItem("password", "123456");
  }, []);
  const { auth } = useAuth();
  console.log("After login auth value :: -> ", auth);
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter basename="">
            <ScrollToTop />
            <Routes>

              {/* public routes */}
              <Route path="/" element={<Login />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/set-password" element={<SetPassword />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/error-404" element={<Error404 />} />
              <Route path="/error-500" element={<Error500 />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/under-maintenance" element={<UnderManitenance />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected routes 1*/}
              <Route element={<RequireAuth allowedRoles={['admin']} />}>
                  <Route path="/admin-dashboard" element={<AdminDashboard/>} /> {/* admin dasboard should not contains for user */}
                  <Route path="/adminleaves" element={<AdminLeave />} />
                  <Route path="/adminattendance" element={<AttendenceAdmin/>} />
                </Route>

              {/* Protected routes 2*/}
              <Route element={<RequireAuth allowedRoles={['user']} />}>
                  <Route path="/employee-dashboard" element={<EmployeeDashboard />} /> {/* admin dasboard should not contains for user */}
                  <Route path="/leaves-employee" element={<EmployeeLeave />} />
                  <Route path="/attendance-employee" element={<AttendanceEmployee />} />
              </Route>

            </Routes>
          
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default AppRouter;










// admin routes
<>
<Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/adminattendance" element={<AttendenceAdmin />} />
                  <Route path="/adminleaves" element={<AdminLeave />} />
</>









curl --location 'http://SPDEVSRVR1.shaktipumps.com:8000/sap/opu/odata/sap/ZIMAGE_V2_SRV/ImageSet' \
--header 'x-csrf-token: j1sWJ9kWDN1-rhZY07wXdw==' \
--header 'SLUG: test_image_12Aug' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic UjNERVZMUFI6U2hha3RpQDU1NQ==' \
--header 'Cookie: SAP_SESSIONID_S4D_100=GP4iustEv2R-rWW1u016hprQ6-9lIhHvkc0vHGXivV0%3d; sap-usercontext=sap-client=100' \
--data '[
    {
        "name": "file_name11",
        "value": "BASE_64_STRING_FOR_IMAGE"
    },
    {
        "name": "file_name22",
        "value": "BASE_64_STRING_FOR_IMAGE"
    },
    {
        "name": "file_name33",
        "value": "BASE_64_STRING_FOR_IMAGE"
    },
    {
        "name": "file_name44",
        "value": "BASE_64_STRING_FOR_IMAGE"
    }
  ]'