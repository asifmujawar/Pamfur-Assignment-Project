const express = require('express')
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser')
const Student = require('./models/Student')
const authorize = require('./authorize')
const bcrypt = require('bcryptjs')
const env = require('dotenv')
const jwt = require('jsonwebtoken');
app.use(bodyParser.json());
const cookies = require('cookie-parser')

mongoose.connect('mongodb://Asif:123@cluster0-shard-00-00.h27sm.mongodb.net:27017,cluster0-shard-00-01.h27sm.mongodb.net:27017,cluster0-shard-00-02.h27sm.mongodb.net:27017/ASIF?ssl=true&replicaSet=atlas-10n08j-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Mongoose Database Connected")
})

env.config()

app.use(cookies())

app.get('/home',(req,res)=>{
    console.log("Request Received");
});

app.post('/login',(req,res)=>{
    console.log("login Request Received");
    const {email,password} = req.body;
    Student.findOne({email:email}).exec((err,result)=>{
        if(!result){
            res.status(501).json({
                msg:'User Not Found'
            })
        }
        else{
            bcrypt.compare(password,result.password,(err,reslt)=>{
                if(!reslt){
                    res.status(502).json({
                        msg:'Password Incorrect'
                    })
                }
                else{
                    let token = jwt.sign({_id:result._id},process.env.SECRETE)
                    res.cookie("User-TKN",token,{
                        expires:new Date(Date.now() + 2598768900),
                        httpOnly:true
                    })
                    result.tokens = result.tokens.concat({token:token})
                    result.save()
                    res.status(503).json({
                        msg:'User Logged in Successfully'
                    })
                }
            })
        }
    })
})

app.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;
    console.log("Signup Request Received")
    Student.findOne({email:email}).exec((err,result)=>{
        if(result){
            res.status(400).json({
                msg:'User alread Registered'
            })
        }
        else{
            
            console.log(password)

            bcrypt.hash(password,10,(err,hash)=>{
                const student = new Student({
                    name:name,
                    email:email,
                    password:hash
                })
    
                student.save((err)=>{
                    if(err){
                        res.status(401).json({
                            message:err,
                            m:"Wrong"
                        })
                    }
                    else{
                        console.log(hash)
                        res.status(200).json({
                            Message:"Registration Successfull"
                        })
                    }
                })
            })  
        }
    })
})

app.get('/student/profile',authorize,(req,res)=>{
    const token = req.cookies["User-TKN"]
    console.log(token)
    console.log("Student Profile")
    res.status(200).json({
        student:req.user
    })
})

app.get('/logout',(req,res)=>{
    res.clearCookie('User-TKN',{path:'/'})
    res.status(200).json({
        msg:'User Logged Out'
    })
})


app.listen(4000,()=>{
    console.log("Your Server is runing on port 4000");
})