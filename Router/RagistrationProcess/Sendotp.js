const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules')
const LocalStorage = require('../LocalStorage')
const accountSid = LocalStorage.TWILIO_ACCOUNT_SID;
const authToken = LocalStorage.TWILIO_AUTH_TOKEN;
const PhoneNO = LocalStorage.TWILIO_PHONE_NO;
const client = require('twilio')(accountSid, authToken);

router.post('auth/send_otp',async (req,res)=>{
  const {user_id,mobile_no} = req.body
  if(mobile_no == ""){
    res.send({error:"mobile no required"})
  }
  else{
   
    await Users.findOneAndUpdate({user_id:req.body.user_id }, 
        { $set: { mobile_no:mobile_no } }, { //options
          returnNewDocument: true,
          new: true,
          strict: false
        }
      )
    .then((value) => {
      if(value == null){
        res.send({error:'User Not Found'})
      }
      else{
        // res.send({message:value})
        client.verify.v2.services('VAb2e03de2995c16c03950fb26e6aa1c96')
        .verifications
        .create({to: mobile_no, channel: 'sms'})
        .then(verification =>  res.send({ message:value}));
      }
    })
    .catch((err) => console.log(err))
  }
}
  )
module.exports = router