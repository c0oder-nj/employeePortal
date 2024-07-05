const express = require('express')
const cors = require('cors')
const sql = require('mssql')
const cookieParser = require('cookie-parser')

const router = require('./routes');
const home = require('./Controllers/home')

const app = express();

// const corsOptions = {
//     origin: "http://localhost:3001/",
//     methods: "GET, POST, PUT, DELETE, HEAD",
//     credentials: true
// }

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Whitelist the domains you want to allow
    methods: "GET, POST, PUT, DELETE, HEAD"
};

app.use(cors(corsOptions));
app.use(cookieParser());



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

app.use(express.json());
// basically it is our middleware which we use to pass the json data received as post or get request.

app.use('/api/auth',router);
// app.get('/',router)

app.use(express.urlencoded({extended: true}));

app.get('/',(req,res)=>{
    res.cookie("name","test")
    res.status(200).send("Server is running ");
})


app.get('/get_cookie',(req,res)=>{
    console.log(req.cookies);
    res.status(200).send("Cookie printed to console")
})



const port = process.env.port || 3000 ;


app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);
})