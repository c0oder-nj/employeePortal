const axios = require('axios')


const gatePassListing = (req,res) => {
    const sapId = req.sapid;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.BASE_URL_QUALITY}/gatepass_approval_pending.htm?app_pernr=${sapId}`,
        
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
    url: `${process.env.BASE_URL_QUALITY}/gatepass_approva_rejectl.htm?pernr=${sapId}&gp_no=${gpNo}&app_pernr=${approverSapId}&status=${statusText}`,
    
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

module.exports = { gatePassListing ,approveReject }