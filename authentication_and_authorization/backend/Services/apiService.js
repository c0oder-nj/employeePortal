const { default: axios } = require("axios")
const dotenv = require('dotenv');
dotenv.config();

/*
{




}

*/


const creatUri = (uriEndpoint, queryObject) => {
    const baseUrl = process.env.BASE_URL;
    const fullUrl = baseUrl + uriEndpoint;
    for(const [key,value] of Object.entries(queryObject)){
        fullUrl += '?' + key + '=' + value;
    }

}



const apiUsingFtech = async(uri, queryObject, type) => {

    const apiResponse = await axios.get()
}


module.exports = {apiUsingFtech}