import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Salary from "../../assets/json/employeeSalary";
import { Link } from "react-router-dom";
import Select from "react-select";

const ShowTravelData = (props) => {
  console.log("Your data in showTable",props)
  const [sapNumber,tripNumber] = [props.data.id.pernr, props.data.id.reinr]
  console.log("Sap and trip number",sapNumber,tripNumber)
  const [setselectOne] = useState(null);
  const [dataFetched, setDataFetched] = useState([]);
  //   const [checkData,setCheckData] = useState();
  // const data = Salary.Salary;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="table-avatar">
          <Link to="/profile" className="avatar">
            <img alt="" src={record.avatar} />
          </Link>
          <Link to="/profile">
            {text} <span>{record.position}</span>
          </Link>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      sorter: (a, b) => a.employeeId.length - b.employeeId.length,
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },

    {
      title: "Join Date",
      dataIndex: "joiningDate",
      sorter: (a, b) => a.joiningDate.length - b.joiningDate.length,
    },
    {
      title: "Role",
      dataIndex: "roles",
      render: (text) => (
        <div className="dropdown">
          <Link
            to="#"
            className="btn btn-white btn-sm btn-rounded dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {text}{" "}
          </Link>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="#">
              Software Engineer
            </Link>
            <Link className="dropdown-item" to="#">
              Software Tester
            </Link>
            <Link className="dropdown-item" to="#">
              Frontend Developer
            </Link>
            <Link className="dropdown-item" to="#">
              UI/UX Developer
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: "Salary",
      dataIndex: "salary",
      render: (text) => <span>${text}</span>,
      sorter: (a, b) => a.salary.length - b.salary.length,
    },
    {
      title: "Payslip",
      render: () => (
        // <Link className="btn btn-sm btn-primary" to="/salary-view">
        //   Show Travel Info
        // </Link>
        <Link
          className="btn btn-sm btn-primary"
          to="#"
          data-bs-toggle="modal"
          data-bs-target="#show_travel_data"
        >
          Show Travel Info
        </Link>
      ),
    },
    {
      title: "Action",
      render: () => (
        <div className="dropdown dropdown-action text-end">
          <Link
            to="#"
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#edit_salary"
            >
              <i className="fa fa-pencil m-r-5" /> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete"
            >
              <i className="fa fa-trash m-r-5" /> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const setColums = [
    // {
    //     title: "Sap Number",
    //     dataIndex: "pernr",
    //     sorter: (a, b) => a.employeeId.length - b.employeeId.length,
    // },
    {
      title: "Employee Number",
      dataIndex: "pernr",
      sorter: (a, b) => a.pernr.length - b.pernr.length,
    },
    {
      title: "Reimbursement Number",
      dataIndex: "reinr",
      sorter: (a, b) => a.reinr.length - b.reinr.length,
    },
    {
      title: "Receipt Number",
      dataIndex: "receipt_no", // Adjust according to your actual JSON structure
      sorter: (a, b) => a.receipt_no.length - b.receipt_no.length,
    },
    {
      title: "Receipt Number",
      dataIndex: "receiptno", // Adjust according to your actual JSON structure
      sorter: (a, b) => a.receiptno.length - b.receiptno.length,
    },
    {
      title: "Expense Type",
      dataIndex: "exp_type",
      sorter: (a, b) => a.exp_type.length - b.exp_type.length,
    },
    {
      title: "Description",
      dataIndex: "sptxt",
      sorter: (a, b) => a.sptxt.length - b.sptxt.length,
    },
    {
      title: "Received Amount",
      dataIndex: "rec_amount",
      sorter: (a, b) => a.rec_amount.length - b.rec_amount.length,
    },
    {
      title: "Received Currency",
      dataIndex: "rec_curr",
      sorter: (a, b) => a.rec_curr.length - b.rec_curr.length,
    },
    {
      title: "Local Amount",
      dataIndex: "loc_amount",
      sorter: (a, b) => a.loc_amount.length - b.loc_amount.length,
    },
    {
      title: "Local Currency",
      dataIndex: "loc_curr",
      sorter: (a, b) => a.loc_curr.length - b.loc_curr.length,
    },
    {
      title: "Receipt Date",
      dataIndex: "rec_date",
      sorter: (a, b) => a.rec_date.length - b.rec_date.length,
    },
    {
      title: "Tax Code",
      dataIndex: "tax_code",
      sorter: (a, b) => a.tax_code.length - b.tax_code.length,
    },
    {
      title: "From Date (Old Format)",
      dataIndex: "from_date",
      sorter: (a, b) => a.from_date.length - b.from_date.length,
    },
    {
      title: "To Date (Old Format)",
      dataIndex: "to_date",
      sorter: (a, b) => a.to_date.length - b.to_date.length,
    },
    {
      title: "From Date",
      dataIndex: "from_date1",
      sorter: (a, b) => a.from_date1.length - b.from_date1.length,
    },
    {
      title: "To Date",
      dataIndex: "to_date1",
      sorter: (a, b) => a.to_date1.length - b.to_date1.length,
    },
    {
      title: "Location Description",
      dataIndex: "descript",
      sorter: (a, b) => a.descript.length - b.descript.length,
    },
    {
      title: "Location",
      dataIndex: "location",
      sorter: (a, b) => a.location.length - b.location.length,
    },
    {
      title: "Document Number",
      dataIndex: "p_doc",
      sorter: (a, b) => a.p_doc.length - b.p_doc.length,
    },
    {
      title: "Region",
      dataIndex: "region",
      sorter: (a, b) => a.region.length - b.region.length,
    },
    {
      title: "Manager Remark",
      dataIndex: "rm_remark",
      sorter: (a, b) => a.rm_remark.length - b.rm_remark.length,
    },
    {
      title: "Head of Department Remark",
      dataIndex: "hod_remark",
      sorter: (a, b) => a.hod_remark.length - b.hod_remark.length,
    },
    {
      title: "Financial Remark",
      dataIndex: "fi_remark",
      sorter: (a, b) => a.fi_remark.length - b.fi_remark.length,
    },
  ];

  const options = [
    { value: 1, label: "John Doe" },
    { value: 2, label: "Richard Miles" },
  ];

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
    // This effect runs after the state has been updated
    console.log("Data fetched:", dataFetched);
  }, [dataFetched]); 

  useEffect(() => {
    const fetchData = async () => {
      const value = `${document.cookie}`;
      console.log(value);

      console.log("Printing values in useEffect",sapNumber,tripNumber)
      const url = `http://localhost:3000/api/TravelExpense/showExpenseUsingSapAndCode?value=${value}&sapNumber=${sapNumber}&tripNumber=${tripNumber}`;
      console.log(url);
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.travel_data);
          setDataFetched(data.travel_data);
          return data;
        })
        .catch((error) => {
          console.log("Error");
        });
    };
    fetchData();
  }, [sapNumber,tripNumber]);


  return (
    <>
      <div
        id="show_travel_data"
        className="modal custom-modal fade"
        role="dialog"
        
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Show Travel Data</h5>
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
              {/* <form action="salary">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Select Staff</label>
                      <Select
                        placeholder="Select a Category"
                        options={options}
                        onChange={setselectOne}
                        className="select"
                        styles={customStyles}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label className="col-form-label">Net Salary</label>
                    <input className="form-control" type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <h4 className="text-primary">Earnings</h4>
                    <div className="input-block mb-3">
                      <label className="col-form-label">Basic</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">DA(40%)</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">HRA(15%)</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">Conveyance</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">Allowance</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Medical Allowance
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">Others</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="add-more">
                      <Link to="#">
                        <i className="fa-solid fa-plus-circle" /> Add More
                      </Link>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <h4 className="text-primary">Deductions</h4>
                    <div className="input-block mb-3">
                      <label className="col-form-label">TDS</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">ESI</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">PF</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">Leave</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">Prof. Tax</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">Labour Welfare</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="input-block mb-3">
                      <label className="col-form-label">Others</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="add-more">
                      <Link to="#">
                        <i className="fa-solid fa-plus-circle" /> Add More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button
                    className="btn btn-primary submit-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    type="reset"
                  >
                    Submit
                  </button>
                </div>
              </form> */}
              {
                <Table
                  className="table-striped"
                  style={{ overflowX: "auto" }}
                  columns={setColums}
                  dataSource={dataFetched.data}
                // dataSource={Salary.Salary}  Change salary type in employeeSalary
                  rowKey={(record) => record.id}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowTravelData;
