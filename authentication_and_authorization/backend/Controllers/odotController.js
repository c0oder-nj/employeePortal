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
      url: `${process.env.BASE_URL}/od_create.htm?app_pernr=${sapId}&atnds_status=${formData.attendanceType}&app_od_from=${formData.dateFrom}&app_od_to=${formData.dateTo}&app_od_visitplace=${formData.placeToVisit}&app_od_workplace=${formData.odWorkPlace}&app_od_purpose1=${formData.purpose}&app_od_charge=${formData.handOverCharges}&Frm_tim=${formData.timeFrom}`,
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


const ododListing = (req,res) => {

  const sapId = req.sapid;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL}/od_data_hod.htm?sapid=${sapId}`,
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


const odotListingEmp = (req,res) => {

  console.log("You are in odot listing emp");
  const sapId = req.sapid;
  console.log(sapId);
  // res.json({'status' : true, 'Message' : 'Something'});
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL}/od_data_emp.htm?sapid=${sapId}`,
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
    url: `${process.env.BASE_URL}/od_approve_reject_hod.htm?sapid=${approverId}&odno=${odplant}&action=${action}`,
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

module.exports = {createOdOt, ododListing, odotApproval,odotListingEmp}
