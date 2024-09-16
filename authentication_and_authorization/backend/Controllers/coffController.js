const axios = require('axios')

const cOffListing = (req,res) => {

  const sapId = req.sapid;
  console.log("Your Sap id",sapId);
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL_QUALITY}/zattendanc_c_off.htm?sap_code=${sapId}`,
    
    headers: { 
      'Cookie': 'sap-usercontext=sap-client=900'
    }
  };
  console.log(config.url);
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

const cOffApplication = (req,res)=>{
  console.log("You are in c-off creation");
  const sapId = req.sapid;
  console.log("Your Sap id",sapId);
  const data = req.body;
  console.log(typeof data);
  // return res.json({"status" : false, "data" : "Some error occured"});
  
  let dataToBeSent = []
  
  if(req.body=={}){
    return res.json({"status" : false, "data" : "Data is missing"});
  }
  
  dataToBeSent.push({
    "coff_date":data.coffDate,
    "apply_date":data.appliedDate,
    "pernr":sapId,
    "indz": "10:00:00",
    "iodz": "06:00:00",
    "totdz": "08:00:00",
    "pernr2":data.responsiblePersonSap,
    "test_reason":data.reason,
    "LEAVETYPE":data.leaveType
  })
  dataToBeSent = JSON.stringify(dataToBeSent);
  console.log(dataToBeSent);
  // return res.json({"status" : false, "data" : "Data is missing"});
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL_QUALITY}/c_off_save.htm?post=${dataToBeSent}`,
    
    headers: { 
      'Cookie': 'sap-usercontext=sap-client=900'
    }
  };
  console.log(config.url);
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

module.exports = {cOffListing,cOffApplication}
