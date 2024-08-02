import React ,{useState, useEffect}from "react";
import { Link } from "react-router-dom";
import Salary from "../../../../assets/json/employeeSalary";
import { Table } from "antd";
import EditSalaryModal from "../../../../components/modelpopup/EditSalaryModal";
import DeleteModal from "../../../../components/modelpopup/deletePopup";
import ShowTravelData from "../../../../components/modelpopup/ShowTravelData";
const TravelExpenseDataTable = () => {
  const data = Salary.Salary;
  const [dataFetched, setDataFetched] = useState([]);
  const columns = [
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
      title: "Travel Start Date",
      dataIndex: "datv1",
      sorter: (a, b) => a.datv1.length - b.datv1.length,
    },
    {
      title: "Travel Start Time",
      dataIndex: "uhrv1",
      sorter: (a, b) => a.uhrv1.length - b.uhrv1.length,
    },
    {
      title: "Travel End Date",
      dataIndex: "datb1",
      sorter: (a, b) => a.datb1.length - b.datb1.length,
    },
    {
      title: "Travel End Time",
      dataIndex: "uhrb1",
      sorter: (a, b) => a.uhrb1.length - b.uhrb1.length,
    },
    {
      title: "Travel Locations",
      dataIndex: "zort1",
      sorter: (a, b) => a.zort1.length - b.zort1.length,
    },
    {
      title: "Customer",
      dataIndex: "kunde",
      sorter: (a, b) => a.kunde.length - b.kunde.length,
    },
    {
      title: "HDVRS",
      dataIndex: "hdvrs",
      sorter: (a, b) => a.hdvrs.length - b.hdvrs.length,
    },
    {
      title: "Application Number",
      dataIndex: "antrg",
      sorter: (a, b) => a.antrg.length - b.antrg.length,
    },
    {
      title: "Application Text",
      dataIndex: "antrg_text",
      sorter: (a, b) => a.antrg_text.length - b.antrg_text.length,
    },
    {
      title: "Currency",
      dataIndex: "waers",
      sorter: (a, b) => a.waers.length - b.waers.length,
    },
    {
      title: "Trip Total",
      dataIndex: "trip_total",
      sorter: (a, b) => a.trip_total.length - b.trip_total.length,
    },
    {
      title: "Purpose Text",
      dataIndex: "pur_txt",
      sorter: (a, b) => a.pur_txt.length - b.pur_txt.length,
    },
    {
      title: "Out Text",
      dataIndex: "out_txt",
      sorter: (a, b) => a.out_txt.length - b.out_txt.length,
    },
    {
      title: "Show Expense",
      render: () => (
        // <Link className="btn btn-sm btn-primary" to="/salary-view">
        //   Show Travel Info
        // </Link>
        <Link
          className="btn btn-sm btn-primary"
          to="#"
          data-bs-toggle="modal"
          data-bs-target="#show_travel_data"
        >Show Travel Info</Link>
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

  useEffect(() => {
    const fetchData = async () => {
      const value = `${document.cookie}`;
      console.log(value);
      const url = `http://localhost:3000/api/TravelExpense/showExpenseUsingSap?value=${value}`;
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
  }, []);
  
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <Table
              className="table-striped"
              style={{ overflowX: "auto" }}
              columns={columns}
              dataSource={dataFetched.data}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </div>

      <EditSalaryModal />
      <ShowTravelData />
      <DeleteModal Name="Delete Salary" />
    </>
  );
};

export default TravelExpenseDataTable;
