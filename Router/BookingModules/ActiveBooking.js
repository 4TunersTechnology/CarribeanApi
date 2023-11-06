const express =require('express');
const router =express.Router()
const Users = require('../../SignupModule/Signupmodules');
const { json } = require('body-parser');
function uniqid(){
    return Math.random().toString(16).slice(2);
  }

function GetCurrentDate(){
    // Date object
const date = new Date();

let currentDay= String(date.getDate()).padStart(2, '0');

let currentMonth = String(date.getMonth()+1).padStart(2,"0");

let currentYear = date.getFullYear();

// we will display the date as DD-MM-YYYY 

let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
return currentDate;

 

}

router.get('/active_booking/:user_id',async (req,res)=>{
    // console.log("The current date is " , GetCurrentDate());
    let data = await Users.find({user_id:req.params.user_id}).then(async value=>{
        if(value.length == 0){
            res.send({error:'User Not Found'})
        }
        else{
            let booking_data = JSON.stringify(value[0])
            let Booking_History = JSON.parse(booking_data)?.Booking_History
            // console.log('')
          let Histrory =  Booking_History.filter(value =>value.status =='in Progress')
             res.send({message:Histrory})
  }
})      
     
}
)
module.exports = router