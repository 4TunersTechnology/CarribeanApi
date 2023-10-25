const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules')
const LocalStorage = require('../LocalStorage')
const client = require('twilio')(accountSid, authToken);

router.post('/auth/send_otp',async (req,res)=>{
  const {lat,long} = req.body
  if(lat == ""){
    res.send({error:"Latituted Required"})
  }
  else if(long ==''){
    res.send({error:'Longituted Required'})
  }
  else{
   
  }
}
  )
module.exports = router