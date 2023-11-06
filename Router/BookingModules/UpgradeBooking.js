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

const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

const formattedTime = `${hours}:${minutes}:${seconds}`;

// we will display the date as DD-MM-YYYY 

let currentDate = `${currentDay}-${currentMonth}-${currentYear} ${formattedTime}`;
return currentDate;

console.log("The current date is " + currentDate); 

}
function uniqid(){
    return "bookingId_"+((new Date()).getTime()+Math.random().toString(16).slice(16));
  }

router.post('/upgrade_booking',async (req,res)=>{
    const {booking_id,entry_date,exit_date,extra_services,total_amount,user_id} = req.body
    if(user_id == undefined || user_id ==""){
      res.send({message:'user id Required'})
     }
   else if(booking_id == undefined || booking_id ==""){
        res.send({message:'Booking id Required'})
    }
    else if(entry_date == undefined || entry_date ==""){
        res.send({message:'Entry Date Required'})
    }
    else if(exit_date == undefined || exit_date ==""){
        res.send({message:'Exit Date Required'})
    }
    else if(total_amount == undefined || total_amount ==""){
        res.send({message:'Total Amount Required'})
    }
    else{
      let data = await Users.find({user_id:user_id}).then(async value=>{
        if(value.length == 0){
            res.send({error:'User Not Found'})
        }
        else{
            let booking_data = JSON.stringify(value[0])
      // console.log("checkkkkkkk ",JSON.parse(booking_data)?.Booking_History)
      let bookingArray = []
        bookingArray = JSON.parse(booking_data)?.Booking_History
       let filterdata = bookingArray.filter(value=> value.booking_id == booking_id)
       if(filterdata.length ==0){
        res.send({error:'No data Found'})
       }
       else{
        bookingArray.filter((value)=> 
          {
           
            if(value.booking_id == booking_id){
              console.log('valuessss ',value.booking_id , booking_id)
              value['upgrade_booking_date'] = GetCurrentDate(),
              value.entry_date = entry_date,
              value.exit_date = exit_date,
              value.extra_services = extra_services,
              value.total_amount =total_amount
            }
          }
          )
                  // console.log('booking array ',bookingArray)
    await Users.findOneAndUpdate({user_id:req.body.user_id }, 
    { $set: { Booking_History:[...bookingArray]  } }, { //options
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
      })      
 }
}
  )
module.exports = router