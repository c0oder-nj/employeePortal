const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const env = require('dotenv')
const authControllers = require('./Controllers/authControllers')



env.config();
const app = express();



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5000','http://localhost:3000', 'http://localhost:3001'], // Whitelist the domains you want to allow
    methods: "GET, POST, PUT, DELETE, HEAD"
};
app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    // res.cookie("name","test")
    res.status(200).send("Server is running ");
})

app.post('/TestAPI',express.raw({ type: '*/*' }),(req,res)=>{
    // res.cookie("name","test")
    console.log('ReQ:: ',req.body);
    res.status(200).send("Server is running ");
})


app.post('/api/auth/login', authControllers.login)


app.get('/get_cookie',(req,res)=>{
    console.log(req.cookies);
    res.status(200).send("Cookie printed to console")
})



// api endpoint for getting the sap data into our mssql database
app.get('/api/get_data',authControllers.getData);



const port = process.env.port || 3000;


app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);
})