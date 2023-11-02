const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules');

router.get('/get_propertys/:property_id',async (req,res)=>{
     const {property_id,user_id} = req.body
    console.log('propety id ',req.params.property_id)
    // if(user_id == undefined || user_id ==""){
    //   res.send({message:'user id Required'})
    //  }
    // else{
     let data = await  Users.find()
      // Uptown , Mountains , Beach , River , Ecotourism 
      let myARray = []
      let propertydata = data.filter(item => {
        let stringData = JSON.stringify(item)
        const {_id , ...rest } = JSON.parse(stringData)
        if(rest?.property_list){
          // myARray = [...rest?.property_list]
          myARray.push(rest?.property_list[0])
        }
      })
       console.log('propertys data ',myARray)
    let filterData = myARray.filter(item => item.property_id == req.params.property_id)

     res.send({message:filterData})
   
//   }
 }
  )
module.exports = router