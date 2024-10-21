
import Breadcrumbs from "../../../../../../../components/Breadcrumbs";
import { Applogo } from "../../../../../../../Routes/ImagePath";
import Select from "react-select";
import useAuth from "../../../../../../../hooks/useAuth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


const Assesment = () => {
  const navigate = useNavigate();
  const { checkCookie } = useAuth();

  const location = useLocation();
  const locationVar = location.state;

  const [apiData, setApiData] = useState([]);
  const [hodAction, setHodAction] = useState();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minWidth: "150px",
    }),
  };
  useEffect(() => {
    console.log("In useEffect");
    const checkCk = checkCookie('accessToken');
    if (checkCk.status === false) {
      return navigate('/');
    }

    const cookieValue = checkCk.cookie.split('=').at(1);

    const fetchData = async () => {


      // check the type 
      const [employeeSapNumber, action] = locationVar.split('-');
      console.log(employeeSapNumber, action);
      setHodAction(action);


      const url = `${process.env.REACT_APP_BASE_URL}/api/admin/assesment-form?action=${action}&value=${employeeSapNumber}`;
      console.log(url);
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: {
          'accesstoken': cookieValue
        }
      };

      await axios.request(config)
        .then((response) => {
          if (response.status == 200) {
            console.log("Printing data in axio :: ", response.data);
            // return  response.data;
            setApiData(response.data.data.data);
          }
        })
        .catch((error) => {
          console.log("Some error while hitting api :: ", error);
          return null;
        });

    };
    fetchData();

  }, []);


  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <Breadcrumbs
          maintitle={hodAction == 'ppt' ? 'Confirmation PPT' : 'Assessment Form'}
          title="Dashboard"
          subtitle="Payslip"
        // modal="#add_categories"
        // name="Add Salary"
        />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="payslip-title">
                  {hodAction == 'ppt' ? 'Employee Confirmation PPT' : 'Hod Assessment Form'}
                </h4>
                <div className="row">
                  <div className="col-12">
                    {hodAction == 'ppt' ?
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card mb-0">
                            <div className="card-header">
                              {/* <h4 className="card-title mb-0">Confirmation PPT</h4> */}
                            </div>
                            <div className="card-body">
                              <form action="#">
                                <h4 className="">Personal Details</h4>
                                <div className="row border mb-5 pt-4 pb-2">
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">SAP Id:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.sapid} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Name:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.ename ? apiData?.at(0)?.ename : 'test'} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Company Name:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.comp_name ? apiData?.at(0)?.comp_name : 'test'} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Department Name:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.dept_name} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Designation:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.desig_text} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Joining Date:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.joining_date} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Reporting Manager:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.rm_name} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Head Of Department:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.hod_name} readOnly />
                                    </div>
                                  </div>

                                  {/* <div className="input-block mb-3">
                                        <label className="col-form-label">Your Message:</label>
                                        <textarea
                                          rows={5}
                                          cols={5}
                                          className="form-control"
                                          placeholder="Enter message"
                                          defaultValue={""}
                                        />
                                      </div>
                                    </div> */}

                                </div>

                                <h4>PPT Details</h4>
                                <div className="row border pt-4 pb-2">
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Achievements/Intiative Taken:</label>
                                      <textarea
                                        rows={2}
                                        cols={3}
                                        className="form-control"
                                        readOnly
                                        value={apiData?.at(0)?.achieve}
                                      />
                                      {/* <input type="text" className="form-control" value={apiData?.at(0)?.sapid} readOnly/> */}
                                    </div>
                                  </div>


                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Key Learning:</label>
                                      <textarea
                                        rows={2}
                                        cols={3}
                                        className="form-control"
                                        readOnly
                                        value={apiData?.at(0)?.key_learning}
                                      />
                                      {/* <input type="text" className="form-control" value={apiData?.at(0)?.sapid} readOnly/> */}
                                    </div>
                                  </div>


                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Key Responsibility Areas:</label>
                                      <textarea
                                        rows={2}
                                        cols={3}
                                        className="form-control"
                                        readOnly
                                        value={apiData?.at(0)?.key_resp_area}
                                      />
                                      {/* <input type="text" className="form-control" value={apiData?.at(0)?.sapid} readOnly/> */}
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Contribution:</label>
                                      <textarea
                                        rows={2}
                                        cols={3}
                                        className="form-control"
                                        readOnly
                                        value={apiData?.at(0)?.contribution}
                                      />
                                      {/* <input type="text" className="form-control" value={apiData?.at(0)?.sapid} readOnly/> */}
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Future Projects/ Plans in this organization:</label>
                                      <textarea
                                        rows={2}
                                        cols={3}
                                        className="form-control"
                                        readOnly
                                        value={apiData?.at(0)?.futr_proj}
                                      />
                                      {/* <input type="text" className="form-control" value={apiData?.at(0)?.sapid} readOnly/> */}
                                    </div>
                                  </div>

                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Suggestions:</label>
                                      <textarea
                                        rows={2}
                                        cols={3}
                                        className="form-control"
                                        readOnly
                                        value={apiData?.at(0)?.suggestions}
                                      />
                                      {/* <input type="text" className="form-control" value={apiData?.at(0)?.sapid} readOnly/> */}
                                    </div>
                                  </div>



                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      : 

                      <div className="row">
                        <div className="col-md-12">
                          <div className="card mb-0">
                            <div className="card-header">
                              {/* <h4 className="card-title mb-0">Confirmation PPT</h4> */}
                            </div>
                            <div className="card-body">
                              <form action="#">
                                <h4 className="">Personal Details</h4>
                                <div className="row border mb-5 pt-4 pb-2">
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">SAP Id:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.pernr} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Name:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.ename ? apiData?.at(0)?.ename : 'test'} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Company Name:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.company_name ? apiData?.at(0)?.company_name : 'test'} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Location:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.location} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Joining Date:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.join_date} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Confirmation Date:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.confir_due} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Department Name:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.btext} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Designation:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.ptext} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Reporting Manager:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.f_ename} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Head of department:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.hod_name} readOnly />
                                    </div>
                                  </div>
                                  {/* <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Head Of Department:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.hod_name} readOnly />
                                    </div>
                                  </div> */}

                                  {/* <div className="input-block mb-3">
                                        <label className="col-form-label">Your Message:</label>
                                        <textarea
                                          rows={5}
                                          cols={5}
                                          className="form-control"
                                          placeholder="Enter message"
                                          defaultValue={""}
                                        />
                                      </div>
                                    </div> */}

                                </div>


                                <h5 className="mb-3">Special/Significant task undertaken by him</h5>
                                <div className="border p-4 mb-3">
                                  
                                  <table className="table table-hover table-bordered border-primary table-striped">
                                    <thead className="fw-bold">
                                      <tr>
                                        <th scope="col">Task/Job/Assignment</th>
                                        <th scope="col">Remarks by the next superior</th>
                                      </tr>
                                    </thead>
                                    <tbody className="">
                                      <tr>
                                        <td>{apiData?.at(0)?.remark1 ?  apiData?.at(0)?.remark1 : ''}</td>
                                        <td>{apiData?.at(0)?.remark2 ?  apiData?.at(0)?.remark2 : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>{apiData?.at(0)?.remark3 ?  apiData?.at(0)?.remark3 : ''}</td>
                                        <td>{apiData?.at(0)?.remark4 ?  apiData?.at(0)?.remark4 : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>{apiData?.at(0)?.remark5 ?  apiData?.at(0)?.remark5 : ''}</td>
                                        <td>{apiData?.at(0)?.remark6 ?  apiData?.at(0)?.remark6 : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>{apiData?.at(0)?.remark7 ?  apiData?.at(0)?.remark7 : ''}</td>
                                        <td>{apiData?.at(0)?.remark8 ?  apiData?.at(0)?.remark8 : ''}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                    
                                </div>

                                <h5 className="mb-3 ">Employees’s Progress</h5>
                                <div className="border p-4 mb-3">

                                  <div className="description" style={{'float' : 'right'}}>
                                    <b>A*</b> - Excellent <b>B*</b> - Good <b>C*</b> - Average <b>D*</b> - Poor
                                  </div>
                                  
                                  <table className="table table-hover table-bordered border-primary table-striped">
                                    <thead className="fw-bold">
                                      <tr>
                                        <th scope="col">Factors</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Marks</th>
                                      </tr>
                                    </thead>
                                    <tbody className="">
                                      <tr>
                                        <td>Job Knowledge	</td>
                                        <td>Knows and understand all aspects of present position.</td>
                                        <td>{apiData?.at(0)?.job_knowledge ? apiData?.at(0)?.job_knowledge : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Planning</td>
                                        <td>Sets up objectives and course of action, develops and organises projects.	</td>
                                        <td>{apiData?.at(0)?.planning ?  apiData?.at(0)?.planning : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Quality</td>
                                        <td>Performs work accurately and thoroughly adheres to standards & policies cost consciousness.</td>
                                        <td>{apiData?.at(0)?.quality ?  apiData?.at(0)?.quality : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Initiative & Creativity	</td>
                                        <td>Takes initiative & meets dealings, imagination and develops new ideas and methods.	</td>
                                        <td>{apiData?.at(0)?.initiative_creativity ?  apiData?.at(0)?.initiative_creativity : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Cost Consciousness	</td>
                                        <td>Consider efforts made in cost of major items and timely action to check costs whenever necessary.	</td>
                                        <td>{apiData?.at(0)?.cost_consciousness ?  apiData?.at(0)?.cost_consciousness : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Communication</td>
                                        <td>Expresses with clarity of thought, both written and spoken.	</td>
                                        <td>{apiData?.at(0)?.communication ?  apiData?.at(0)?.communication : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Judgement</td>
                                        <td>Fair & Objectives in his judgement.	</td>
                                        <td>{apiData?.at(0)?.judgement ?  apiData?.at(0)?.judgement : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Organising ability	</td>
                                        <td>Resourceful, can organise and control problem effectively.	</td>
                                        <td>{apiData?.at(0)?.organising_ability ?  apiData?.at(0)?.organising_ability : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Dependability</td>
                                        <td>Fulfil obligations to company and position.	</td>
                                        <td>{apiData?.at(0)?.dependability ?  apiData?.at(0)?.dependability : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Ability in Making decision	</td>
                                        <td>Takes an overall view and has the ability to take timely and correct decision with confidence.	</td>
                                        <td>{apiData?.at(0)?.ability ?  apiData?.at(0)?.ability : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Employee Relation	</td>
                                        <td>Fair & Equitable to all is able to build and maintain team spirit.	</td>
                                        <td>{apiData?.at(0)?.employee_relation ?  apiData?.at(0)?.employee_relation : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Delegation</td>
                                        <td>Assigns work in relation to the capacity of his subordinates, never overloads himself with work that could be delegated.	</td>
                                        <td>{apiData?.at(0)?.delegation ?  apiData?.at(0)?.delegation : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Training</td>
                                        <td>Effectively guides and trains, counsel’s subordinates.	</td>
                                        <td>{apiData?.at(0)?.training ?  apiData?.at(0)?.training : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Leadership</td>
                                        <td>Directs personnel effectively so as to accomplish plan, projects and attain established goals.</td>
                                        <td>{apiData?.at(0)?.leadership ?  apiData?.at(0)?.leadership : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Discipline</td>
                                        <td>Maintains a high level of self discipline.	</td>
                                        <td>{apiData?.at(0)?.discipline ?  apiData?.at(0)?.discipline : ''}</td>
                                      </tr>
                                      <tr>
                                        <td>Habits</td>
                                        <td>Neatness, Systematic, Punctuality and attendance.	</td>
                                        <td>{apiData?.at(0)?.habits ?  apiData?.at(0)?.habits : ''}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                    
                                </div>
                                <h4 className="mb-3">Personal Details</h4>
                                <div className="row border mb-5 pt-4 pb-2">
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Please brief about his/her execution skills ( of the work allotted):</label>
                                    
                                      <input type="text" className="form-control" value={apiData?.at(0)?.execution_skills ? apiData?.at(0)?.execution_skills : 'test'} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Please brief about his/her interpersonal skills</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.interpersonal_skills ? apiData?.at(0)?.interpersonal_skills : 'test'} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Please brief about his upward and downward communication :</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.communication_skills ? apiData?.at(0)?.communication_skills : 'test'} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Please brief about his/her Function Skills (Knowledge of machine, equipment, SOP):</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.function_skills ? apiData?.at(0)?.function_skills : 'test'} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Is he/she adaptive to various situation/work pressure/new processes/new people?:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.adaptive_brief ? apiData?.at(0)?.adaptive_brief : 'test'} readOnly />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Is he/she able to obtain desirable results? Please brief :</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.desirable_result ? apiData?.at(0)?.desirable_result : 'test'} readOnly />
                                    </div>
                                  </div>
                                  
                                  {/* <div className="col-6">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Head Of Department:</label>
                                      <input type="text" className="form-control" value={apiData?.at(0)?.hod_name} readOnly />
                                    </div>
                                  </div> */}

                                  {/* <div className="input-block mb-3">
                                        <label className="col-form-label">Your Message:</label>
                                        <textarea
                                          rows={5}
                                          cols={5}
                                          className="form-control"
                                          placeholder="Enter message"
                                          defaultValue={""}
                                        />
                                      </div>
                                    </div> */}

                                </div>
                                <h4 className="mb-3">Circle the strongest factors/factors:</h4>
                                <div className="row border mb-5 pt-4 pb-2">
                                  <div className="col-12">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Additional comments if any(What significant contribution to the company has he/she made during the last six months).</label>
                                    
                                      <input type="text" className="form-control" value={apiData?.at(0)?.additional_comments ? apiData?.at(0)?.additional_comments : 'test'} readOnly />
                                    </div>
                                  </div>
                                </div>
                                <h4 className="mb-3">Addition Information</h4>
                                <div className="row border mb-5 pt-4 pb-2">
                                  <div className="col-12">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Can the assesses be confirmed.	</label>
                                    
                                      <input type="text" className="form-control" value={apiData?.at(0)?.assess1 ? apiData?.at(0)?.assess1 : 'test'} readOnly />
                                    </div>
                                  </div>
                                
                                  <div className="col-12">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Does he require additional training and suggest areas for improvement and development.	</label>
                                    
                                      <input type="text" className="form-control" value={apiData?.at(0)?.assess2 ? apiData?.at(0)?.assess2 : 'test'} readOnly />
                                    </div>
                                  </div>
                                
                                  <div className="col-12">
                                    <div className="input-block mb-3">
                                      <label className="col-form-label">Not performing satisfactorily, suggest action to take (Like extension of probation period / termination).	</label>
                                    
                                      <input type="text" className="form-control" value={apiData?.at(0)?.assess3 ? apiData?.at(0)?.assess3 : 'test'} readOnly />
                                    </div>
                                  </div>
                                </div>
                                
                                
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>


                    }
                  </div>
                </div>



                {/* Neeraj design */}

                <div className="row col-12">

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
