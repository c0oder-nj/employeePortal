
const axios = require('axios');
//POST Method
const login = async (req,res) => {
    // login validation logic
    
    // console.log(req.body);
    const userId = req.body.userid;
    const password = req.body.password;

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASEURL}login_api.htm?userid=${userId}&pass=${password}`,
    headers: { }
    };

    axios.request(config)
    .then((response) => {
        res.send(response.data);
    })
    .catch((error) => {
    console.log(error);
    });
}

const forgetPass = async (req,res) => {
     
    // console.log(req.body);
    const userId = req.body.userid;
    const mobile = req.body.mobile;

    console.log(mobile , "::" , userId);

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASEURL}forgot_pass.htm?pernr=${userId}&mobno=${mobile}`,
    headers: { }
    };

    axios.request(config)
    .then((response) => {
        res.send(response.data);
    })
    .catch((error) => {
    console.log(error);
    });
}

//GET Method
const dashboard = async (req,res) =>{

    const userId = req.query.userid;

    console.log("Printing user id ");
    console.log(userId);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}dashboard.htm?kunnr=${userId}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const profileData = async (req,res) =>{

    const userId = req.query.userid;

    console.log("Printing user id ");
    console.log(userId);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}profile_detail.htm?pernr=${userId}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const replacmentReport =async (req,res) =>{

    const userId = req.query.userid;

    console.log("Printing user id ");
    console.log(userId);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}prodcut_replacment_report.htm?pernr=${userId}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const billReport =async (req,res) =>{

    const userId = req.query.userid;

    console.log("Printing user id ");
    console.log(userId);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}bill_report.htm?pernr=${userId}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const billPrint =async (req,res) =>{

    const userId = req.query.userid;
    const billno = req.query.billno;

    console.log("Printing user id ");
    console.log(userId);
    console.log(billno);


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}bill_print.htm?pernr=${userId}&billno=${billno}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}


const complainReport =async (req,res) =>{

    const userId = req.query.userid;

    console.log("Printing user id ");
    console.log(userId);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}complain_report.htm?pernr=${userId}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const companyList =async (req,res) =>{

    const userId = req.query.userid;

    console.log("Printing user id ");
    console.log(userId);


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}company_code_list.htm?pernr=${userId}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const accountStatment =async (req,res) =>{

    const userId = req.query.userid;
    const year = req.query.year;
    const companycode = req.query.companycode;

    console.log("Printing user id ");
    console.log(userId);


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}account_statment.htm?pernr=${userId}&year=${year}&companycode=${companycode}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const materialStock  =async (req,res) =>{

    const userId = req.query.userid;

    console.log("Printing user id ");
    console.log(userId);


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}material_stock.htm?pernr=${userId}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const complainList =async (req,res) =>{

    const userId = req.query.userid;

    console.log("Printing user id ");
    console.log(userId);


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}complain_list.htm?pernr=${userId}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const productList =async (req,res) =>{

    const userId = req.query.userid;

    console.log("Printing user id ");
    console.log(userId);


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}product_list.htm?pernr=${userId}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const billList =async (req,res) =>{

    const userId = req.query.userid;

    console.log("Printing user id ");
    console.log(userId);


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}biling_list.htm?userid=${userId}`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const createBill = async (req,res) => {
    // login validation logic
    
    // console.log(req.body);
    const userId = req.body.userid;
    const name = req.body.cname;
    const aadhar = req.body.aadhar;
    const mobile = req.body.mobile;
    const address = req.body.address;
    const totalGST = req.body.tax;
    const discount = req.body.discount;
    const total = req.body.total;
    const createbill = req.body.createbill;

    console.log("createbill :: " , createbill);

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_BASEURL}create_bill.htm?kunnr=${userId}&cname=${name}&aadhar=${aadhar}&mobile=${mobile}&address=${address}&tax=${totalGST}&discount=${discount}&total=${total}&createbill=${createbill}`,
    headers: { }
    };

    axios.request(config)
    .then((response) => {
        res.send(response.data);
    })
    .catch((error) => {
    console.log(error);
    });
}


const submitReplaceProduct = async (req,res) => {
    console.log("Hiii ", );

    const sernrValue = req.body.srno;
    const userId = req.body.kunnr;
    const replacementSerialNo = req.body.rsrno;
    const remark = req.body.remark;
    const vbelnValue = req.body.vbeln;
    const posnrValue = req.body.posnr;
    const descValue = req.body.desc;

    console.log("Request ", req.body.descValue);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}submit_replaced_product.htm?replace=[{"srno":"${sernrValue}","kunnr":"${userId}","rsrno":"${replacementSerialNo}","remark":"${remark}","vbeln":"${vbelnValue}","posnr":"${posnrValue}","desc":"${descValue}"}]`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}

const submitComplian = async (req,res) => {

    const payload = {
        sernr: req.body.sernr,
        kunnr: req.body.kunnr, // Example hardcoded value, replace with actual data if needed
        remark: req.body.remark,
        mobile: req.body.mobile,
        aadhar: req.body.aadhar,
      };
  

    console.log("Request ", req.body.descValue);

    console.log("DATA : " ,payload);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BASEURL}submit_complain.htm?complain=[${JSON.stringify(
          payload
        )}]`,
        headers: { }
        };
    
        axios.request(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
}


const summaryReport = async (req,res) => {

    console.log(req.body);
      const userId = req.body.userid;
      const sdate = req.body.sdate;
      const edate = req.body.edate;
  
  
      console.log("Request ", req.body);
  
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url : `${process.env.REACT_APP_BASEURL}summary_report.htm?kunnr=${userId}&datefr=${sdate}&dateto=${edate}`,
          headers: { }
          };
      
          axios.request(config)
          .then((response) => {
              res.send(response.data);
          })
          .catch((error) => {
          console.log(error);
          });
  }
  const detailReport = async (req,res) => {
  
      console.log(req.body);
        const userId = req.body.userid;
        const sdate = req.body.sdate;
        const edate = req.body.edate;
    
    
        console.log("Request ", req.body);
    
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url : `${process.env.REACT_APP_BASEURL}materiladetail.htm?kunnr=${userId}&datefr=${sdate}&dateto=${edate}`,
            headers: { }
            };
        
            axios.request(config)
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
    }


module.exports = {login,dashboard,profileData,replacmentReport,billReport,billPrint,complainReport,companyList,accountStatment,materialStock
    ,complainList,productList,billList,createBill,submitReplaceProduct,submitComplian, forgetPass, detailReport, summaryReport
}