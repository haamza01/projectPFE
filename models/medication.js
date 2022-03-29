const mongoose = require('mongoose')
const medicationSchema= new mongoose.Schema({

    name:{type:String},
    description:{type:String},
    price:{type:Number },
    disponible:{type:Boolean, default:true},
    pharmacyId:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
     
})
module.exports=mongoose.model('medication',medicationSchema )