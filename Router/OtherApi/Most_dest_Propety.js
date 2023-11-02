const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules');

router.get('/most_dest_property/:type',async (req,res)=>{
    console.log('dataaa show ',req.params.type)
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
      let filter_data =  myARray.filter(item =>item.property_type == req.params.type)
   
    let result = {
      near_by_you:filter_data
    }
    res.send({message:result})
 }
  )
module.exports = router