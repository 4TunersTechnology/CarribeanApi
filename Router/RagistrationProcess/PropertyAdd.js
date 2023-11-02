const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules')
const multer  = require('multer')
const path = require('path')



const PropertyImages = multer({
  storage : multer.diskStorage({
    destination: (req, file, cb) => cb(null,"public/Images"), // cb -> callback
    filename: (req, file, cb) => {
      // const uniqueName = `${Date.now()}-${Math.round(
      //   Math.random() * 1e9
      // )}${path.extname(file.originalname)}`;
      // cb(null, uniqueName);
      cb(null, file.fieldname + "_"+ Date.now() + path.extname(file.originalname))
    },
  })
 })
 
//  ;
//  .array('property_images',10)

 function uniqid(){
  return (new Date()).getTime()+Math.random().toString(16).slice(2);
}


router.post('/property_add',PropertyImages.fields(
  [
      {
          name:'property_images',
          maxCount:10
      },
      {
          name: 'rafting_certifcate', maxCount:5
      },
      {
          name: 'exotic_food_certifcate', maxCount:5
      }
  ]
),async (req,res)=>{
    const {user_id,email,property_name,select_view,property_type,price_per_night,guest_count,bedroom_count,
      bathroom_count,property_description,property_rules,country,state,city,street_address,
      property_images,amenties,extra_service,rafting_number_of_guest,rafting_price,rafting_description,rafting_certifcate,
      exotic_food_number_of_guest,exotic_food_price,exotic_food_description,exotic_food_certifcate} = req.body
    console.log('checkkkkkk ',req?.files?.property_images)
    if(property_name == undefined || property_name ==""){ 
        res.send({error:'property name Required'})
    }
    else if(select_view == undefined || select_view ==""){
        res.send({error:'Area Required'})
    }
    else if(property_type == undefined || property_type ==""){
        res.send({error:'property type Required'})
    }
    else if(price_per_night == undefined || price_per_night ==""){
      res.send({error:'price per night Required'})
    }
    else if(guest_count == undefined || guest_count ==""){
      res.send({error:'number of guest Required'})
    }
    else if(bedroom_count == undefined || bedroom_count ==""){
      res.send({error:'number of bedroom Required'})
    }
    else if(bathroom_count == undefined || bathroom_count ==""){
      res.send({error:'number of bathroom Required'})
    }
    else if(property_description == undefined || property_description ==""){
      res.send({error:'property description Required'})
    }
    else if(property_rules == undefined || property_rules ==""){
      res.send({error:'property rules Required'})
    }
    else if(country == undefined || country ==""){
      res.send({error:'country Required'})
    }
    else if(state == undefined || state ==""){
      res.send({error:'state Required'})
    }
    else if(city == undefined || city ==""){
      res.send({error:'city Required'})
    }
    else if(street_address == undefined || street_address ==""){
      res.send({error:'street address Required'})
    }
    // for the property images
    else if(req?.files?.property_images == undefined || req?.files?.property_images.length == 0){
      res.send({error:'property images Required'})
    }
    else if(amenties == undefined || amenties ==""){
      res.send({error:'Amenties Required'})
    }
    else if(extra_service == undefined || extra_service ==""){
      res.send({error:'extra services Required'})
    }
    else if(rafting_number_of_guest == undefined || rafting_number_of_guest ==""){
      res.send({error:'rafting number of guest Required'})
    }
    else if(rafting_price == undefined || rafting_price ==""){
      res.send({error:'rafting price Required'})
    }
    else if(rafting_description == undefined || rafting_description ==""){
      res.send({error:'rafting description Required'})
    }
    // for the Rafting certificate
    else if(req?.files?.rafting_certifcate == undefined || req?.files?.rafting_certifcate ==""){
      res.send({error:'rafting certificate Required'})
    }
    else if(exotic_food_number_of_guest == undefined || exotic_food_number_of_guest ==""){
      res.send({error:'exotic food number of guest Required'})
    }
    else if(exotic_food_price == undefined || exotic_food_price ==""){
      res.send({error:'exotic food price Required'})
    }
    else if(exotic_food_description == undefined || exotic_food_description ==""){
      res.send({error:'exotic food description Required'})
    }
    else if(req?.files?.exotic_food_certifcate == undefined || req?.files?.exotic_food_certifcate ==""){
      res.send({error:'exotic food certificate Required'})
    }
    else{
      let data = await Users.find({user_id:user_id})
      console.log("checkkkkkkk ",data)
      if(data.length == 0){
        res.send({'error':'user not defind'})
      }
      else{

      
      let property_data = JSON.stringify(data[0])
        
      let propertyArray = []
      if(JSON.parse(property_data)?.property_list == undefined){
        propertyArray.push({user_id:req.body.user_id,email:email,property_id:uniqid(),property_name:property_name,select_view:select_view,property_type:property_type,price_per_night:price_per_night,guest_count:guest_count,bedroom_count:bedroom_count,bathroom_count:bathroom_count,property_description:property_description,property_rules:property_rules,country:country,state:state,city:city,street_address:street_address,property_images:req?.files?.property_images,amenties:amenties,extra_service:extra_service,rafting_number_of_guest:rafting_number_of_guest,rafting_price:rafting_price,rafting_description:rafting_description,rafting_certifcate:req?.files?.rafting_certifcate,exotic_food_number_of_guest:exotic_food_number_of_guest,exotic_food_price:exotic_food_price,exotic_food_description:exotic_food_description,exotic_food_certifcate:req?.files?.exotic_food_certifcate })
      }
      else{
        propertyArray = JSON.parse(property_data)?.property_list
        propertyArray.push({user_id:req.body.user_id,email:email,property_id:uniqid(),property_name:property_name,select_view:select_view,property_type:property_type,price_per_night:price_per_night,guest_count:guest_count,bedroom_count:bedroom_count,bathroom_count:bathroom_count,property_description:property_description,property_rules:property_rules,country:country,state:state,city:city,street_address:street_address,property_images:req?.files?.property_images,amenties:amenties,extra_service:extra_service,rafting_number_of_guest:rafting_number_of_guest,rafting_price:rafting_price,rafting_description:rafting_description,rafting_certifcate:req?.files?.rafting_certifcate,exotic_food_number_of_guest:exotic_food_number_of_guest,exotic_food_price:exotic_food_price,exotic_food_description:exotic_food_description,exotic_food_certifcate:req?.files?.exotic_food_certifcate })
      }
        await Users.findOneAndUpdate({user_id:req.body.user_id }, 
            { $set:{property_list: [...propertyArray] }}, { //options
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
            res.send({message:value})
          }
        })
        .catch((err) => console.log(err))
    }
  }
    
  }
  )
module.exports = router