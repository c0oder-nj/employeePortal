const sql = require("mssql");


// SQL Server configuration
var config = {
    "user": "sa", // Database username
    "password": "shakti@123", // Database password
    "server": "13.202.132.54", // Server IP address
    "database": "ShaktiAppsStore", // Database name
    "options": {
        "encrypt": false // Disable encryption
    }
}



const pool = new sql.ConnectionPool(config);

// module.exports = pool;

// // Connect to SQL Server
// sql.connect(config,(err)=>{
//     if(err){
//         throw err;  
//     }
//     console.log("Db connceted successfully");
// })

module.exports = pool
