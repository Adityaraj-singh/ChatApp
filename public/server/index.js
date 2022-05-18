const { waitForDomChange } = require('@testing-library/react');
const express = require('express');
const app=express()
const mongoose=require('mongoose')
app.use(express.json())
const MarksModel=require('./modules/Marks')
const cors=require('cors')
app.use(cors())
mongoose.connect("mongodb+srv://sample:student123@students.gkz96.mongodb.net/finalexam?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true 
})

app.get('/read',async (req,res)=>{
    
    MarksModel.find({},['_id','studentId','studentName','maths','english','physics','chemistry'],(err,result)=>{
        if(err)
        {
            res.send(err)
        }

        res.send(result)
    })
})
app.get('/sort/:sor',async (req,res)=>{

    const sorting=req.params.sor
    console.log(sorting)

    if(sorting=='maths'){
        MarksModel.find({},['_id','studentId','studentName','maths','english','physics','chemistry'],{sort:{'maths':1}},(err,result)=>{
            if(err)
            {
                res.send(err)
            }
            console.log(result)
            res.send(result)
        })
    }
   else if(sorting=='physics')
    {
        MarksModel.find({},['_id','studentId','studentName','maths','english','physics','chemistry'],{sort:{'physics':1}},(err,result)=>{
            if(err)
            {
                res.send(err)
            }
            console.log(result)
            res.send(result)
        })
    }
    else if(sorting=='chemistry')
    {
        MarksModel.find({},['_id','studentId','studentName','maths','english','physics','chemistry'],{sort:{'chemistry':1}},(err,result)=>{
            if(err)
            {
                res.send(err)
            }
            console.log(result)
            res.send(result)
        })
    }
    else if(sorting=='english')
    {
        MarksModel.find({},['_id','studentId','studentName','maths','english','physics','chemistry'],{sort:{'english':1}},(err,result)=>{
            if(err)
            {
                res.send(err)
            }
            console.log(result)
            res.send(result)
        })
    }
    else
    {
        MarksModel.find({},['_id','studentId','studentName','maths','english','physics','chemistry'],(err,result)=>{
            if(err)
            {
                res.send(err)
            }
            console.log(result)
            res.send(result)
        })
    }
    
})

app.delete('/delete/:id',async (req,res)=>{
    const id=req.params.id
    console.log(id)
    await MarksModel.findByIdAndRemove(id).exec()

    MarksModel.find({},(err,result)=>{
        if(err)
        {
            res.send(err)
        }

        res.send(result)
    })

})
app.get('/search/:name',async (req,res)=>{

    
    const name = new RegExp(req.params.name, 'i')
    console.log('Searching '+ name +'...')
    await MarksModel.find({studentName:name},(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    })
})
app.post('/insert',async (req,res)=>{
    console.log('aagye insert me')
    const studentId=req.body.studentId
    const studentName=req.body.name
    const maths=req.body.maths
    const english=req.body.english
    const chem=req.body.chem
    const phy=req.body.phy
    console.log(req.body)
    const marks=new MarksModel({studentId:studentId,studentName:studentName,maths:maths,english:english,chemistry:chem,physics:phy})
    try{
        await marks.save()
        console.log('saved')
    }
   catch(err){
       console.log(err)
   } 
})  


app.listen(3001,()=>{

    console.log('listening to server')
})