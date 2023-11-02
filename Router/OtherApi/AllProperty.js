const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules');


router.get('/get_all_propertys',async (req,res)=>{
     const {property_id,entry_date,exit_date,extra_services,total_amount,tranjectionId,user_id} = req.body

    // if(user_id == undefined || user_id ==""){
    //   res.send({message:'user id Required'})
    //  }
    // else{
      // Users.findOne({user_id:user_id})
      // .then(resoponce =>console.log('responce ',resoponce))
      // .catch(error =>console.log({'error':'user not found'}))
      let data = await  Users.find()
      // Downtown,Uptown , Mountains , Beach , River , Ecotourism 
      let myARray = []
      let propertydata = data.filter(item => {
        let stringData = JSON.stringify(item)
        const {_id , ...rest } = JSON.parse(stringData)
        if(rest?.property_list){
           
           myARray.push(rest?.property_list[0])
        }
      })
      
    let Uptown =  myARray.filter(item =>item.property_type == 'Uptown')
    let Mountains = myARray.filter(item => item.property_type =='Mountains')
    let Beach = myARray.filter(item=> item.property_type == 'Beach')
    let River = myARray.filter(item => item.property_type == 'River')
    let Ecotourism = myARray.filter(item => item.property_type == 'Ecotourism')
    let Downtown = myARray.filter(item => item.property_type == 'Downtown')
    let destinations = [Uptown,Downtown,Mountains,Beach,River,Ecotourism]
    let near_you_destinations = [...myARray]
    let result = {
      populer_destinations:destinations,
      near_by_you:near_you_destinations
    }
    res.send({message:result})
      // console.log('json dtaaaaaa ',local)
   
  // }
 }
  )
module.exports = router