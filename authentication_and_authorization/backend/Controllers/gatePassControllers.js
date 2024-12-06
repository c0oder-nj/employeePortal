const axios = require('axios')

const createGatePass = (req,res)=>{
    const sapId = req.sapid;
    const formData = req.body;

    console.log("Sap id for which gate pass is being created is :: ", sapId);
    console.log("Formdata for gatepass updated:: ", formData);

    if(!formData){
      return res.json({'status' : false, 'text' : 'Please fill form correctly'});
    }

    if(Object.keys(formData).length < 4){
      return res.json({'status' : false, 'text' : 'Please fill form correctly'});
    }


    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL}/gp_create.htm?app_pernr=${sapId}&gp_date=${formData.date}&gp_time=${formData.time}&req_type=${formData.requestType}&gp_type=${formData.gatePassType}&gp_exp_date=${formData.expComeBackDate}&gp_exp_time=${formData.expComeBackTime}&gp_vp=${formData.place}&gp_purpose=${formData.purpose}&gp_charge=${formData.handoverPerson}`,
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

const gatePassListing = (req,res) => {
    const sapId = req.sapid;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.BASE_URL}/gatepass_approval_pending.htm?app_pernr=${sapId}`,
        
        headers: { 
          'Cookie': 'sap-usercontext=sap-client=900'
        }
      };
      
      axios.request(config)
      .then((response) => {
        if(response.status){
            return res.send(response.data);
        }
      })
      .catch((error) => {
        return res.send(error);
      });

}

const gatePassListingEmp = (req,res) => {
    const sapId = req.sapid;
    console.log(sapId);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL}/gatepass_listing_emp.htm?sapid=${sapId}`,
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


const approveReject = (req,res) => {

  // return res.send("Api hit ");
  const approverSapId = req.sapid;
  const status = req.query.status;
  const sapId = req.query.pernr;
  const gpNo = req.query.gpno;

  const statusText = ( status == 1 ? 'approve' : 'reject' );

  // console.log("Priting variables");
  // console.log("Approver sap id :: ", approverSapId);
  // console.log("status :: ", status);
  // console.log("status text :: ", statusText);
  // console.log("GatePass Number :: ", gpNo);
  // console.log("employee Pernr :: ", sapId);

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL}/gatepass_approva_rejectl.htm?pernr=${sapId}&gp_no=${gpNo}&app_pernr=${approverSapId}&status=${statusText}`,
    
    headers: { 
      'Cookie': 'sap-usercontext=sap-client=900'
    }
  };
  
  axios.request(config)
  .then((response) => {
    if(response.data.at(0).msgtyp == 'S') {
      if(status == 1){
        return res.json({'status' : true , 'msg' : 'Gate Pass approved Succesfully'});
      }else if(status == 0){
        return res.json({'status' : true , 'msg' : 'Gate Pass rejected Succesfully'});
      }
    }else{
      return res.send(response.data);
    }
    console.log("Printing Response :: ", response.data)
  })
  .catch((error) => {
    console.log(error);
    return res.send(error)
  });
  
}

module.exports = { gatePassListing ,approveReject,createGatePass, gatePassListingEmp }