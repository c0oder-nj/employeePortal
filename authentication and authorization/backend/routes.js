// import express from 'express'; --> when you have type in json as module 
const express = require('express');
const router = express.Router();

const authControllers = require('./Controllers/authControllers')

// path for routers

// using controller -> controllers are the function which invokes when some endpoint hit and we map them here in our routes file


router.route('/').get(authControllers.home);


router.route('/test').get((req,res)=>{
    res.status(200).send("testin route home using router of express");
})


router.route('/login').post(authControllers.login);



module.exports = router;
