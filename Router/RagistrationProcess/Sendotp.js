const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules')

router.post('/send_otp',async (req,res)=>{
    await Users.findOneAndUpdate({user_id:req.body.user_id }, 
        { $set: { country_code:req.body.country_code,mobile_number: req.body.mobile_number  } }, { //options
          returnNewDocument: true,
          new: true,
          strict: false
        }
      )
    .then((value) => {
      if(value == null){
        res.send({message:'User Not Found'})
      }
      else{
        res.send({message:value})
      }
    })
    .catch((err) => console.log(err))
  }
  )
module.exports = router