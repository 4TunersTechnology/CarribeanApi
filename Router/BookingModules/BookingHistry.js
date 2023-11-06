const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules');
const { json } = require('body-parser');

router.get('/booking_history/:user_id',async (req,res)=>{
    // console.log("The current date is " , GetCurrentDate());
    let data = await Users.find({user_id:req.params.user_id}).then(async value=>{
        if(value.length == 0){
            res.send({error:'User Not Found'})
        }
        else{
            let booking_data = JSON.stringify(value[0])
            let Booking_History = JSON.parse(booking_data)?.Booking_History
            res.send({message:Booking_History})
  }
})      
     
}
)
module.exports = router