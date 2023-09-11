const express =require('express');
const router =express.Router()
const Help = require('../../HelpsupportModule/SupportModule')
const multer  = require('multer')
const path = require('path')

const ImagesPath = multer({
    storage : multer.diskStorage({
      destination: (req, file, cb) => cb(null,"uploads"), // cb -> callback
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    })
   }).single('national_id')

router.post('/help/support',ImagesPath,async (req,res)=>{
    const {service_provider,name,email,message,user_id} = req.body

    const userDetail = {
        service_provider:service_provider,
        name: name,
        message:message,
    email: email,
    user_id:user_id,
    national_id:req?.file?.path
      };

    if(service_provider == undefined || service_provider ==""){
        res.send({message:'Service Provider Required'})
    }
    else if(name == undefined || name ==""){
        res.send({message:'Name Required'})
    }
    else if(email == undefined || email ==""){
        res.send({message:'Email Required'})
    }
    else if(message == undefined || message ==""){
        res.send({message:'Message Required'})
    }
    else if(req?.file?.path == undefined || req?.file?.path ==""){
        res.send({message:'National Id Card Required'})
    }
    else{
        Help.create(userDetail, (err, result) => {
            if (err) {
              res.status(500).send({ message: err.message });
            } else {
              res.send({ message: "your Request submit Succesfully" });
            }
          });
  }
 }
  )
module.exports = router