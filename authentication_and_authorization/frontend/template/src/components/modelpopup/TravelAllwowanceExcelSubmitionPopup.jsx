import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Select from "react-select";
import DatePicker from "react-datepicker";

const TravelAllwowanceExcelSubmitionPopup = () => {
  const [data, setData] = useState([]);
  const [excelData, setExcelData] = useState(null);
  const [expenseData, setExpenseData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectCostCenter, setSelectCostCenter] = useState([]);
  const [isDomestic, setIsDomestic] = useState(true);
  const [formData, setFormData] = useState({
    Country: "",
    TimeStart: "",
    TimeEnd: "",
    Location: "",
    CostCenter: "",
    SapNmber: "5053",
    expenseDataToBeSend: [],
  });
  const selectExpenseType = [
    { label: "Domestic", value: "domestic" },
    { label: "International", value: "international" },
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

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_BASE_URL}/api/TravelExpense/countryAndCostCenterCode`;
      console.log(url);
      await fetch(url, {
        headers : {
          'Access-Control-Allow-Origin' : '*'
        }
      })
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
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const columnsToExtract = [
        "column_id",
        "from_date1",
        "to_date1",
        "country",
        "state",
        "city",
        "exp_type",
        "TAX_CODE",
        "location",
        "rec_amount",
        "rec_curr",
        "descript",
        "gst_no",
        "region",
        "expenseTypeValue",
      ];

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const rows = jsonData;
      const headers = rows[0];

      const typeIndex = headers.indexOf("Type");

      const groupedData = rows.slice(1).reduce((acc, row) => {
        const type = row[typeIndex];
        if (!acc[type]) {
          acc[type] = [];
        }

        const rowData = columnsToExtract.reduce((rowAcc, column) => {
          const columnIndex = headers.indexOf(column);
          if (columnIndex >= 0 && columnIndex < row.length) {
            rowAcc[column] = row[columnIndex];
          }
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
      }));

      setExpenseData((prevData) => ({
        ...prevData,
        [sheetName]: groupedData,
      }));

      setExcelData({
        sheetName,
        data: XLSX.utils.sheet_to_json(sheet, { header: 1 }),
      });
    };

    reader.readAsArrayBuffer(file);
  };

  async function sendDataDomestic(e) {
    e.preventDefault();

    function getDate() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      return `${year}${month}${date}`;
    }

    function getConvertedDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      console.log(`${year}${month}${day}`)
      return `${year}${month}${day}`;
    }

    if (
      getConvertedDate() < formData.TimeStart ||
      getConvertedDate() < formData.TimeEnd
    ) {
      console.log("Printing todays date", getDate());
      Toastify({
        text: "End Date or Start date is later then today ",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
    } else if (formData.TimeStart > formData.TimeEnd) {
      console.log(formData.TimeStart);
      console.log(formData.TimeEnd);
      Toastify({
        text: "End Date is earlier then start date",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
    } else {
      console.log("In send Data");
      console.log(JSON.stringify(formData));
      const value = `${document.cookie}`;
      console.log(value);
      // const url = `http://localhost:3000/api/employee/employeeAttendanceApply?value=${value}`;
      const url = `${process.env.REACT_APP_BASE_URL}/api/TravelExpense/domesticTravelExpens?value=${value}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Headers":
          "Content-Type, Authorization, Access-Control-Allow-Headers",
          "Access-Control-Allow-Methods": "POST",
          'Access-Control-Allow-Origin' : '*'
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
  }
  async function sendDataInternational(e) {
    e.preventDefault();
    console.log("In send Data");
    console.log(JSON.stringify(formData));
    const value = `${document.cookie}`;
    console.log(value);
    // const url = `http://localhost:3000/api/employee/employeeAttendanceApply?value=${value}`;
    const url = `${process.env.REACT_APP_BASE_URL}/api/TravelExpense/domesticTravelExpens?value=${value}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Access-Control-Allow-Headers",
        "Access-Control-Allow-Methods": "POST",
        'Access-Control-Allow-Origin' : '*'
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
      <div
        id="travel_allwowance"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Staff Salary</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* <form action="salary"> */}
              <div className="row"></div>
              <div className="card-body">
                <form
                  onSubmit={
                    isDomestic ? sendDataDomestic : sendDataInternational
                  }
                >
                  {/* <form > */}
                  <div className="input-block mb-3 row">
                    <label className="col-form-label col-md-2">
                      Select Expense Type
                    </label>
                    <div className="col-md-10">
                      <Select
                        options={selectExpenseType}
                        placeholder="-- Select --"
                        styles={customStyles}
                        onChange={(event) => {
                          if (event.value == "international") {
                            setIsDomestic(false);
                          } else if (event.value == "domestic") {
                            setIsDomestic(true);
                          }
                        }}
                      />
                    </div>
                  </div>
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
                    <label className="col-form-label col-md-2">Location</label>
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
                  {isDomestic && (
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
                  )}
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
                        {isDomestic && (
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
                                        // console.log("Here in map",data),
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
                                    )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
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
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelAllwowanceExcelSubmitionPopup;
