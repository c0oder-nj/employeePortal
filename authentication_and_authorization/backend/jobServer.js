const express = require('express');
const env = require('dotenv');
const cors = require('cors')
const routes = require('./Routes/index')
const jobController = require('./Controllers/jobController')


env.config();


const jobServer = express();
const port = process.env.JobServerPort || 3002


const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5000','http://localhost:3000', 'http://localhost:3001'], // Whitelist the domains you want to allow
    methods: "GET, POST, PUT, DELETE, HEAD"
};
jobServer.use('/api',routes);

jobServer.use(cors(corsOptions));



jobServer.use(express.json());
jobServer.use(express.urlencoded({extended: true}));
jobServer.get('/test',(req,res)=>{
    res.send("api hitted");
})
jobServer.get('/',(req,res)=>{
    res.send("port 3002 server is running");
})


jobServer.get('/daily-attendance',jobController.fetchDailyAttendace);
jobServer.get('/emp-todays-punch', jobController.getEmpPunchData);



jobServer.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);
})