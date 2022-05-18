const express=require('express')

const router=express.Router()


const msg={
    id:0456,
    from :"Harshita",
    type:'text',
    msg:"aaj Shaam ko milo",
    time:'12:05 PM',

}
router.get('/',(req,res)=>{

    console.log('Home node inside Route')
    res.send({message:'It works inside Route'})
});



module.exports=router