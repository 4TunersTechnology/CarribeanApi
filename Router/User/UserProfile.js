const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules')
const multer  = require('multer')
const path = require('path')



router.get('/user_profile/:id',async (req,res)=>{
    console.log('dataaa show ',req.params.id)
   await Users.findOne({user_id:req.params.id})
        .then((value) => {
          if(value == null){
            res.send({message:"User not found"})
          }
          else{
            res.send(value)
          }
        })
        .catch((err) => console.log(err))
    // const {country,identity_type,card_image} = req.body
    // if(country == undefined || country ==""){
    //     res.send({message:'country Required'})
    // }
    // else if(identity_type == undefined || identity_type ==""){
    //     res.send({message:'Identity Required'})
    // }
    // else if(card_image == undefined || card_image ==""){
    //     res.send({message:'Identity Image Required'})
    // }
    // else{
        
    //     await Users.findOneAndUpdate({user_id:req.body.user_id }, 
    //         { $set: { country:req.body.country,identity_type: req.body.identity_type,card_image:req?.file?.path } }, { //options
    //           returnNewDocument: true,
    //           new: true,
    //           strict: false
    //         }
    //       )
    //     .then((value) => {
    //       if(value == null){
    //         res.send({message:'User Not Found'})
    //       }
    //       else{
    //         res.send({message:value})
    //       }
    //     })
    //     .catch((err) => console.log(err))
    // }
    
  }
  )
module.exports = router