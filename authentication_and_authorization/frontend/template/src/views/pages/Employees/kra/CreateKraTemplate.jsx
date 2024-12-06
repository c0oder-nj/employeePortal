import react, { useState, useEffect } from 'react';
import Breadcrumbs from "../../../../components/Breadcrumbs";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import '../../../../assets/css/shakti.css'
const CreateKraTemplate = () => {


  const { checkCookie } = useAuth();

    // Initialize state with an array for table rows
    const [rows, setRows] = useState([]);

    const addRow = () => {
      setRows([...rows, { kra_text: '', unit: '', weight: '', target_fy: '', py_actual: '', monthly_target: '', scale_parameter: '' }]);
    };


      // Handler to update a specific row field value
  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);


    console.log("Printing row data :: ", rows);
  };

  const removeLastRow = () => {
    if (rows.length > 0) {
      setRows(rows.slice(0, -1));
    }
  };



  const customStyle = {
    fontSize : '11px!important'
  }






  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Came under handleSubmit function");

    // // hit node post api with form data 
    // let data = JSON.stringify(pptData);
    // console.log("Printing data before hitting as post body");

    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: `${process.env.REACT_APP_BASE_URL}/api/employee/emp-ppt-data`,
    //   headers: {
    //     'accesstoken': checkCookie('accessToken').cookie.split('=').at(1),
    //     'Content-Type': 'application/json'
    //   },
    //   data: data
    // };

    // axios.request(config)
    //   .then((response) => {
    //     console.log("PRinting response data :: ", response.data);
    //     if (response.status == 200) {
    //       withReactContent(Swal).fire({
    //         showConfirmButton: true,
    //         showCancelButton: false,
    //         title: response.data.msg,
    //         preConfirm: () => {
    //           window.location.reload();
    //         }
    //       })
    //     } else {
    //       withReactContent(Swal).fire({
    //         showConfirmButton: true,
    //         showCancelButton: false,
    //         title: "Some Error occured while connecting to backend"
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     withReactContent(Swal).fire({
    //       showConfirmButton: true,
    //       showCancelButton: false,
    //       title: `Some Error occured ${error}`
    //     })
    //   });


  }



  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <Breadcrumbs
          maintitle="Create KRA Template"
          title="Dashboard"
          subtitle="Create Template"
        />

        <div className="row">
          <form method="post" onSubmit={handleSubmit}>






            <div className="col-md-12">
              <div className="card">





                <div className="card-header">
                  <h4 className="card-title mb-0 text-center text-decoration-underline">Create KRA Template</h4>
                </div>
                <div className="card-body">

                  <div className="row">

                    <table className='table table-hover table-bordered border-primary text-center'>
                      <thead>
                        <tr>
                          <th>Sr. No.</th>
                          <th>Individual KRA</th>
                          <th>Unit</th>
                          <th>Weight(%)</th>
                          <th>Target FY</th>
                          <th>PY Actual</th>
                          <th>Monthly Target</th>
                          <th>Scale Parameter</th>
                        </tr>
                      </thead>
                      <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  name={`kra_text[${index}]`}
                  value={row.kra_text}
                  onChange={(e) => handleChange(index, 'kra_text', e.target.value)}
                  className='input-group-text border-primary-subtle'
                />
              </td>
              <td>
                <select
                  name={`unit[${index}]`}
                  value={row.unit}
                  onChange={(e) => handleChange(index, 'unit', e.target.value)}
                  className='input-group-text border-primary-subtle'
                >
                  <option value="DT-FT">DISTANCE(FEET)</option>
                  <option value="INR-C">INR(CRORE)</option>
                  <option value="INR-L">INR(LACKS)</option>
                  <option value="NM-DG">NUMBER(DIGITS)</option>
                  <option value="NM-PR">PERCENTAGE</option>
                  <option value="RP-INR">RS(INR)</option>
                  <option value="TM-DY">TIME(DAYS)</option>
                  <option value="TM-HR">TIME(HOURS)</option>
                  <option value="TM-MN">TIME(MINUTES)</option>
                  <option value="TM-MT">TIME(MONTH)</option>
                  <option value="TM-QT">TIME(QUARTER)</option>
                  <option value="TM-WK">TIME(WEEK)</option>
                  <option value="TM-YR">TIME(YEAR)</option>
                  <option value="WT-GR">WT(GRAMS)</option>
                  <option value="WT-KG">WT(KG)</option>
                  <option value="WT-KM">DISTANCE(KILOMETER)</option>
                  <option value="WT-LT">WT(LITRE)</option>
                  <option value="WT-MT">DISTANCE(METER)</option>
                  <option value="WT-TON">WT(TON)</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name={`weight[${index}]`}
                  value={row.weight}
                  onChange={(e) => handleChange(index, 'weight', e.target.value)}
                  className='input-group-text border-primary-subtle rounded'
                />
                 <label className='d-block text-danger important-lable-fs'  htmlFor="lable">Note: value must be less than equal to 40</label>
              </td>
              <td>
                <input
                  type="text"
                  name={`target_fy[${index}]`}
                  value={row.target_fy}
                  onChange={(e) => handleChange(index, 'target_fy', e.target.value)}
                  className='input-group-text border-primary-subtle w-100'
                />
              </td>
              <td>
                <input
                  type="text"
                  name={`py_actual[${index}]`}
                  value={row.py_actual}
                  onChange={(e) => handleChange(index, 'py_actual', e.target.value)}
                  className='input-group-text border-primary-subtle w-100'
                />
              </td>
              <td>
                <input
                  type="text"
                  name={`monthly_target[${index}]`}
                  value={row.monthly_target}
                  onChange={(e) => handleChange(index, 'monthly_target', e.target.value)}
                  className='input-group-text border-primary-subtle'
                />
              </td>
              <td>
                <select
                  name={`scale_parameter[${index}]`}
                  value={row.scale_parameter}
                  onChange={(e) => handleChange(index, 'scale_parameter', e.target.value)}
                  className='input-group-text border-primary-subtle'
                >
                  <option value="">-</option>
                  <option value="LowerIsBetter">Lower is better</option>
                  <option value="HigherIsBetter">Higher is better</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
                    </table>



                  </div>
                  

                </div>
              </div>
            </div>
          </form>

          <div className="text-center mt-3 d-flex justify-content-center">
                    <button className="btn btn-primary me-3" onClick={addRow}>
                      Add Item
                    </button>

                    <button className='btn btn-primary' onClick={removeLastRow} disabled={rows.length === 0}>
                      Remove Last Item
                    </button>

                  </div>

        </div>
      </div>
    </div>
  )
}

export default CreateKraTemplate
