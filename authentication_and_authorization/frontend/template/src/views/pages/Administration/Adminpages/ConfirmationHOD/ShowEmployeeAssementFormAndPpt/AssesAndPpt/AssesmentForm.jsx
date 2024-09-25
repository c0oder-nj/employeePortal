
import Breadcrumbs from "../../../../../../../components/Breadcrumbs";
import { Applogo } from "../../../../../../../Routes/ImagePath";
import Select from "react-select";
import useAuth from "../../../../../../../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";


const Assesment = () => {
  const navigate = useNavigate();
  const { checkCookie } = useAuth();
  
  const location= useLocation();
  const employeeSapNumber = location.state;
  console.log("Printing value",employeeSapNumber);
  
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "150px",
    }),
  };
  useEffect(()=>{
    console.log("In useEffect");
    const checkCk = checkCookie('accessToken');
    if(checkCk.status === false){
      return navigate('/');
    }

    const fetchData = async () => {
      
      const cookieExists = checkCookie("accessToken");
      let cookieValue = cookieExists.cookie;
      cookieValue = cookieValue.split('=').at(1);
      console.log(
        "Printing value at 478 for travelexpense data in local :: ",
        cookieValue
      );
      const url = `${process.env.REACT_APP_BASE_URL}/api/admin/assesment-form?value=${employeeSapNumber}`;
      console.log(url);
      await fetch(url, {
        headers: {
          'accesstoken': cookieValue,
          'Content-Type': 'application/json'
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          
          console.log("Printing travel data in data.travel_data :: ", data);
          
          return data;
          
        })
        .catch((error) => {
          console.log("Error",error);
        });
     
    };
    fetchData();

  },[]);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle="Assesment Form"
          // title="Dashboard"
          // subtitle="Payslip"
          // modal="#add_categories"
          // name="Add Salary"
        />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="payslip-title">
                  Payslip for the month of Feb 2019
                </h4>
                {/* <div className="row">
                  <div className="col-sm-6 m-b-20">
                    <img src={Applogo} className="inv-logo" alt="Logo" />
                    <ul className="list-unstyled mb-0">
                      <li>Dreamguy's Technologies</li>
                      <li>3864 Quiet Valley Lane,</li>
                      <li>Sherman Oaks, CA, 91403</li>
                    </ul>
                  </div>
                  <div className="col-sm-6 m-b-20">
                    <div className="invoice-details">
                      <h3 className="text-uppercase">Payslip #49029</h3>
                      <ul className="list-unstyled">
                        <li>
                          Salary Month: <span>March, 2019</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-lg-12 m-b-20">
                    <ul className="list-unstyled">
                      <li>
                        <h5 className="mb-0">
                          <strong>COMPANY NAME :</strong>Shakti Pumps
                        </h5>
                      </li>
                      <li>
                      <h5 className="mb-0">
                          <strong>Location:</strong>Pithampur
                        </h5>
                      </li>
                      <li><h5 className="mb-0">
                          <strong>Name:</strong>Shiv Dev Singh
                        </h5></li>
                        <li><h5 className="mb-0">
                          <strong>SAP.NO. *:</strong>00005052
                        </h5></li>
                        <li><h5 className="mb-0">
                          <strong>Designation :</strong>P
                        </h5></li>
                        <li><h5 className="mb-0">
                          <strong>DEPT :</strong>Z001
                        </h5></li>
                        <li><h5 className="mb-0">
                          <strong>DATE OF JOINING * :</strong>20240108
                        </h5></li>
                        <li><h5 className="mb-0">
                          <strong>CONFIRMATION DUE ON * :</strong>20241007
                        </h5></li>
                    </ul>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-sm-6">
                    <div>
                      <h4 className="m-b-10">
                        <strong>Earnings</strong>
                      </h4>
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Basic Salary</strong>{" "}
                              <span className="float-end">$6500</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>House Rent Allowance (H.R.A.)</strong>{" "}
                              <span className="float-end">$55</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Conveyance</strong>{" "}
                              <span className="float-end">$55</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Other Allowance</strong>{" "}
                              <span className="float-end">$55</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Total Earnings</strong>{" "}
                              <span className="float-end">
                                <strong>$55</strong>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div>
                      <h4 className="m-b-10">
                        <strong>Deductions</strong>
                      </h4>
                      <table className="table table-bordered">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Tax Deducted at Source (T.D.S.)</strong>{" "}
                              <span className="float-end">$0</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Provident Fund</strong>{" "}
                              <span className="float-end">$0</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>ESI</strong>{" "}
                              <span className="float-end">$0</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Loan</strong>{" "}
                              <span className="float-end">$300</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Total Deductions</strong>{" "}
                              <span className="float-end">
                                <strong>$59698</strong>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <p>
                      <strong>Net Salary: $59698</strong> (Fifty nine thousand
                      six hundred and ninety eight only.)
                    </p>
                  </div>
                </div> */}
                {/* <div className="row">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="bg-white p-3">
                        <h3>Emp Assessment Details</h3>
                        <p>
                          <strong>Transaction:</strong> Emp Assessment
                        </p>
                        <p>
                          <strong>COMPANY NAME:</strong> Shakti Pumps (India)
                          Ltd.
                        </p>
                        <p>
                          <strong>Location:</strong> Pithampur
                        </p>
                        <p>
                          <strong>Name:</strong> Shiv Dev Singh
                        </p>
                        <p>
                          <strong>SAP.NO.:</strong> 00005052
                        </p>
                        <p>
                          <strong>DESIGNATION:</strong> P
                        </p>
                        <p>
                          <strong>DEPT:</strong> Z001
                        </p>
                        <p>
                          <strong>DATE OF JOINING:</strong> 20240108
                        </p>
                        <p>
                          <strong>CONFIRMATION DUE ON:</strong> 20241007
                        </p>

                        <h5>
                          Areas in which the employee was given an exposure:
                        </h5>
                        <p>{formData.exposure}</p>

                        <h5>Special / significant task undertaken by him:</h5>
                        <ul>
                          {formData.remarks.map((remark, index) => (
                            <li key={index}>{remark}</li>
                          ))}
                        </ul>

                        <p>
                          1. This report is designed to help in the evaluation,
                          work performance, and potential abilities of the
                          employees.
                        </p>
                        <p>2. Please (✓) on the appropriate box.</p>
                        <p>
                          3. If you have any additional comments to offer,
                          enumerate them at the end of the report.
                        </p>

                        <table className="table">
                          <thead>
                            <tr>
                              <th>S.N.</th>
                              <th>Factors</th>
                              <th>Description</th>
                              <th>Select</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                sn: 1,
                                factor: "Job Knowledge",
                                description:
                                  "Knows and understand all aspects of present position.",
                                factorKey: "jobKnowledge",
                              },
                              {
                                sn: 2,
                                factor: "Planning",
                                description:
                                  "Sets up objectives and course of action, develops and organises projects.",
                                factorKey: "planning",
                              },
                              {
                                sn: 3,
                                factor: "Quality",
                                description:
                                  "Performs work accurately and thoroughly adheres to standards & policies.",
                                factorKey: "quality",
                              },
                              // Add more factors here...
                            ].map(({ sn, factor, description, factorKey }) => (
                              <tr key={sn}>
                                <td>{sn}</td>
                                <td>{factor}</td>
                                <td>{description}</td>
                                <td>
                                  <Select
                                    options={selectOptions}
                                    placeholder="None"
                                    styles={customStyles}
                                    onChange={(selectedOption) =>
                                      handleChange(selectedOption, factorKey)
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <h5>Execution Skills:</h5>
                        <p>{formData.executionSkills}</p>

                        <h5>Interpersonal Skills:</h5>
                        <p>{formData.interpersonalSkills}</p>

                        <h5>Communication Skills:</h5>
                        <p>{formData.communicationSkills}</p>

                        <h5>
                          Function Skills (Knowledge of machine, equipment,
                          SOP):
                        </h5>
                        <p>{formData.functionSkills}</p>

                        <h5>
                          Adaptive to situations/work pressure/new
                          processes/people:
                        </h5>
                        <p>{formData.adaptiveBrief}</p>

                        <h5>Desirable Results:</h5>
                        <p>{formData.desirableResult}</p>

                        <h5>Additional Comments:</h5>
                        <p>{formData.additionalComments}</p>

                        <h5>Assessment:</h5>
                        <ul>
                          <li>
                            Can the assesses be confirmed? {formData.assess1}
                          </li>
                          <li>
                            Does he require additional training?{" "}
                            {formData.assess2}
                          </li>
                          <li>
                            Not performing satisfactorily? {formData.assess3}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assesment;
