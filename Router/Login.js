const express =require('express');
const router =express.Router()
const Users = require('../SignupModule/Signupmodules')
const bcrypt = require('bcrypt');
router.post('/auth/login',async (req,res)=>{
    const {email,password} = req.body
    console.log('email ',email, password)
    const userDetail = await Users.findOne({ email: email });
    const password_compare = await bcrypt.compare(password,userDetail.password)
    console.log('checkkk password ',password_compare)
    if (userDetail) {
      if (password_compare) {
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