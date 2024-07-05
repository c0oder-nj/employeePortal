const express = require('express')
const cors = require('cors')
const sql = require('mssql')

const router = require('./routes');
const home = require('./Controllers/home')

const app = express();

const corsOptions = {
    origin: "http://localhost:3001/",
    methods: "GET, POST, PUT, DELETE, HEAD",
    credentials: true
}

app.use(cors(corsOptions));



// sql server configuration\
var config = {
    "user": "sa", // Database username
    "password": "shakti@123", // Database password
    "server": "13.202.132.54", // Server IP address
    "database": "ShaktiAppsStore", // Database name
    "options": {
        "encrypt": false // Disable encryption
    }
}


sql.connect(config,(err)=>{
    if(err){
        throw err;
    }
    console.log("Connection successful");
})

app.use('/api/auth',router);
// app.get('/',router)



const port = process.env.port || 3000 ;


app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);
})