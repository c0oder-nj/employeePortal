import Select from "react-select";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { FaChalkboardTeacher } from "react-icons/fa";
import axios from "axios";
// import { use } from "../../../../../../../backend/Routes";

const ExcelInfoFileUpload = () => {
  const [data, setData] = useState([]);
  const [excelData, setExcelData] = useState(null);
  const [expenseData, setExpenseData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectCostCenter, setSelectCostCenter] = useState([]);
  const [formData, setFormData] = useState({
    Country: "",
    TimeStart: "",
    TimeEnd: "",
    Location: "",
    CostCenter: "",
    SapNmber: "5053",
    expenseDataToBeSend: [],
  });
  const selectoptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
    { label: "Option 5", value: "option5" },
  ];
  // const selectCountry = [];
  // const selectCostCenter = [
  //   {
  //     label: "1250SOLARO / Solar Sales OEM CHENNAI",
  //     value: "1250SOLARO / Solar Sales OEM CHENNAI",
  //   },
  //   // { label: "America", value: "America" },
  //   // { label: "Option 3", value: "Russia" },
  //   // { label: "Option 4", value: "Germany" },
  //   // { label: "Option 5", value: "Japan" },
  // ];
  
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };

  // useEffect(() => {
  //   axios.get("https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/employee_dashboard1.htm?pernr=5053",{

  //   }).then((res) => {
  //     const apiData = res;
  //     console.log(apiData);

  //   }).catch((error) => {
  //     console.error("There was an error making the request:", error);
  //   });
  // }, []);

  // useEffect(async ()=>{
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //     mode: 'no-cors'
  //   };

  //   fetch("https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/employee_dashboard1.htm?pernr=5053", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.error(error));

  // }, [])
  //   useEffect(() => {
  //     function data() {
  //       {
  //         const requestOptions = {
  //           method: "GET",
  //           redirect: "follow",
  //           "Access-Control-Allow-Origin": "*",
  // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  // "Access-Control-Allow-Headers": "Content-Type, Authorization",
  //         };

  //         fetch(
  //           "https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/employee_dashboard1.htm?pernr=5053",
  //           requestOptions
  //         )
  //           .then((response) => response.text())
  //           .then((result) => console.log(result))
  //           .catch((error) => console.error(error));
  //       }
  //     }
  //     data();
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:3000/api/TravelExpense/countryAndCostCenterCode`;
      console.log(url);
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("Your data :" , data)

          // //Setting data into country code array
          // data.country_code.forEach((element) => {
          //   // console.log(element.land1);
          //   selectCountry.push({
          //     label: element.landx50,
          //     value: element.land1,
          //   });
          // });

          // //Setting data into cost center array
          // data.cost_center.forEach((element) => {
          //   // console.log(element.ltext);
          //   selectCostCenter.push({
          //     label: element.ltext,
          //     value: element.kostl_txt,
          //   });
          // });
          const countries = data.country_code.map((element) => ({
            label: element.landx50,
            value: element.land1,
          }));
  
          //Setting data into cost center array
          const costCenters = data.cost_center.map((element) => ({
            label: element.ltext,
            value: element.kostl_txt,
          }));
  
          // Update state
          setSelectCountry(countries);
          setSelectCostCenter(costCenters);
          return data;
        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Process each sheet
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const rows = jsonData;
        const headers = rows[0];
        const rowsLength = headers.length;

        if (rowsLength === 2) {
          rows.forEach((ele) => {
            if (ele[0] === "Name") {
              setFormData((previousState) => ({
                ...previousState,
                Name: ele[1],
              }));
            } else if (ele[0] === "Designation") {
              setFormData((previousState) => ({
                ...previousState,
                Designation: ele[1],
              }));
            } else if (ele[0] === "Destination") {
              setFormData((previousState) => ({
                ...previousState,
                Destination: ele[1],
              }));
            } else if (ele[0] === "Time start") {
              setFormData((previousState) => ({
                ...previousState,
                TimeStart: ele[1],
              }));
            } else if (ele[0] === "Time end") {
              setFormData((previousState) => ({
                ...previousState,
                TimeEnd: ele[1],
              }));
            } else if (ele[0] === "Total Advance") {
              setFormData((previousState) => ({
                ...previousState,
                TotalAdvance: ele[1],
              }));
            } else if (ele[0] === "Mention") {
              setFormData((previousState) => ({
                ...previousState,
                MentionName: ele[1],
              }));
            } else if (ele[0] === "In INR") {
              setFormData((previousState) => ({
                ...previousState,
                InINR: ele[1],
              }));
            }
          });
        } else {
          const typeIndex = headers.indexOf("Type");

          // Group rows by the "Type" column
          const groupedData = rows.slice(1).reduce((acc, row) => {
            const type = row[typeIndex];
            if (!acc[type]) {
              acc[type] = [];
            }

            // Create an object for each row using headers as keys
            const rowData = headers.reduce((rowAcc, header, index) => {
              rowAcc[header] = row[index];
              return rowAcc;
            }, {});

            acc[type].push(rowData);
            return acc;
          }, {});

          console.log(typeof groupedData);
          console.log(Object.values(groupedData));
          const ArrayGroupedData = Object.values(groupedData);
          console.log(ArrayGroupedData);
          setFormData((prevData) => ({
            ...prevData,
            expenseDataToBeSend: ArrayGroupedData,
            // expenseDataToBeSend: groupedData,
          }));

          setExpenseData((prevData) => ({
            ...prevData,
            [sheetName]: groupedData,
          }));
        }
      });

      setExcelData(
        workbook.SheetNames.map((sheetName) => ({
          sheetName,
          data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
            header: 1,
          }),
        }))
      );
    };

    reader.readAsArrayBuffer(file);
  };

  async function sendData(e) {
    e.preventDefault();
    console.log("In send Data");
    console.log(JSON.stringify(formData));
    const value = `${document.cookie}`;
    console.log(value);
    // const url = `http://localhost:3000/api/employee/employeeAttendanceApply?value=${value}`;
    const url = `http://localhost:3000/api/TravelExpense/domesticTravelExpens?value=${value}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, Access-Control-Allow-Headers",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
        Toastify({
          text: body.message,
          duration: 3000,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
      });
      return;
      // return response.json();
    });
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">
                    Basic Details and file Upload for travel Allowance
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={sendData}>
                    <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">
                        Country Select
                      </label>
                      <div className="col-md-10">
                        <Select
                          options={selectCountry}
                          
                          placeholder="-- Select --"
                          styles={customStyles}
                          onChange={(event) => {
                            setFormData(() => ({
                              ...formData,
                              Country: event.value,
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">
                        Location
                      </label>
                      <div className="col-md-10">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(event) => {
                            setFormData(
                              () => (
                                console.log(event.target.value),
                                {
                                  ...formData,
                                  Location: event.target.value,
                                }
                              )
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">
                        Date Start from :
                      </label>
                      <div className="col-md-10">
                        {/* <input type="password" className="form-control" /> */}
                        <div className="col-md-10">
                          {/* <DatePicker /> */}
                          <DatePicker
                            className="form-control datetimepicker"
                            selected={startDate}
                            type="date"
                            dateFormat="dd-MM-yyyy"
                            onChange={(date) => {
                              setFormData(() => ({
                                ...formData,
                                TimeStart: format(date, "yyyyMMdd"),
                              }));
                              setStartDate(date);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">
                        Date End at :
                      </label>
                      <div className="col-md-10">
                        {/* <input type="password" className="form-control" /> */}
                        <div className="col-md-10">
                          {/* <DatePicker /> */}
                          <DatePicker
                            className="form-control datetimepicker"
                            selected={endDate}
                            type="date"
                            dateFormat="dd-MM-yyyy"
                            onChange={(date) => {
                              console.log(date);
                              setFormData(() => ({
                                ...formData,
                                TimeEnd: format(date, "yyyyMMdd"),
                              }));
                              setEndDate(date);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">
                        Select Cost Center
                      </label>
                      <div className="col-md-10">
                        <Select
                          options={selectCostCenter}
                          placeholder="-- Select --"
                          styles={customStyles}
                          onChange={(event) => {
                            setFormData(() => ({
                              ...formData,
                              CostCenter: event.value,
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="input-block mb-3 row">
                      <label className="col-form-label col-md-2">
                        File Input
                      </label>
                      <div className="col-md-10">
                        {/* <input className="form-control" type="file" /> */}
                        <input
                          type="file"
                          className="form-control"
                          accept=".xlsx, .xls"
                          onChange={handleFileUpload}
                        />
                        <input
                          type="hidden"
                          name="MAX_FILE_SIZE"
                          defaultValue={10485760}
                        />
                      </div>
                    </div>

                    <div></div>
                    <div className="row">
                      <h1>Table content</h1>
                      {/* <div className="col-lg-6"> */}
                      <div className="col-lg-6" style={{ width: "100%" }}>
                        <div className="card">
                          <div className="card-header">
                            <h4 className="card-title mb-0">Hover Rows</h4>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover mb-0">
                                <thead>
                                  <tr>
                                    <th>Id</th>
                                    <th>From Date</th>
                                    <th>To Date</th>
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Expense Type</th>
                                    <th>Tax Code</th>
                                    <th>Location</th>
                                    <th>Rec Amount</th>
                                    <th>Rec Current</th>
                                    <th>Description</th>
                                    <th>GST No.</th>
                                    <th>Region</th>
                                    <th>Expense Type Value</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {formData.expenseDataToBeSend.length > 0 &&
                                    formData.expenseDataToBeSend.map(
                                      (data, index) =>
                                        Object.values(data).map(
                                          (value, idx) => (
                                            <tr key={idx}>
                                              {Object.entries(value).map(
                                                (entry) => (
                                                  <td key={entry[0]}>
                                                    {entry[1]}
                                                  </td>
                                                )
                                              )}
                                            </tr>
                                          )
                                        )
                                      // </tr>
                                    )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="input-block mb-3 row">
                      <button className="btn btn-primary" type="submit">
                        Button
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExcelInfoFileUpload;
