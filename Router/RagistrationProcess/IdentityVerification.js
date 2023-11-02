const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules')
const multer  = require('multer')
const path = require('path')

const fileUpload = multer({
    storage : multer.diskStorage({
   destination: (req, file, cb) => cb(null,"uploads"), // cb -> callback
   filename: (req, file, cb) => {
     const uniqueName = `${Date.now()}-${Math.round(
       Math.random() * 1e9
     )}${path.extname(file.originalname)}`;
     cb(null, uniqueName);
   },
 })
 }).single('card_image')

router.post('/identity_verification',fileUpload,async (req,res)=>{
    const {country,identity_type,card_image} = req.body
    console.log('card image ',req.file)
    if(country == undefined || country ==""){
        res.send({message:'country Required'})
    }
    else if(identity_type == undefined || identity_type ==""){
        res.send({message:'Identity Required'})
    }
    else if(req?.file?.path == undefined || req?.file?.path ==""){
        res.send({message:'Identity Image Required'})
    }
    else{
        await Users.findOneAndUpdate({user_id:req.body.user_id }, 
            { $set: { country:req.body.country,identity_type: req.body.identity_type,card_image:req?.file?.path } }, { //options
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
    
  }
  )
module.exports = router