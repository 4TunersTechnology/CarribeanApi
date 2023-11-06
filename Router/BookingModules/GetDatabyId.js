const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules');
const { json } = require('body-parser');

router.post('/bookingdata_by_id',async (req,res)=>{
    const {user_id,booking_id} = req.body
    // console.log("The current date is " , GetCurrentDate());
    let data = await Users.find({user_id:user_id}).then(async value=>{
        if(value.length == 0){
            res.send({error:'User Not Found'})
        }
        else{
            let booking_data = JSON.stringify(value[0])
            let Booking_History = JSON.parse(booking_data)?.Booking_History
            let data = Booking_History.filter(value=> value.booking_id == booking_id)
            if(data.length ==0){
                res.send({error:"No data Found"})
            }
            else{
            res.send({message:data})
            }
  }
})      
     
}
)
module.exports = router