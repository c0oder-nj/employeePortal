const axios = require('axios');

const cOffListingHod = (req,res) => {
    const sapId = req.sapid;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.BASE_URL}/coff_approval_pending.htm?app_pernr=${sapId}`,
        headers: { 
          'Cookie': 'sap-usercontext=sap-client=900'
        }
      };
      
      axios.request(config)
      .then((response) => {
        if(response.status == 200){
            return res.send(response.data);
        }
      })
      .catch((error) => {
        return res.send(error);
      });

}

const getSapDate = (dateString) => {
  const [date, month, year] = dateString.split('.')
  return (year + month + date);
}

const cOffApproval = (req,res) => {
  const approveBy = req.sapid;
  const approveRejStatus = req.body.status;
  const applier = req.body.applier;
  const coffDate = req.body.coffDate;
  const applyDate = req.body.applyDate;


  // change coff Date and apply date to desired format according to sap
  let newCoffDate = getSapDate(coffDate);
  let newApplyDate = getSapDate(applyDate);

  const appObject = {
    "app" : approveRejStatus,
    "app_by" : approveBy,
    "coff_date" : newCoffDate,
    "apply_date" : newApplyDate,
    "pernr" : applier,
  }

  const jsonObj = [appObject];
  const apiParam = JSON.stringify(jsonObj);
  console.log("Printing api parameter :: ", apiParam)

  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL}/coff_hod_app_reject.htm?app=${apiParam}`,
    headers: { 
      'Cookie': 'sap-usercontext=sap-client=900'
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    return res.send(response.data);
  })
  .catch((error) => {
    console.log(error);
    return res.send(error);
  });
  
}




// coff listing for employee and create process
const cOffListing = (req,res) => {

  const sapId = req.sapid;
  console.log("Your Sap id",sapId);
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL}/zattendanc_c_off.htm?sap_code=${sapId}`,
    
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
    "reason":data.reason,
    "LEAVETYPE":data.leaveType
  })
  dataToBeSent = JSON.stringify(dataToBeSent);
  console.log(dataToBeSent);
  // return res.json({"status" : false, "data" : "Data is missing"});
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL}/c_off_save.htm?post=${dataToBeSent}`,
    
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

module.exports = {cOffListingHod, cOffApproval ,cOffListing, cOffApplication }
