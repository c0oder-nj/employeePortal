const cookie = require('cookie-parser')


const home = async(req,res) => {
    // res.status(200).send("Data for showing at router part");
    // setting cookie
    
}

/*
// Authentication and authorization
i) Setting cookies
ii) bcrypt for password authentication and authorization.
iii) implementation of jwt
























*/


const login = async(req,res) => {
    try {
        res.status(200).json({message: req.body})
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}


module.exports = {home, login};