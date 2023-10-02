
const express =require('express');
const router =express.Router()
const Users = require('../SignupModule/Signupmodules')
const bcrypt = require('bcrypt');
const LocalStorage = require('./LocalStorage')
const accountSid = LocalStorage.TWILIO_ACCOUNT_SID;
const authToken = LocalStorage.TWILIO_AUTH_TOKEN;
const PhoneNO = LocalStorage.TWILIO_PHONE_NO;
const client = require('twilio')(accountSid, authToken);
  var user_id ;


router.post("/auth/verification", async (req, res) => {
    const { mobile_no,otp} = req.body;
    if(mobile_no == undefined || mobile_no ==""){
        res.send({error:"Mobile No Required"})
    }
    else if(otp == undefined || otp ==""){
        res.send({error:"OTP Required"})
    }
    else{
    client.verify.v2.services('VAb2e03de2995c16c03950fb26e6aa1c96')
    .verificationChecks
    .create({to: mobile_no, code: otp})
    .then(verification_check => res.send({ message:verification_check}))
    .catch(error=>console.log('error ',error))
    }
    });

 module.exports=router
