const { default: axios } = require("axios")
const dotenv = require('dotenv');
dotenv.config();

/*
{




}

*/


const creatUri = (uriEndpoint, queryObject, type) => {
    const baseUrl = process.env.BASE_URL;
    if(type == 'get'){
        const modifiedUrl = baseUrl + uriEndpoint + '?';
        var str = '';
        for(const [key,value] of Object.entries(queryObject)){
            if(str != ''){
                str += '&';
            }
            str = str + key + '=' + value;
        }
        return (modifiedUrl + str);
    }else{
        return "need to implement";
    }
    
}



// testing changes in common branch

const apiUsingFtech = async(uri, queryObject, type) => {
    const endPoint = creatUri(uri, queryObject, type)
    console.log("Came under api using fetch::");
    console.log("Printing api endpoint before get request ::: ", endPoint);

    const myPromise = new Promise((resolve, reject) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: endPoint,
            headers: { 
              'Cookie': 'sap-usercontext=sap-client=900'
            }
          };

          axios.request(config)
          .then((response) => {
            resolve(response.data)
          })
          .catch((error) => {
            reject(error);
          });
    })

    console.log(myPromise);
    return myPromise;
}


module.exports = {apiUsingFtech}