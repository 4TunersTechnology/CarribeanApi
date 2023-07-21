const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const cors =require('cors')
const Users =require('./SignupModule/Signupmodules')
const data = require('./SignupModule/UserDataModule')

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
        const { email, password, fullName } = req.body;
      
        // const encrypt_password = await bcrypt.hash(password, 10);
      
        const userDetail = {
          email: email,
          password: password,
          fullName: fullName,
        };
      
        const user_exist = await Users.findOne({ email: email });
      
        if (user_exist) {
            
            
          res.send({ message: "The Email is already in use !" });
        } else {
            console.log('full name ',fullName , email , password)
            if(fullName == undefined || fullName ==""){
                res.send({message:'Full name Required'})
            }
            else if(email == undefined || email ==""){
                res.send({message:'Email invalide'})
            }
            else if(password == undefined || password ==""){
                res.send({message:'password Required'})
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})