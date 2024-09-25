const axios = require('axios');



const empConfPPT = (req,res) => {
    // res.send("Api hit");
    const sapId = req.sapid;

    const data = [
        {
            "pernr" : sapId,
            "achievements" : req.body.achievement_intiativeTaken,
            "contribution" : req.body.contribution,
            "key_learning" : req.body.key_learning,
            "kras" : req.body.kras,
            "projects_plans" : req.body.projectPlans,
            "suggestions" : req.body.suggestions
        }
    ]


    const jsonStringData = JSON.stringify(data);
    

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://spprdsrvr1.shaktipumps.com:8423/sap/bc/bsp/sap/zhr_portal_new/empconfirmationppt.htm?data=${jsonStringData}`,
    headers: { 
        'Cookie': 'sap-usercontext=sap-client=900'
    }
    };

    console.log("SAP End url :: ", config.url);

    axios.request(config)
    .then((response) => {
        console.log(response.data);
    if(response.status == 200){
        return res.send(response.data);
    }
    })
    .catch((error) => {
    console.log(error);
    });

}

module.exports = {empConfPPT};