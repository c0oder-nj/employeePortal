const axios = require('axios')

const createOdOt = (req,res)=>{
    const sapId = req.sapid;
    const formData = req.body;

    console.log("Sap id for which gate pass is being created is :: ", sapId);
    console.log("Formdata for gatepass updated:: ", formData);
    res.send({"abc":123});
    if(!formData){
      return res.json({'status' : false, 'text' : 'Please fill form correctly'});
    }

    if(Object.keys(formData).length < 9){
      return res.json({'status' : false, 'text' : 'Please fill form correctly'});
    }


    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL_QUALITY}/gp_create.htm?app_pernr=${sapId}&gp_date=${formData.date}&gp_time=${formData.time}&req_type=${formData.requestType}&gp_type=${formData.gatePassType}&gp_exp_date=${formData.expComeBackDate}&gp_exp_time=${formData.expComeBackTime}&gp_vp=${formData.place}&gp_purpose=${formData.purpose}&gp_charge=${formData.handoverPerson}`,
    };
    
    // axios.request(config)
    // .then((response) => {
    //   if(response.status == 200){
    //     console.log(JSON.stringify(response.data));
    //     return res.send(response.data.at(0));
    //   }else{
    //     return res.json({'status' : false, 'Message' : 'Some error occured'});
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

}


const ododListing = (req,res) => {

  const sapId = req.sapid;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL_QUALITY}/od_data_hod.htm?sapid=${sapId}`,
    headers: { 
      'Cookie': 'sap-usercontext=sap-client=900'
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    if(response.status == 200) {
      return res.json({"status" : true, "data" : response.data});
    }else{
      return res.json({"status" : false, "data" : "Some error occured"});
    }
  })
  .catch((error) => {
    return res.json({"status" : false, "data" : error});
  });
}

const odotApproval = (req,res) => {
  const approverId = req.sapid;
  const odplant = req.query.odplant;
  const action = req.query.action;

  console.log("---------IN Od ot approval ----------------")
  console.log("approver id :: " , approverId)
  console.log("odplant with slash :: " , odplant)
  console.log("action to perform :: " , action)

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL_QUALITY}/od_approve_reject_hod.htm?sapid=${approverId}&odno=${odplant}&action=${action}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(response)
    if(response.status != 200){
      return res.json({"status" : false, "message" : "Some error occured while hitting sap api"});
    }else{
      const data = response.data.at(0);
      // console.log("Printng sap api response for od approval :: ", data, " Printing type :: ", typeof data);
      return res.send(data);
    }
  })
  .catch((error) => {
    console.log("Printing error :: ", error)
    return res.json({"status" : false, "message" : error});
  });
}

module.exports = {createOdOt, ododListing, odotApproval}