const express = require('express')

const port = 4000
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const cors =require('cors')
const Users =require('./SignupModule/Signupmodules')
const data = require('./SignupModule/UserDataModule')
const multer  = require('multer')
const app = express()
const path = require('path')
app.get('/', (req, res) => {
  res.send('Hello World!')

})
const signup =require("./Router/Signup");
const Login = require('./Router/Login')
const send_otp = require('./Router/RagistrationProcess/Sendotp')
const IdentityVerification = require('./Router/RagistrationProcess/IdentityVerification')
const PropertyAdd = require('./Router/RagistrationProcess/PropertyAdd')
const GetUserProfile = require('./Router/User/UserProfile')
const support = require('./Router/OtherApi/EmailSupport')
const booking = require('./Router/BookingModules/Booking')
const CheckOut = require('./Router/BookingModules/CheckOut')
const ForgateModule = require('./Router/ForgateModule')
const Verification = require('./Router/Verification')
const change_password = require('./Router/RagistrationProcess/UpdatePassword')
const AllProperty = require('./Router/OtherApi/AllProperty')
const get_propertys = require('./Router/OtherApi/GetProperty')
const Most_dest_Propety = require('./Router/OtherApi/Most_dest_Propety')



app.use(express.json());
app.use(cors())
app.use(signup)
app.use(Login)
app.use(send_otp)
app.use(IdentityVerification)
app.use(PropertyAdd)
app.use(GetUserProfile)
app.use(support)
app.use(booking)
app.use(ForgateModule)
app.use(Verification)
app.use(change_password)
app.use(AllProperty)
app.use(get_propertys)
app.use(Most_dest_Propety)
app.use(CheckOut)
app.use(express.static('public'))   //for the image uploade


const url = `mongodb://4tuners:12345@ac-qnxikpe-shard-00-00.lranesa.mongodb.net:27017,ac-qnxikpe-shard-00-01.lranesa.mongodb.net:27017,ac-qnxikpe-shard-00-02.lranesa.mongodb.net:27017/Carribean?ssl=true&replicaSet=atlas-yjmn84-shard-0&authSource=admin&retryWrites=true&w=majority`;


mongoose.connect(url)
    .then( () => {
        console.log('Connected to the database ')
        
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
    // app.post("/auth/signup", async (req, res) => {
    //     const { email, password, first_name,last_name ,dob,confirm_password } = req.body;
      
    //     // const encrypt_password = await bcrypt.hash(password, 10);
      
    //     const userDetail = {
    //       email: email,
    //       password: password,
    //       first_name:first_name,
    //       last_name:last_name,
    //       dob:dob,
    //       confirm_password:confirm_password
    //     };
      
    //     const user_exist = await Users.findOne({ email: email });
        
      
    //     if (user_exist) {
            
            
    //       res.send({ message: "The Email is already in use !" });
    //     } else {
    //         console.log('full name ',first_name,last_name , email , password)
    //         if(first_name == undefined || first_name ==""){
    //             res.send({message:'First name Required'})
    //         }
    //         else if(last_name == undefined || last_name ==""){
    //           res.send({message:'Last name Required'})
    //       }
    //         else if(email == undefined || email ==""){
    //             res.send({message:'Email invalide'})
    //         }

    //         else if(dob == undefined || dob ==""){
    //           res.send({message:'Date of birth Required'})
    //       }
    //         else if(password == undefined || password ==""){
    //             res.send({message:'password Required'})
    //         }
    //         else if(confirm_password == undefined || confirm_password ==""){
    //           res.send({message:'confirm password Required'})
    //       }
    //         else{
    //         Users.create(userDetail, (err, result) => {
    //         if (err) {
    //           res.status(500).send({ message: err.message });
    //         } else {
    //           res.send({ message: "User Created Succesfully" });
    //         }
    //       });
    //     }
    //     }
    //   });


      app.post('/auth/login',async (req,res)=>{
        const {email,password} = req.body
        console.log('email ',email, password)
        const userDetail = await Users.findOne({ email: email });
        if (userDetail) {
          if (password == userDetail.password) {
            res.send(userDetail);
          } else {
            res.send({ error: "invaild Password" });
          }
        } else {
          res.send({ error: "user is not exist" });
        }
       
      }
      )





const fileUpload = multer({
   storage : multer.diskStorage({
  destination: (req, file, cb) => cb(null,"uploads"), // cb -> callback
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
})
}).single('profile_url')

// app.post('/imgupload',fileUpload,(req,res)=>{
//   res.send("file upload")
// })




// Define a Mongoose schema for the image details
const imageSchema = new mongoose.Schema({
  imageUrl: String,
});

// Create a Mongoose model for the image details
const ImageModel = mongoose.model('Image', imageSchema);

// // Save image details to MongoDB
async function saveImageToDB(imageDetails) {
  try {
    const image = new ImageModel(imageDetails);
    await image.save();
    console.log("Image details saved to MongoDB:", imageDetails);
  } catch (err) {
    console.error("Error saving image details to MongoDB:", err);
  }
}

app.post('/profile/upload', fileUpload,async (req, res) => {
 
  // await Users.updateOne({email:"test@gmail.com"},{ $set: { profile_img: imageUrl } }, {multi:true})
  // console.log('update data ',Users)
  console.log(' check data ', req.body)
  if(req?.file?.path == undefined || req?.file?.path ==""){
    res.send({message:'Profile image Required'})
}
  else{
   await Users.findOneAndUpdate({user_id:req.body.user_id }, 
    { $set: { profile_url: req?.file?.path  } }, { //options
      returnNewDocument: true,
      new: true,
      strict: false
    }
  )
.then((value) => {
  if(value == null){
    res.send({message:'User Not Found'})
  }
  else{
    res.send({message:'User profile upload Successfully'})
  }
})
.catch((err) => console.log(err))
  // res.send("File upload and saved to MongoDB successfully.");
}
  
});





  function uniqid(){
    return Math.random().toString(16).slice(2);
  }

app.get('/get_all_propertys',async (req,res)=>{
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
          myARray = [...rest?.property_list]
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

app.listen(port,()=>{
  console.log(`Example app listening on port ${port}`)
})