const jwt=require('jsonwebtoken')

require('dotenv').config()

exports.requireLogin=(req,res,next)=>{
  
    try{
        if(req.headers.authorization)
        {   
            const token=req.headers.authorization.split(' ')[1]
            
                const decode=jwt.verify(JSON.parse(token),process.env.JWT_SECRET)
               

            req.user=decode
            next()
        }
        else{
            return res.status(400).json({message:'Unautharizec'})
        }
    }
    catch(err){
        console.log(error+' errror log')
    }
}