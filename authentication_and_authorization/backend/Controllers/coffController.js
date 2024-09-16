const axios = require('axios');

const cOffListing = (req,res) => {
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

module.exports = {cOffListing, cOffApproval}