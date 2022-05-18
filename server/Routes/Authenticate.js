const express=require('express')
const router=express.Router()
router.use(express.json())
const {requireLogin}=require('../middleware/Auth')
const UserModel=require('../modules/User')
const bcrypt=require('bcryptjs')
const cors=require('cors')
router.use(cors())
const mongoose=require('mongoose')


var jwt = require('jsonwebtoken')

function verifytoken(req,res,next){
     const  bearerHeader=req.header['authorization']
}
//signup
router.post('/register',async (req,res,next)=>{
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
       res.status()
    } 
    
    })
    
router.post('/login' ,async (req,res,next)=>{
   
    const email=req.body.email
    const pass=req.body.pass

    const user=await UserModel.findOne({email})
    try{
        
        if(!user)
        {
            const error=new Error('Galat Credentials')
            error.code=404;
            
          return   next(error)
            
        }
     
        const isMatch= await bcrypt.compare(pass,user.password)

        if(!isMatch)
        {  
            const error=new Error('Galat Credentials')
            error.code=404;
            
          return   next(error)
        }
        
        
        await UserModel.find({email:email},(err,result)=>{
            if(err)
            {   

                console.log(err)
                return res.status(404).json({message:'an error occured'})
                
            }
            console.log(result)
            
            const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
                expiresIn:"1h"
            })
          return  res.json({token})
           
        })
        
    }   

    catch(err){
        console.log(err.message)

    }

})
router.get('/',requireLogin,async (req,res)=>{

    try{
        const user=await UserModel.findById(req.user._id)
        res.json(user)
       
    }
    catch(err){
        console.log(err)
    }
})

    module.exports=router