import React, { useEffect, useState } from "react";
import Select from "react-select";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import HorizontalsubForm from "../../Ui_Interface/Forms/HorizontalsubForm";





const EmpConfirmationPPT = () => {

  const { checkCookie } = useAuth();



    const [pptData, setPPTData] = useState({
        key_learning : "",
        kras : "",
        contribution : "",
        achievements : "",
        projectPlans : "",
        suggestions : ""
    });

    

    const updateData = (event) => {
        
        setPPTData(()=>({
            ...pptData,
            [event.target.name] : event.target.value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Came under handleSubmit function");

        // hit node post api with form data 
        let data = JSON.stringify(pptData);
        console.log("Printing data before hitting as post body");

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${process.env.REACT_APP_BASE_URL}/api/employee/emp-ppt-data`,
          headers: { 
            'accesstoken': checkCookie('accessToken').cookie.split('=').at(1), 
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios.request(config)
        .then((response) => {
          console.log("PRinting response data :: ", response.data);
          if(response.status == 200){
            withReactContent(Swal).fire({
              showConfirmButton : true,
              showCancelButton : false,
              title : response.data.msg,
              preConfirm : ()=> {
                window.location.reload();
              }
            })
          }else{
            withReactContent(Swal).fire({
              showConfirmButton : true,
              showCancelButton : false,
              title : "Some Error occured while connecting to backend"
            })
          }
        })
        .catch((error) => {
          console.log(error);
          withReactContent(Swal).fire({
            showConfirmButton : true,
            showCancelButton : false,
            title : `Some Error occured ${error}`
          })
        });


    }

    
  const State = [
    { value: 1, label: "California" },
    { value: 2, label: "Texas" },
    { value: 3, label: "Florida" },
  ];
  const Country = [
    { value: 1, label: "USA" },
    { value: 2, label: "Franch" },
    { value: 3, label: "India" },
    { value: 3, label: "Spain" },
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


  const BloodGroup = [
    { value: 1, label: "A+" },
    { value: 2, label: "O+" },
    { value: 3, label: "B+" },
    { value: 4, label: "AB+" },
  ];


//   useEffect(()=>{
//     console.log("Changes occured in PPT Data :: ", pptData);
// },[pptData])

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Confirmation PPT"
            title="Dashboard"
            subtitle="Fill Confirmation PPT"
          />
          {/* /Page Header */}
          {/* <HorizontalsubForm /> */}
          <div className="row">

          <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0 text-center text-decoration-underline">Employee Confirmation PPT</h4>
            </div>
            <div className="card-body">
              <h4 className="card-title">Confirmation PPT</h4>
              <form method="post" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5">
                      <label className="col-lg-6 col-md-6 col-sm-12 ms-2 col-form-label">
                        Key Learning
                      </label>
                      <textarea
                          rows={5}
                          cols={5}
                          className="form-control"
                          placeholder="Key Learning"
                          name="key_learning"
                          maxLength={255}
                          onChange={updateData}
                        />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5">
                      <label className="col-lg-6 col-md-6 col-sm-12 ms-2 col-form-label">
                      Key Responsibility Areas
                      </label>
                      <textarea
                          rows={5}
                          cols={5}
                          className="form-control"
                          placeholder="Key Responsibility Areas"
                          maxLength={255}
                          name="kras"
                          onChange={updateData}
                        />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5">
                      <label className="col-lg-6 col-md-6 col-sm-12 ms-2 col-form-label">
                      Contribution
                      </label>
                      <textarea
                          rows={5}
                          cols={5}
                          className="form-control"
                          placeholder="Contribution"
                          maxLength={255}
                          name="contribution"
                          onChange={updateData}
                        />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5">
                      <label className="col-lg-6 col-md-6 col-sm-12 ms-2 col-form-label">
                      Achievements/Initiative Taken
                      </label>
                      <textarea
                          rows={5}
                          cols={5}
                          className="form-control"
                          placeholder="Achievements/Initiative Taken"
                          maxLength={255}
                          name="achievements"
                          onChange={updateData}
                        />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5">
                      <label className="col-lg-6 col-md-6 col-sm-12 ms-2 col-form-label">
                      Future Projects/ Plans in this organization
                      </label>
                      <textarea
                          rows={5}
                          cols={5}
                          className="form-control"
                          placeholder="Future Projects/ Plans in this organization"
                          maxLength={255}
                          name="projectPlans"
                          onChange={updateData}
                        />
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-5">
                      <label className="col-lg-6 col-md-6 col-sm-12 ms-2 col-form-label">
                      Suggestions
                      </label>
                      <textarea
                          rows={5}
                          cols={5}
                          className="form-control"
                          placeholder="Suggestions"
                          maxLength={255}
                          name="suggestions"
                          onChange={updateData}
                        />
                  </div>


                </div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
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

export default EmpConfirmationPPT;
