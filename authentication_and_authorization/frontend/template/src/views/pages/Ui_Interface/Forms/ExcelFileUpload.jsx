import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const ExcelFileUpload = () => {
  const [data, setData] = useState([]);
  const [excelData, setExcelData] = useState(null);
  const [expenseData, setExpenseData] = useState({});
  const [formData, setFormData] = useState({
    Name: "",
    Designation: "",
    Destination: "",
    TimeStart: "",
    TimeEnd: "",
    TotalAdvance: "",
    MentionName: "",
    InINR: "",
  });

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
              setFormData((previousState) => ({ ...previousState, Name: ele[1] }));
            } else if (ele[0] === "Designation") {
              setFormData((previousState) => ({ ...previousState, Designation: ele[1] }));
            } else if (ele[0] === "Destination") {
              setFormData((previousState) => ({ ...previousState, Destination: ele[1] }));
            } else if (ele[0] === "Time start") {
              setFormData((previousState) => ({ ...previousState, TimeStart: ele[1] }));
            } else if (ele[0] === "Time end") {
              setFormData((previousState) => ({ ...previousState, TimeEnd: ele[1] }));
            } else if (ele[0] === "Total Advance") {
              setFormData((previousState) => ({ ...previousState, TotalAdvance: ele[1] }));
            } else if (ele[0] === "Mention") {
              setFormData((previousState) => ({ ...previousState, MentionName: ele[1] }));
            } else if (ele[0] === "In INR") {
              setFormData((previousState) => ({ ...previousState, InINR: ele[1] }));
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

          setExpenseData((prevData) => ({
            ...prevData,
            [sheetName]: groupedData,
          }));
        }
      });

      setExcelData(workbook.SheetNames.map(sheetName => ({
        sheetName,
        data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 })
      })));
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="content-page-header">
            <h5>Upload an Excel File for Travel Expense</h5>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          {/* Drag Card */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Single File Upload</h5>
              </div>
              <div className="card-body">
                <div
                  className="custom-file-container"
                  data-upload-id="myFirstImage"
                >
                  <label>
                    Upload your Excel file from here{" "}
                    <Link
                      to="#"
                      className="custom-file-container__image-clear"
                      title="Clear Image"
                    >
                      x
                    </Link>
                  </label>
                  <label className="custom-file-container__custom-file">
                    <input
                      type="file"
                      className="custom-file-container__custom-file__custom-file-input"
                      accept=".xlsx, .xls"
                      onChange={handleFileUpload}
                    />
                    <input
                      type="hidden"
                      name="MAX_FILE_SIZE"
                      defaultValue={10485760}
                    />
                    <span className="custom-file-container__custom-file__custom-file-control">
                      <span className="custom-file-container__custom-file__custom-file-control_button">
                        Browse your Excel file from here
                      </span>
                    </span>
                  </label>
                </div>
                {/* <div className="mt-4">
                  <h5>Data from Excel:</h5>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </div> */}
                {excelData && (
                  <div>
                    <h3>Excel Data:</h3>
                    {excelData.map((sheet, index) => (
                      <div key={index}>
                        <h4>{sheet.sheetName}</h4>
                        <pre>{JSON.stringify(sheet.data, null, 2)}</pre>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <h1>Print value for form data</h1>
                  <pre>{formData.Name}</pre>
                  <pre>{formData.Designation}</pre>
                  <pre>{formData.Destination}</pre>
                  <pre>{formData.TimeStart}</pre>
                  <pre>{formData.TimeEnd}</pre>
                  <pre>{formData.TotalAdvance}</pre>
                  <pre>{formData.MentionName}</pre>
                  <pre>{formData.InINR}</pre>
                </div>
              </div>

              <div>
                {expenseData
                  ? Object.entries(expenseData).map(([sheetName, groupedData]) => (
                      <div key={sheetName}>
                        <h3>{sheetName}</h3>
                        {Object.entries(groupedData).map(([key, value]) => (
                          <div key={key}>
                            <h4>{key}</h4>
                            <ul>
                              {value.map((item, index) => (
                                <li key={index}>
                                  {JSON.stringify(item)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ))
                  : "Working"}
              </div>
            </div>
          </div>
        </div>
        {/* /Drag Card */}
      </div>
    </div>
  );
};

export default ExcelFileUpload;
