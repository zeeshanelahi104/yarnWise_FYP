import mongoose,{Schema} from "mongoose";

const brokerSchema = new Schema({
    name : {type:String,required:true},
    address:{type:String,required:true},
    contactNumber : {type:String,required:true},
    brokerCommision : {type:Number}
},{
    timestamps:true
})
const broker  = mongoose.models.broker || mongoose.model("broker",brokerSchema)

export default broker;