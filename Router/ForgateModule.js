
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


router.post("/auth/forgate", async (req, res) => {
    const { email} = req.body;
    console.log('LocalStorage exist ',LocalStorage)
  
    const user_exist = await Users.findOne({ email: email });
    console.log('user exist ',user_exist.first_name)
  
    if (user_exist) {
         if(user_exist.mobile_no == undefined ||user_exist.mobile_no ==""){
            res.send({error:"Mobile no Not avilable"})
         }
         else{
            client.verify.v2.services('VAb2e03de2995c16c03950fb26e6aa1c96')
            .verifications
            .create({to: user_exist.mobile_no, channel: 'sms'})
            .then(verification =>  res.send({ message:verification}));
         }
       
    } else {
        // given error for the not valid email
        if(email == undefined || email ==""){
            res.send({error:'Email Required'})
        }
        else{
            res.send({ error:"Email Not Registered"})
        }
    }

    });

 module.exports=router
