const express=require('express')
const ConversationModel=require('../modules/Conversation')
const UserModel=require('../modules/User')
const router=express.Router()
const cors=require('cors')
router.use(cors())

router.get('/search',async (req,res,next)=>{
    const username =req.query.username
    var regex=new RegExp(username,'i')
   try{
       const results=await UserModel.find({name:regex},{'name':1,'email':2})
       res.status(200).json(results)

   }
   catch(err)
   {
       console.log(err)
       res.status(500).json(err)
   }

})

router.get('/showinfo',async (req,res,next)=>{
    const userid=req.query.userId
    console.log('userd'+userid)
    try{
        const user=await UserModel.findById(userid)
        console.log(user)
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports=router