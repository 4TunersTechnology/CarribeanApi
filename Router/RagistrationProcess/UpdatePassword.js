
const express = require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules')
const bcrypt = require('bcrypt');

router.post("/auth/change_password", async (req, res) => {
    const { user_id,new_password,confirm_password} = req.body;
    if(new_password == confirm_password){

        const encrypt_password = await bcrypt.hash(password, 10);
        await Users.findOneAndUpdate({user_id:user_id }, 
            { $set: { password:encrypt_password } }, { //options
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
            res.send({ message:"password update Sucessfully"})
          }
        })
        .catch((err) => console.log(err))
    }
    else{
        res.send({error:"not match new password confirm password"})
    }
     

    });

 module.exports=router
