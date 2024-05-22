import mongoose, { Schema } from "mongoose"

const partySchema = new Schema({
    name: { type: String, required: true },
    area: { type: String, required: true },
    contactnumber: { type: String, required: true },
    balance : {type:Number}
},{
    timestamps:true
})

const parties  = mongoose.models.parties || mongoose.model("parties",partySchema)

export default parties;