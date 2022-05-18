const { waitForDomChange } = require('@testing-library/react');
const express = require('express');
const app=express()

require('dotenv').config()

const homeRoute=require('./Routes/Home')
const authRoute=require('./Routes/Authenticate')
const conversationRoute=require('./Routes/Converstion')
const messageRoute=require('./Routes/Message')
const getuserRoute=require('./Routes/User')
const mongoose=require('mongoose')
app.use(express.json())
const UserModel=require('./modules/User')
const bcrypt=require('bcryptjs')
const socketio=require('socket.io')
const http=require('http')
const server=http.createServer(app)
const io=socketio(server)
const cors=require('cors')
io.on('connection',(socket)=>{
    console.log('we have a new connection')

    socket.on('disconnet',()=>{
        console.log('user has left the ')
    })
})
mongoose.connect("mongodb+srv://sample:student123@students.gkz96.mongodb.net/userdata?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true 
},()=>{
    console.log('database connected')
})
app.use('/getuser',getuserRoute)
app.use('/home',homeRoute)
app.use('/Conversation',conversationRoute)
app.use('/authenticate',authRoute)
app.use('/message',messageRoute)

app.use((error,req,res,next)=>{
    console.log('ye always running')
    if(res.headerSent){
        return next(error)
    }

    res.status(error.code || 500)
    res.json({message:error.message ||  'An unknown error occured'})
})

/*
//connecting db
app.use(cors())






//signup
app.post('/register',async (req,res)=>{
const email=req.body.email
const name=req.body.name
const pass=req.body.password
const hash_password=await bcrypt.hash(pass,10)

console.log(req.body)
const user=new UserModel({email:email,name:name,password:hash_password})
try{
    await user.save()
    console.log('saved')
    res.send('Ok')
}
catch(err){
   console.log(err)
   res.send('no Ok')
} 

})

//login
app.post('/login' ,async (req,res)=>{
   
    const email=req.body.email
    const pass=req.body.pass

 
    try{
        let user=await UserModel.findOne({email})
        if(!user)
        {
           return  res.status(400).json({error:"Invalid Credentials"});
            
        }
        const isMatch= await bcrypt.compare(pass,user.password)

        if(!isMatch)
        {  
          return   res.status(400).json({error:"Invalid Credentials"})
            
          
        }
        
        await UserModel.find({email:email},(err,result)=>{
            if(err)
            {
                console.log(err)
                
            }
            console.log(result)
            res.send(result)
        })
        
    }   

    catch(err){
        console.log(err.message)

    }

})

*/
server.listen(5000,()=>{

    console.log('listening to the  server 5000')
})