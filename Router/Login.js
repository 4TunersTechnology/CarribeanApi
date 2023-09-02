const express =require('express');
const router =express.Router()
const Users = require('../SignupModule/Signupmodules')

router.post('/auth/login',async (req,res)=>{
    const {email,password} = req.body
    console.log('email ',email, password)
    const userDetail = await Users.findOne({ email: email });
    if (userDetail) {
      if (password == userDetail.password) {
        res.send(userDetail);
      } else {
        res.send({ error: "invaild Password" });
      }
    } else {
      res.send({ error: "user is not exist" });
    }
   
  }
  )
module.exports = router