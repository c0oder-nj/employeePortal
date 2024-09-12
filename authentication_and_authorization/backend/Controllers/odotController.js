const axios = require('axios')

const createOdOt = (req,res)=>{
    const sapId = req.sapid;
    const formData = req.body;
    
    console.log("Sap id for which OTOD pass is being created is :: ", sapId);
    console.log("Formdata for ODOT pass updated:: ", formData);
    // res.send({"abc":123});
    if(!formData){
      return res.json({'status' : false, 'text' : 'Please fill form correctly'});
    }

    if(Object.keys(formData).length < 9){
      return res.json({'status' : false, 'text' : 'Please fill form correctly'});
    }


    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL_QUALITY}/od_create.htm?app_pernr=${sapId}&atnds_status=${formData.attendanceType}&app_od_from=${formData.dateFrom}&app_od_to=${formData.dateTo}&app_od_visitplace=${formData.placeToVisit}&app_od_workplace=${formData.odWorkPlace}&app_od_purpose1=${formData.purpose}&app_od_charge=${formData.handOverCharges}&Frm_tim=${formData.timeFrom}`,
    };
    
    axios.request(config)
    .then((response) => {
      if(response.status == 200){
        console.log(JSON.stringify(response.data));
        return res.send(response.data.at(0));
      }else{
        return res.json({'status' : false, 'Message' : 'Some error occured'});
      }
    })
    .catch((error) => {
      console.log(error);
    });

}

// const gatePassListing = (req,res) => {
//     const sapId = req.sapid;
//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `${process.env.BASE_URL}/gatepass_approval_pending.htm?app_pernr=${sapId}`,
        
//         headers: { 
//           'Cookie': 'sap-usercontext=sap-client=900'
//         }
//       };
      
//       axios.request(config)
//       .then((response) => {
//         if(response.status){
//             return res.send(response.data);
//         }
//       })
//       .catch((error) => {
//         return res.send(error);
//       });

// }

const odotListingEmp = (req,res) => {

  console.log("You are in odot listing emp");
  const sapId = req.sapid;
  console.log(sapId);
  // res.json({'status' : true, 'Message' : 'Something'});
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL_QUALITY}/od_data_emp.htm?sapid=${sapId}`,
      headers: { 
        'Cookie': 'sap-usercontext=sap-client=900'
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if(response.status == 200){
        return res.send(response.data);
      }else{
        return res.json({'status' : false, 'message' : 'Some Error Occured'});
      }
    })
    .catch((error) => {
      console.log(error);
    });
}


// const approveReject = (req,res) => {

//   // return res.send("Api hit ");
//   const approverSapId = req.sapid;
//   const status = req.query.status;
//   const sapId = req.query.pernr;
//   const gpNo = req.query.gpno;

//   const statusText = ( status == 1 ? 'approve' : 'reject' );

//   // console.log("Priting variables");
//   // console.log("Approver sap id :: ", approverSapId);
//   // console.log("status :: ", status);
//   // console.log("status text :: ", statusText);
//   // console.log("GatePass Number :: ", gpNo);
//   // console.log("employee Pernr :: ", sapId);

//   let config = {
//     method: 'get',
//     maxBodyLength: Infinity,
//     url: `${process.env.BASE_URL}/gatepass_approva_rejectl.htm?pernr=${sapId}&gp_no=${gpNo}&app_pernr=${approverSapId}&status=${statusText}`,
    
//     headers: { 
//       'Cookie': 'sap-usercontext=sap-client=900'
//     }
//   };
  
//   axios.request(config)
//   .then((response) => {
//     if(response.data.at(0).msgtyp == 'S') {
//       if(status == 1){
//         return res.json({'status' : true , 'msg' : 'Gate Pass approved Succesfully'});
//       }else if(status == 0){
//         return res.json({'status' : true , 'msg' : 'Gate Pass rejected Succesfully'});
//       }
//     }else{
//       return res.send(response.data);
//     }
//     console.log("Printing Response :: ", response.data)
//   })
//   .catch((error) => {
//     console.log(error);
//     return res.send(error)
//   });
  
// }

// module.exports = { gatePassListing ,approveReject,createGatePass, gatePassListingEmp }

module.exports = {createOdOt,odotListingEmp}