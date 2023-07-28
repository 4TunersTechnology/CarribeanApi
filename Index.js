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



app.use(express.json());
app.use(cors())

const url = `mongodb://4tuners:12345@ac-qnxikpe-shard-00-00.lranesa.mongodb.net:27017,ac-qnxikpe-shard-00-01.lranesa.mongodb.net:27017,ac-qnxikpe-shard-00-02.lranesa.mongodb.net:27017/Carribean?ssl=true&replicaSet=atlas-yjmn84-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.connect(url)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
    app.post("/auth/signup", async (req, res) => {
        const { email, password, first_name,last_name ,dob,confirm_password } = req.body;
      
        // const encrypt_password = await bcrypt.hash(password, 10);
      
        const userDetail = {
          email: email,
          password: password,
          first_name:first_name,
          last_name:last_name,
          dob:dob,
          confirm_password:confirm_password
        };
      
        const user_exist = await Users.findOne({ email: email });
      
        if (user_exist) {
            
            
          res.send({ message: "The Email is already in use !" });
        } else {
            console.log('full name ',first_name,last_name , email , password)
            if(first_name == undefined || first_name ==""){
                res.send({message:'First name Required'})
            }
            else if(last_name == undefined || last_name ==""){
              res.send({message:'Last name Required'})
          }
            else if(email == undefined || email ==""){
                res.send({message:'Email invalide'})
            }

            else if(dob == undefined || dob ==""){
              res.send({message:'Date of birth Required'})
          }
            else if(password == undefined || password ==""){
                res.send({message:'password Required'})
            }
            else if(confirm_password == undefined || confirm_password ==""){
              res.send({message:'confirm password Required'})
          }
            else{
            Users.create(userDetail, (err, result) => {
            if (err) {
              res.status(500).send({ message: err.message });
            } else {
              res.send({ message: "User Created Succesfully" });
            }
          });
        }
        }
      });


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
}).single('imgUrl')

// app.post('/imgupload',fileUpload,(req,res)=>{
//   res.send("file upload")
// })




// Define a Mongoose schema for the image details
const imageSchema = new mongoose.Schema({
  imageUrl: String
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

app.post('/imgupload', fileUpload, (req, res) => {
  const imageUrl = req.file.path;

  // Save image details to MongoDB
  saveImageToDB({ imageUrl });

  res.send("File upload and saved to MongoDB successfully.");
});

app.listen(3000)