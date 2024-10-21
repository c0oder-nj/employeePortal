const axios = require('axios');



const empConfPPT = (req,res) => {
    // res.send("Api hit");
    const sapId = req.sapid;

    const data = [
        {
            "pernr" : sapId,
            "achievements" : req.body.achievements,
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
    url: `${process.env.BASE_URL_QUALITY}/empconfirmationppt.htm?data=${jsonStringData}`,
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



const confirmationListingToHOD = (req,res) => {

    const sapId = req.sapid;
    console.log("Your Sap id",sapId);
  //   return res.json({"status" : true, "data" : "Hello data"});
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL_QUALITY}/confirmation_emp_listing_hod.htm?sapid=${sapId}`,
      
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

  const confimExtendTerminateByHod = async(req,res)=>{
  
    const sapId = req.sapid;
    console.log("Your Sap id in HOD confirmation fnfnf ",sapId);
    console.log("Form Data",req.body);
    // return res.json({"status" : true, "data" : "Hello data form confirm extend delete"});
    //First ,For HOD Remark
    let data = [{"pernr":req.body.empSapNumer,"ename":req.body.empName,"kostl":req.body.kostl,"persk": req.body.persk, "hod_name": req.body.hodName, "hod_remark": req.body.hodRemark,"zaction": req.body.zaction,"hod_pernr":sapId}]
    data = JSON.stringify(data);
    console.log("Printing data after stringify",data);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL_QUALITY}/emp_confirmation_hodaction.htm?detail=${data}`,
      headers: { 
        'Cookie': 'sap-usercontext=sap-client=900'
      }
    };
    console.log(config.url);
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if(response.status == 200) {
        data = [ {
          "PERNR": req.body.empSapNumer,
          "EXPOSURE": req.body.i1,
          "EXECUTION_SKILLS": req.body.i11,
          "INTERPERSONAL_SKILLS": req.body.i12,
          "COMMUNICATION_SKILLS": req.body.i13,
          "FUNCTION_SKILLS": req.body.i14,
          "ADAPTIVE_BRIEF": req.body.i15,
          "DESIRABLE_RESULT": req.body.i16,
          "ADDITIONAL_COMMENTS": req.body.i17,
          "HOD_PERNR": sapId,
          "remark1": req.body.i3,
          "remark2": req.body.i4,
          "remark3": req.body.i5,
          "remark4": req.body.i6,
          "remark5": req.body.i7,
          "remark6": req.body.i8,
          "remark7": req.body.i9,
          "remark8": req.body.i10,
          "JOB_KNOWLEDGE": req.body.d1,
          "PLANNING": req.body.d2,
          "QUALITY": req.body.d3,
          "INITIATIVE_CREATIVITY": req.body.d4,
          "COST_CONSCIOUSNESS": req.body.d5,
          "COMMUNICATION": req.body.d6,
          "JUDGEMENT": req.body.d7,
          "ORGANISING_ABILITY": req.body.d8,
          "DEPENDABILITY": req.body.d9,
          "ABILITY": req.body.d10,
          "EMPLOYEE_RELATION": req.body.d11,
          "DELEGATION": req.body.d12,
          "TRAINING": req.body.d13,
          "LEADERSHIP": req.body.d14,
          "DISCIPLINE": req.body.d15,
          "HABITS": req.body.d16,
          "ASSESS1": req.body.i18,
          "ASSESS2": req.body.i19,
          "ASSESS3": req.body.i20
      }]
      data = JSON.stringify(data);
        config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${process.env.BASE_URL_QUALITY}/hod_confassessment.htm?data=${data}`,
          headers: { 
            'Cookie': 'sap-usercontext=sap-client=900'
          }
        };
        console.log(config.url);
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if(response.status == 200) {
            return res.status(200).json({"status" : true, "message" : "Data Save Successfully And Details Forwarded To HR Department"});
          }else{
            return res.status(400).json({"status" : false, "message" : "Some error occured in second api"});
          }
        })
        .catch((error) => {
          return res.status(400).json({"status" : false, "message" : error});
        });
      }else{
        return res.status(400).json({"status" : false, "message" : "Some error occured in first api"});
      }
    })
    .catch((error) => {
      return res.status(400).json({"status" : false, "message" : error});
    });
  
    //Second Fill the data of the form
    
  }

  const confirmationShowPptAndFormData = async(req,res)=>{
    const sapId = req.sapid;
    console.log("Your Sap id in HOD confirmation fnfnf ",sapId);
    console.log("Form Data",req.body);
    // return res.json({"status" : true, "data" : "Showing data of ppt form to HOD for particular employee"});
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL_QUALITY}/hodfinalapprovallisting.htm?sapid=${sapId}`,
      
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

  const assesmentDataShow= async(req,res)=>{
    const sapId = req.sapid;
    const action = req.query.action;
    const employeeSap = req.query.value;
    console.log("Your Sap id in HOD confirmation fnfnf ",sapId);
    console.log("Printing action ", action, " Printing sap of emp :: ", employeeSap);
    // console.log("Form Data",req.body);
    // // return res.json({"status" : true, "data" : "Showing data of ppt form to HOD for particular employee"});

    if(action == 'ppt'){ // get the ppt data of employee

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.BASE_URL_QUALITY}/emppptdatagetapi.htm?sapid=${employeeSap}`,
        headers: { 
          'Cookie': 'sap-appcontext=c2FwLXNlc3Npb25pZD1TSUQlM2FBTk9OJTNhU1BRVUFTUlZSMV9TNFFfMDAlM2FzNDduV0V5Nm9wa01mOEFaV095RzM4VkZVSjFnRmtSTVltU2hyMEdyLUFUVA%3d%3d; sap-usercontext=sap-client=900'
        }
      };
      
      axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        if(response.status == 200){
          return res.json({"status" : true, "data" : response.data});
        }else{
          return res.json({"status" : false, "data" : "Some error occured"});
        }
      })
      .catch((error) => {
        return res.json({"status" : false, "data" : error});
      });

    }else if(action == 'assessment'){ // get the assessment data of hod
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.BASE_URL_QUALITY}/hodassesmentformdatagetapi.htm?sapid=${employeeSap}`,
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


  }


  const confirmationShowPptAndFormDataHrlvl1 = async(req,res)=>{
    const sapId = req.sapid;
    console.log("Your Sap id in HOD confirmation fnfnf ",sapId);
    console.log("Form Data",req.body);
    // return res.json({"status" : true, "data" : "Showing data of ppt form to HOD for particular employee"});
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL_QUALITY}/confirmationhrdatalisting.htm`,
      
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


  const sendApprovalToHrFromHOD = async(req,res)=>{
    const sapId = req.sapid;
    console.log("Your Sap id in HOD confirmation fnfnf ",sapId);
    console.log("Form Data",req.body);
    // return res.json({"status" : true, "data" : "Hello data form final HOD approval"});
    
    
    console.log("Printing data after stringify",req.body);
    let hod_remark = req.body.remarkText;
    hod_remark = encodeURIComponent(hod_remark)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL_QUALITY}/hodfinalapprovalapi.htm?hod_remark=${hod_remark}&empSapId=${req.body.employeeSapNumber}`,
      headers: { 
        'Cookie': 'sap-usercontext=sap-client=900'
      }
    };
    console.log(config.url);
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if(response.status == 200) {
        return res.status(200).json({"status" : true, "message" : "Employee has been confirmed from your side and sent to HR for final confirmation"});
      }else{
        return res.status(400).json({"status" : false, "message" : "Some error occured in first api"});
      }
    })
    .catch((error) => {
      return res.status(400).json({"status" : false, "message" : error});
    }); 
  }
  
  const hrlvl1Controller = async(req,res)=>{
    const sapId = req.sapid;
    console.log("Your Sap id in HOD confirmation fnfnf ",sapId);
    console.log("Form Data",req.body);
    // return res.json({"status" : true, "data" : "Hello data form final HOD approval"});
    console.log("Printing data after stringify",req.body);
    let hod_remark = req.body.remarkText;
    hod_remark = encodeURIComponent(hod_remark)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      // url: `${process.env.BASE_URL_QUALITY}/hodfinalapprovalapi.htm?hod_remark=${hod_remark}&empSapId=${req.body.employeeSapNumber}`,
      url :`${process.env.BASE_URL_QUALITY}/empconfirmationhrapproval.htm?hr_sapid=${sapId}&emp_sapid=${req.body.employeeSapNumber}&hr_remark=${hod_remark}`,
      headers: { 
        'Cookie': 'sap-usercontext=sap-client=900'
      }
    };
    console.log(config.url);
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if(response.status == 200) {
        return res.status(200).json({"status" : true, "message" : "Employee has been confirmed from your side and sent to Head HR for final confirmation"});
      }else{
        return res.status(400).json({"status" : false, "message" : "Some error occured in first api"});
      }
    })
    .catch((error) => {
      return res.status(400).json({"status" : false, "message" : error});
    });
  }



module.exports = {hrlvl1Controller,sendApprovalToHrFromHOD,confirmationShowPptAndFormDataHrlvl1,empConfPPT,confirmationListingToHOD,confimExtendTerminateByHod,confirmationShowPptAndFormData,assesmentDataShow};
