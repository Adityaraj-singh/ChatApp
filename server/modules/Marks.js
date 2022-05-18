const mongoose=require('mongoose')
const MarksSchema=new mongoose.Schema({
    studentId:{
        type:String,
        required:true,
    },
    studentName:{
        type:String,
        required:true,
    },
    maths:{
        type:Number,
        required:true
    },
    english:{
        type:Number,
        required:true
    },
    chemistry:{
        type:Number,
        required:true
    },
    physics:{
        type:Number,
        required:true
    }
      
    
});
const Marks=mongoose.model("marksData",MarksSchema)
module.exports=Marks
