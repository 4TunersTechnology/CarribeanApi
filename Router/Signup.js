const express =require('express');
const router =express.Router()
const Users = require('../SignupModule/Signupmodules')
const bcrypt = require('bcrypt');
  var user_id ;


router.post("/auth/signup", async (req, res) => {
    const { email, password, first_name,last_name ,dob,confirm_password } = req.body;
    Users.find().count(async function(err, count){
      console.log("Number of docs: ", count );
      user_id = count;


      const encrypt_password = await bcrypt.hash(password, 10);
    console.log('user id ',user_id)
    const userDetail = {
      email: email,
      password: encrypt_password,
      first_name:first_name,
      last_name:last_name,
      dob:dob,
      user_id:count+1,
      user_type:""
    };
  
    const user_exist = await Users.findOne({ email: email });
    
  
    if (user_exist) {
        
        
      res.send({ message: "The Email is already in use !" });
    } else {
        if(first_name == undefined || first_name ==""){
            res.send({message:'First name Required'})
        }
        else if(last_name == undefined || last_name ==""){
          res.send({message:'Last name Required'})
      }
        else if(email == undefined || email ==""){
            res.send({message:'Email invalide'})
        }

        else if(dob == undefined || dob ==""){
          res.send({message:'Date of birth Required'})
      }
        else if(password == undefined || password ==""){
            res.send({message:'password Required'})
        }
        else if(confirm_password == undefined || confirm_password ==""){
          res.send({message:'confirm password Required'})
      }
        else{
        Users.create(userDetail, (err, result) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          res.send({ message: "User Created Succesfully" });
        }
      });
    }
    }

    });
     
  });

 module.exports=router
