import mongoose from 'mongoose'

const loginSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ["supplier", "buyer"],
        required: true
    }
},{timestamps:true})


 const collection=mongoose.model('login',loginSchema)
 export default collection