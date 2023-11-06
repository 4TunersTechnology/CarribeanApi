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
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

const formattedTime = `${hours}:${minutes}:${seconds}`;

let currentDate = `${currentDay}-${currentMonth}-${currentYear} ${formattedTime}`;
return currentDate;



}

router.post('/booking_cancel',async (req,res)=>{
    const {user_id,booking_id,explain_reason} = req.body
    // console.log("The current date is " + GetCurrentDate()); 
    if(user_id == undefined || user_id ==""){
      res.send({message:'user id Required'})
     }
    else if(booking_id == undefined || booking_id ==""){
        res.send({message:'Booking id Required'})
    }
    else if(explain_reason == undefined || explain_reason ==""){
        res.send({message:"Tranjection Id Required"})
    }
    else{
      let data = await Users.find({user_id:user_id}).then(async value=>{
        if(value.length == 0){
            res.send({error:'User Not Found'})
        }
        else{
            let booking_data = JSON.stringify(value[0])
            let Booking_History = JSON.parse(booking_data)?.Booking_History
            let filterData = Booking_History.filter((value)=>{
              if(value.booking_id == booking_id){
                value.status = 'cancel',
                value['explain_reason'] = explain_reason,
                value['cancel_date'] = GetCurrentDate()
              }
            })
            // res.send({message:value})
             await Users.findOneAndUpdate({user_id:req.body.user_id }, 
     { $set: { Booking_History:[...Booking_History]  } }, { //options
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
         res.send({message:"order cancel is done"})
       }
     })
     .catch((err) => console.log(err))
      // console.log("checkkkkkkk ",JSON.parse(booking_data)?.Booking_History)
    //   let bookingArray = []
    //   bookingArray = JSON.parse(booking_data)?.Booking_History
    //     bookingArray.push({property_id:property_id,user_id:user_id,booking_id:uniqid(),booking_date:GetCurrentDate(),entry_date: entry_date,exit_date:exit_date,extra_services:extra_services,total_amount:total_amount,status:'complete'})
   
   
  }
})      
}
}
)
module.exports = router