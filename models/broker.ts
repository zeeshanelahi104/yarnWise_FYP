import mongoose,{Schema} from "mongoose";

const brokerSchema = new Schema({
    name : {type:String,required:true},
    address:{type:String,required:true},
    contactnumber : {type:String,required:true}
    
},{
    timestamps:true
})
const broker  = mongoose.models.broker || mongoose.model("broker",brokerSchema)

export default broker;